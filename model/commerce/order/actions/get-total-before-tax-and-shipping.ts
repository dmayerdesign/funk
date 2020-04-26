import { OrderDiscount, SkuDiscount } from '@funk/model/commerce/discount/discount'
import { PopulatedOrder } from '@funk/model/commerce/order/order'
import add from '@funk/model/commerce/price/actions/add'
import subtract from '@funk/model/commerce/price/actions/subtract'
import { NULL_PRICE, Price } from '@funk/model/commerce/price/price'
import { Product } from '@funk/model/commerce/product/product'
import getPriceAfterSkuDiscounts from
  '@funk/model/commerce/product/sku/actions/get-price-after-discounts'
import { Sku } from '@funk/model/commerce/product/sku/sku'
import { DbDocumentInput } from '@funk/model/data-access/database-document'
import { of, zip } from 'rxjs'
import { first, map, switchMap } from 'rxjs/operators'

export const construct = ({
  getProductForSku,
}: {
  getProductForSku: (sku: Sku) => Promise<Product>
}) =>
  function(order: DbDocumentInput<PopulatedOrder>): Promise<Price>
  {
    const skus = order.skus
    const activeDiscounts = order.discounts || []

    if (!skus || !skus.length)
    {
      return Promise.resolve(NULL_PRICE)
    }
    return zip(
      ...skus.map((sku) => of(sku).pipe(
        switchMap(async () =>
          getPriceAfterSkuDiscounts({
            sku,
            product: await getProductForSku(sku),
            activeDiscounts: activeDiscounts as SkuDiscount[],
          })
        ))
      )
    )
    .pipe(
      map((actualPrices) =>
        actualPrices.reduce(add, NULL_PRICE),
      ),
      map((priceAfterSkuDiscounts) => getPriceAfterOrderDiscounts(
        activeDiscounts as OrderDiscount[],
        priceAfterSkuDiscounts,
      )),
      first(),
    )
    .toPromise()
  }

function getPriceAfterOrderDiscounts(discounts: OrderDiscount[], priceBefore: Price): Price
{
  return discounts.reduce((priceAfter, discount) =>
  {
    if (discount.type === 'order')
    {
      if (!!discount.orderTotalLowerLimit
        && subtract(priceBefore, discount.orderTotalLowerLimit).amount < 0)
      {
        return priceAfter
      }
      else if (!!discount.orderTotalUpperLimit
        && subtract(priceBefore, discount.orderTotalUpperLimit).amount >= 0)
      {
        return priceAfter
      }
      else if (!!discount.percentage)
      {
        return {
          amount: priceAfter.amount - (priceAfter.amount * discount.percentage),
          ...priceAfter,
        }
      }
      else if (!!discount.total)
      {
        return subtract(priceAfter, discount.total)
      }
    }
    return priceAfter
  }, { ...priceBefore })
}
