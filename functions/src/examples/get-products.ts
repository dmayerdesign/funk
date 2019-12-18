import { FIRE_PROJECT_ID } from '@funk/config'
import { Product, PRODUCTS } from '@funk/model/commerce/product/product'
import { Firestore } from '@google-cloud/firestore'
import * as functions from 'firebase-functions'

export default functions.https.onRequest(async (_request, response) =>
{
  const firestore = new Firestore({ projectId: FIRE_PROJECT_ID })
  const products = await firestore.collection(PRODUCTS).get()
    .then(({ docs }) => docs) as Product[]
  return response.json(products)
})
