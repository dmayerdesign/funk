import createFunction from '@funk/functions/helpers/create-function'
import computePriceForProductSku from '@funk/helpers/commerce/compute-price-for-product-sku'
import CurrencyMismatchError from '@funk/helpers/commerce/currency-mismatch-error'
import { Order } from '@funk/model/commerce/order/order'
import { Price } from '@funk/model/commerce/price/price'
import { Product, PRODUCTS } from '@funk/model/commerce/product/product'
import { ProductSku } from '@funk/model/commerce/product/product-sku'
import { RequestWithBody } from '@funk/model/data-access/request-with-body'
import { firestore } from 'firebase-admin'
import { from, zip } from 'rxjs'
import { first, flatMap, map } from 'rxjs/operators'

export default createFunction((request: RequestWithBody<Order>): Promise<Price> => {
  const skus = request.body.productSkus
  const discounts = request.body.discounts

  // TODO: Calculate tax using the Avatax free REST API.
  // https://developer.avalara.com/api-reference/avatax/rest/v2/methods/Free/TaxRatesByPostalCode/
  // https://developer.avalara.com/avatax/authentication-in-rest/
  // TODO: Retrieve and decrypt the Avatax credentials from cloud storage using KMS.
  // Generally, figure out how to read secrets.
  // Possibility:
  // - drop Berglas, as it doesn't support the Node runtime.
  // - simply use `firebase-admin.storage()` + a KMS key for en/decryption.
  return zip(
    from(skus).pipe(
      flatMap(async (sku) => firestore().collection(PRODUCTS).doc(sku.productId).get()
        .then((snapshot) => snapshot.data() as Product)
        .then((product) => [ sku, product ] as [ ProductSku, Product ])
      ),
      map(([ sku, product ]) => computePriceForProductSku(sku, product, discounts)),
      map((computedPrice) => ({
        amount: computedPrice.amount * (6 / 100),
        currency: computedPrice.currency,
      })),
    ))
    .pipe(
      map((pricesAfterTax) => pricesAfterTax.reduce(
        (totalPrice, price) => {
          if (totalPrice.currency !== price.currency) throw new CurrencyMismatchError()
          return {
            ...totalPrice,
            amount: totalPrice.amount + price.amount,
          }
        },
        { amount: 0 } as Price
      )),
      first(),
    )
    .toPromise()
})
