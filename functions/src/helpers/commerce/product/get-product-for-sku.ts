import { Product, PRODUCTS } from '@funk/model/commerce/product/product'
import { Sku } from '@funk/model/commerce/product/sku/sku'
import { store } from '@funk/plugins/db/store'

export default function(sku: Sku): Promise<Product>
{
  return store().collection(PRODUCTS).doc(sku.productId).get()
    .then((snapshot) => snapshot.data() as Product)
}
