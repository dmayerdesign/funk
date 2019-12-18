import auditOnWrite from '@funk/functions/helpers/audit/on-write'
import { Product, PRODUCTS } from '@funk/model/commerce/product/product'
import { firestore } from 'firebase-functions'

export default firestore.document(`${PRODUCTS}/{id}`).onWrite(
  auditOnWrite<Product>(`audit.${PRODUCTS}`)
)
