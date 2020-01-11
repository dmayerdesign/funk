import { PopulatedOrder } from '@funk/model/commerce/order/order'
import add from '@funk/model/commerce/price/actions/add'
import { NULL_PRICE, Price } from '@funk/model/commerce/price/price'
import { Product } from '@funk/model/commerce/product/product'
import getActualPrice from '@funk/model/commerce/product/sku/actions/get-actual-price'
import { Sku } from '@funk/model/commerce/product/sku/sku'
import { from, zip } from 'rxjs'
import { first, map, switchMap } from 'rxjs/operators'

export interface Input
{
  order: PopulatedOrder
  getProductForSku: (sku: Sku) => Promise<Product>
}

export type Output = Price

export default function(input: Input): Promise<Output>
{
  const { order, getProductForSku } = input
  const skus = order.skus
  const activeDiscounts = order.discounts

  return zip(
    from(skus).pipe(
      switchMap(async (sku) =>
        getActualPrice({
          sku,
          product: await getProductForSku(sku),
          activeDiscounts,
        }),
      ),
    )
  )
  .pipe(
    map((actualPrices) =>
      actualPrices.reduce(add, NULL_PRICE),
    ),
    first(),
  )
  .toPromise()
}

