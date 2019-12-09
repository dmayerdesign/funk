import { AVATAX_ACCOUNT_ID, TAX_RATE_CALCULATOR_URL } from '@funk/config'
import createFunction from '@funk/functions/helpers/http/create-function'
import { RequestWithBody } from '@funk/functions/model/request-response/request-with-body'
import getTax, { Input as GetTaxInput } from '@funk/model/commerce/order/actions/get-tax'
import { Order } from '@funk/model/commerce/order/order'
import { Price } from '@funk/model/commerce/price/price'
import { Product, PRODUCTS } from '@funk/model/commerce/product/product'
import { Sku } from '@funk/model/commerce/product/sku/sku'
import { AvataxResponse } from '@funk/model/commerce/tax-rate/avatax-response'
import { EncryptedSecret } from '@funk/model/secret/encrypted-secret'
import { AVATAX_LICENSE_KEY } from '@funk/model/secret/keys'
import axios, { AxiosResponse } from 'axios'
import { firestore } from 'firebase-admin'

const getProduct = (sku: Sku) => firestore().collection(PRODUCTS).doc(sku.productId).get()
  .then((snapshot) => snapshot.data() as Product)

async function getTaxRate(postalCode: string): Promise<number>
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
  return taxRateResponse.data.totalRate
}

export default createFunction(async (request: RequestWithBody<Order>): Promise<Price> =>
{
  const order = request.body
  const postalCode = order.customer.billingAddress.zip
  const input: GetTaxInput = {
    order,
    taxRate: await getTaxRate(postalCode),
    getProduct,
  }
  return getTax(input)
})
