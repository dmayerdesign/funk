import { GCP_REGION } from '@funk/config'
import { region } from 'firebase-functions'

export default region(GCP_REGION)
  .firestore
  .document('sandbox-users/danny').onWrite(async (change, context) => {
    console.log('changed!', context.resource.name)
    return change
  })
