import { Firestore } from '@google-cloud/firestore'
import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'
import 'firebase-functions'
import { Product } from 'shared/contracts/product/product'
admin.initializeApp()

export const getProducts = functions.https.onRequest(async (request, response) => {
  const firestore = new Firestore({ projectId: 'funk-e24ed' })
  const products = await firestore.collection('sandbox-users').get()
    .then(({ docs }) => docs) as Product[]
  return response.send(products)
})
