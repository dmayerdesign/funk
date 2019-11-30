import { AVATAX_ACCOUNT_ID, TAX_RATE_CALCULATOR_URL } from '@funk/config'
import createFunction from '@funk/functions/helpers/http/create-function'
import computePriceForProductSku from '@funk/helpers/commerce/compute-price-for-product-sku'
import CurrencyMismatchError from '@funk/helpers/commerce/currency-mismatch-error'
import { Order } from '@funk/model/commerce/order/order'
import { Price } from '@funk/model/commerce/price/price'
import { Product, PRODUCTS } from '@funk/model/commerce/product/product'
import { ProductSku } from '@funk/model/commerce/product/product-sku'
import { AvataxResponse } from '@funk/model/commerce/tax-rate/avatax-response'
import { RequestWithBody } from '@funk/model/data-access/request-with-body'
import { EncryptedSecret } from '@funk/model/secret/encrypted-secret'
import { AVATAX_LICENSE_KEY } from '@funk/model/secret/keys'
import axios, { AxiosResponse } from 'axios'
import { firestore } from 'firebase-admin'
import { from, zip } from 'rxjs'
import { first, flatMap, map, switchMap } from 'rxjs/operators'

export default createFunction((request: RequestWithBody<Order>): Promise<Price> =>
{
  const skus = request.body.productSkus
  const discounts = request.body.discounts
  const postalCode = request.body.customer.billingAddress.zip

  return zip(
    from(skus).pipe(
      flatMap(
        (sku) => firestore().collection(PRODUCTS).doc(sku.productId).get()
          .then((snapshot) => snapshot.data() as Product)
          .then((product) => [ sku, product ] as [ ProductSku, Product ]),
      ),
      map(([ sku, product ]) => computePriceForProductSku(sku, product, discounts)),
      switchMap(async (computedPrice) =>
      {
        const avataxLicenseKey = await firestore().collection('vault')
          .doc(AVATAX_LICENSE_KEY).get()
          .then((snapshot) => snapshot.data() as EncryptedSecret)
          .then(({ value }) => value)
        const authString = Buffer.from(`${AVATAX_ACCOUNT_ID}:${avataxLicenseKey}`)
          .toString('base64')
        const authorizationHeader = `Basic ${authString}`
        const taxRateResponse: AxiosResponse<AvataxResponse> = await axios.get(
          TAX_RATE_CALCULATOR_URL + `?country=USA` + `&postalCode=${postalCode}`,
          {
            headers: {
              authorization: authorizationHeader,
            },
          },
        )
        return {
          amount: computedPrice.amount * taxRateResponse.data.totalRate,
          currency: computedPrice.currency,
        }
      }),
    ))
    .pipe(
      map((pricesAfterTax) => pricesAfterTax.reduce(
        (totalPrice, price) =>
        {
          console.log('totalPrice', totalPrice)
          console.log('price', price)
          if (totalPrice.currency !== price.currency) throw new CurrencyMismatchError()
          return {
            ...totalPrice,
            amount: totalPrice.amount + price.amount,
          }
        },
        { amount: 0 } as Price,
      )),
      first(),
    )
    .toPromise()
})
