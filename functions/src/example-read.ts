import { Firestore } from '@google-cloud/firestore'
import { https } from 'firebase-functions'

export default https.onRequest(async (_request, response) => {
  const firestore = new Firestore({ projectId: 'funk-e24ed' })
  return response.send(await firestore.collection('sandbox-users').doc('danny').get())
})
