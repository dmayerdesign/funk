import { Firestore } from '@google-cloud/firestore'
import { config, https } from 'firebase-functions'

export default https.onRequest(async (_request, response) => {
  const firestore = new Firestore({ projectId: config().public.fire_project_id })
  return response.send(await firestore.collection('sandbox-users').doc('danny').get())
})
