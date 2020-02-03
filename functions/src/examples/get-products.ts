import createRpcFunction from '@funk/functions/helpers/http/create-rpc-function'
import { Product, PRODUCTS } from '@funk/model/commerce/product/product'
import { store } from '@funk/plugins/db/store'

export default createRpcFunction(async (_request, response) =>
{
  const products = await store().collection(PRODUCTS).get()
    .then(({ docs }) => docs) as Product[]
  return response.json(products)
})
