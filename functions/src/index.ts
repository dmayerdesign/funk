import { GCP_REGION } from '@funk/config'
import { Firestore } from '@google-cloud/firestore'
import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'
import 'firebase-functions'
admin.initializeApp()

export const helloWorld = functions.https.onRequest((request, response) => {
  response.send(`Hello from Firebase! Here's your query: ${JSON.stringify(request.query)}`)
})

export const exampleOnWrite = functions.region(GCP_REGION)
  .firestore
  .document('sandbox-users/danny').onWrite(async (change, context) => {
    console.log('changed!', context.resource.name)
    return change
  })

export const exampleRead = functions.https.onRequest(async (request, response) => {
  const firestore = new Firestore({ projectId: 'funk-e24ed' })
  return response.send(await firestore.collection('sandbox-users').doc('danny').get())
})

export * from './get-products'
