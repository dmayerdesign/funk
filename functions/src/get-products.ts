// import { Product } from '../../shared/contracts/product/product'
// import { Firestore } from '@google-cloud/firestore'
import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'
import 'firebase-functions'
admin.initializeApp()

export const getProducts = functions.https.onRequest(async (_request, response) => {
  // const firestore = new Firestore({ projectId: 'funk-e24ed' })
  // const products = await firestore.collection('sandbox-users').get()
  //   .then(({ docs }) => docs) as Product[]
  return response.json(process.env.FIREBASE_CONFIG)
})
