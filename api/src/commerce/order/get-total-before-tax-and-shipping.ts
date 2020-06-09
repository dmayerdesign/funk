/* eslint-disable @typescript-eslint/indent */
import marshallSku from "@funk/api/commerce/sku/marshall"
import { OrderDiscount, SkuDiscount, Discount } from "@funk/model/commerce/discount/discount"
import { PopulatedOrder } from "@funk/model/commerce/order/order"
import add from "@funk/model/commerce/price/actions/add"
import subtract from "@funk/model/commerce/price/actions/subtract"
import { NULL_PRICE, Price } from "@funk/model/commerce/price/price"
import { MarshalledProduct, PRODUCTS } from "@funk/model/commerce/product/product"
import getPriceAfterSkuDiscounts from
  "@funk/model/commerce/sku/actions/get-price-after-discounts"
import { MarshalledSku } from "@funk/model/commerce/sku/sku"
import { DbDocumentInput } from "@funk/model/data-access/database-document"
import getByIdImpl from "@funk/plugins/persistence/actions/get-by-id"
import { of, zip, OperatorFunction } from "rxjs"
import { first, map, switchMap } from "rxjs/operators"

export function construct(
  getById = getByIdImpl
)
{
  return async function(order: DbDocumentInput<PopulatedOrder>): Promise<Price>
  {
    const skus = order.skus.map(marshallSku)
    const activeDiscounts = order.discounts ?? []

    if (!skus || !skus.length)
    {
      return Promise.resolve(NULL_PRICE)
    }
    return await zip(
      ...skus.map((sku) => of(sku).pipe(
        switchMapToPriceAfterSkuDiscounts(
          activeDiscounts,
          (_sku: MarshalledSku) => getById<MarshalledProduct>(PRODUCTS, sku.productId)
        )
      )))
      .pipe(
        map((actualPrices) => actualPrices.reduce(add, NULL_PRICE)),
        map((priceAfterSkuDiscounts) => getPriceAfterOrderDiscounts(
          activeDiscounts,
          priceAfterSkuDiscounts
        )),
        first()
      )
      .toPromise()
  }

  function switchMapToPriceAfterSkuDiscounts(
    discounts: Discount[],
    getProduct: (sku: MarshalledSku) => Promise<MarshalledProduct | undefined>
  ): OperatorFunction<MarshalledSku, Price>
  {
    return switchMap<MarshalledSku, Promise<Price>>(async (sku) =>
    {
      const product = await getProduct(sku)
      return getPriceAfterSkuDiscounts({
        sku,
        product: product!,
        activeDiscounts: discounts.filter(({ type }) => type === "sku") as SkuDiscount[],
      })
    })
  }
}

export default construct()

function getPriceAfterOrderDiscounts(discounts: Discount[], priceBefore: Price): Price
{
  const orderDiscounts = discounts
    .filter(({ type }) => type === "order") as OrderDiscount[]
  const totalDiscount = orderDiscounts
    .reduce<Price>((discountAmount, discount) =>
    {
      if (orderPriceIsBelowDiscountLowerLimit(discount, priceBefore)
        || orderPriceIsGteDiscountUpperLimit(discount, priceBefore))
      {
        return discountAmount
      }
      else if (!!discount.percentage)
      {
        return {
          amount: priceBefore.amount * discount.percentage,
          ...discountAmount,
        }
      }
      else if (!!discount.total)
      {
        return discount.total
      }
      return discountAmount
    }, { ...NULL_PRICE, currency: priceBefore.currency })
  return subtract(priceBefore, totalDiscount)
}

function orderPriceIsGteDiscountUpperLimit(discount: OrderDiscount, price: Price): boolean
{
  return !!discount.orderTotalUpperLimit
    && subtract(price, discount.orderTotalUpperLimit).amount >= 0
}

function orderPriceIsBelowDiscountLowerLimit(discount: OrderDiscount, price: Price): boolean
{
  return !!discount.orderTotalLowerLimit
    && subtract(price, discount.orderTotalLowerLimit).amount < 0
}