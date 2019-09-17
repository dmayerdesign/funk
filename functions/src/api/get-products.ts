import { Product } from '@funk/shared/contracts/product/product'
import { Firestore } from '@google-cloud/firestore'
import * as functions from 'firebase-functions'
import 'firebase-functions'

export default functions.https.onRequest(async (_request, response) => {
  const firestore = new Firestore({ projectId: functions.config().public.fire_project_id })
  const products = await firestore.collection('sandbox-users').get()
    .then(({ docs }) => docs) as Product[]
  console.log(products)
  return response.json(process.env.FIREBASE_CONFIG)
})
