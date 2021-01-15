import getConfig from "@funk/api/plugins/cloud-function/runtime/get-config"
import { AppOptions, credential, initializeApp } from "firebase-admin"
import { firebaseConfig } from "firebase-functions"

const serializedCredentials = getConfig().admin.serializedcredentials
const deserializedCredentials = JSON.parse(
  Buffer.from(serializedCredentials, "base64").toString("utf8"),
)
const adminConfig: AppOptions = {
  ...firebaseConfig(),
  credential: credential.cert(deserializedCredentials),
}

initializeApp(adminConfig)
