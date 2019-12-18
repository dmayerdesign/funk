import { Product, PRODUCTS } from '@funk/model/commerce/product/product'
import { Sku } from '@funk/model/commerce/product/sku/sku'
import { firestore } from 'firebase-admin'

export default function(sku: Sku): Promise<Product>
{
  return firestore().collection(PRODUCTS).doc(sku.productId).get()
    .then((snapshot) => snapshot.data() as Product)
}
