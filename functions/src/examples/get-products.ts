import { Product } from '@funk/model/commerce/product/product'
import { Firestore } from '@google-cloud/firestore'
import * as functions from 'firebase-functions'
import 'firebase-functions'

export default functions.https.onRequest(async (_request, response) => {
  const firestore = new Firestore({ projectId: functions.config().public.fire_project_id })
  const products = await firestore.collection('products').get()
    .then(({ docs }) => docs) as Product[]
  return response.json(products)
})
