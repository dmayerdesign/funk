import { PopulatedOrder } from '@funk/model/commerce/order/order'
import { Price } from '@funk/model/commerce/price/price'
import { Product } from '@funk/model/commerce/product/product'
import getActualPrice from '@funk/model/commerce/product/sku/actions/get-actual-price'
import { Sku } from '@funk/model/commerce/product/sku/sku'
import { from, zip } from 'rxjs'
import { first, map, switchMap } from 'rxjs/operators'

export interface Input
{
  order: PopulatedOrder
  taxRate: number
  getProduct: (sku: Sku) => Promise<Product>
}

export type Output = Price

export default function(input: Input): Promise<Output>
{
  const { order, getProduct, taxRate } = input
  const skus = order.skus
  const discounts = order.discounts

  return zip(
    from(skus).pipe(
      switchMap(async (sku) =>
        getActualPrice(
          sku,
          await getProduct(sku),
          discounts,
        ),
      ),
      map((computedPrice) => ({
        amount: computedPrice.amount * taxRate,
        currency: computedPrice.currency,
      })),
    ))
    .pipe(
      map((pricesAfterTax) =>
        pricesAfterTax.reduce(
          (totalPrice, price) => ({
            ...totalPrice,
            amount: totalPrice.amount + price.amount,
          }),
          { amount: 0 } as Price,
        ),
      ),
      first(),
    )
    .toPromise()
}

