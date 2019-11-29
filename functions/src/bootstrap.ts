import { credential, initializeApp, AppOptions } from 'firebase-admin'
import { firebaseConfig } from 'firebase-functions'
import getConfig from './helpers/runtime/get-config'

const serializedCredentials = getConfig().admin.serializedcredentials
const deserializedCredentials = JSON.parse(
  Buffer.from(serializedCredentials, 'base64').toString('utf8')
)
const adminConfig: AppOptions = {
  ...firebaseConfig(),
  credential: credential.cert(deserializedCredentials),
}

initializeApp(adminConfig)
