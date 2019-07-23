// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
import * as functions from 'firebase-functions'

export const helloWorld = functions.https.onRequest((request, response) => {
  response.send('Hello from Firebase!')
})

export const exampleOnWrite = functions.firestore
  .document('sandbox/users/danny').onWrite((change, context) => {
    console.log('CHANGE ===>', change, context)
  })
