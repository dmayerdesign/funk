import { SkuDiscount } from "@funk/model/commerce/discount/discount"
import { Order } from "@funk/model/commerce/order/order"
import add from "@funk/model/commerce/price/actions/add"
import { NULL_PRICE, Price } from "@funk/model/commerce/price/price"
import { MarshalledProduct, PRODUCTS } from "@funk/model/commerce/product/product"
import getPriceAfterSkuDiscounts from
  "@funk/model/commerce/sku/actions/get-price-after-discounts"
import { DbDocumentInput } from "@funk/model/data-access/database-document"
import getPriceAfterOrderDiscounts from
  "@funk/model/commerce/order/actions/get-price-after-order-discounts"
import getByIdImpl from "@funk/plugins/persistence/actions/get-by-id"
import { asPromise } from "@funk/helpers/as-promise"
import { of, zip } from "rxjs"
import { first, map, switchMap } from "rxjs/operators"

export function construct(
  getById = getByIdImpl
)
{
  return async function(order: DbDocumentInput<Order>): Promise<Price>
  {
    const skus = order.skus
    const activeDiscounts = order.discounts ?? []

    if (!skus || !skus.length)
    {
      return Promise.resolve(NULL_PRICE)
    }
    return await asPromise(zip(
      ...skus.map((_sku) => of(_sku).pipe(
        switchMap(async (sku) =>
        {
          const product = await getById<MarshalledProduct>(PRODUCTS, sku.productId)
          const skuDiscounts = activeDiscounts
            .filter(({ type }) => type === "sku") as SkuDiscount[]
          return getPriceAfterSkuDiscounts({
            sku,
            product: product!,
            activeDiscounts: skuDiscounts,
          })
        })
      )))
      .pipe(
        map((actualPrices) => actualPrices.reduce(add, NULL_PRICE)),
        map((priceAfterSkuDiscounts) => getPriceAfterOrderDiscounts(
          order,
          priceAfterSkuDiscounts
        )),
        first()
      ))
  }
}

export default construct()

export type GetTotalBeforeTaxAndShipping = ReturnType<typeof construct>
