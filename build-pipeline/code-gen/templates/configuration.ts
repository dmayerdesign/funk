import { Configuration } from "@funk/model/configuration"

interface ConfigOptions {
  firebaseConfig: Record<string, any>
  projectId: string
  displayName: string
}

const getLocal = () =>
  `import { CLOUD_PROJECT_ID, FUNCTIONS_REGION } from "./development"

/* eslint-disable max-len */
export const CLIENT_APP_URL = "http://localhost:8100"
export const IS_LOCAL = true
export const FUNCTIONS_BASE_URL = \`http://localhost:5001/\${CLOUD_PROJECT_ID}/\${FUNCTIONS_REGION}\`
export const TRUSTED_ORIGINS = [
  CLIENT_APP_URL,
  "http://localhost",
  "capacitor://localhost",
]

export {
  CLOUD_PROJECT_ID,
  CLOUD_PROJECT_REGION,
  DISPLAY_NAME,
  FIREBASE_CONFIG,
  FUNCTIONS_REGION,
  HOMEPAGE,
  IS_PRODUCTION,
  OWNER_EMAIL,
  PAYMENT_PUBLISHABLE_KEY,
  TAX_PUBLISHABLE_KEY,
  TURING_TEST_PUBLISHABLE_KEY
} from "./development"
`

const getNonLocal = ({ firebaseConfig, projectId, displayName }: ConfigOptions) =>
  `/* eslint-disable max-len */
export const DISPLAY_NAME = "${displayName}"
export const CLOUD_PROJECT_ID = "${projectId}"
export const CLIENT_APP_URL = "https://\${CLOUD_PROJECT_ID}.web.app"
export const HOMEPAGE = "sink"
export const OWNER_EMAIL = "d.a.mayer92@gmail.com"
export const IS_PRODUCTION = false
export const IS_LOCAL = false
export const CLOUD_PROJECT_REGION = "us-east1"
export const FUNCTIONS_REGION = "us-central1"
export const FUNCTIONS_BASE_URL = \`https://\${FUNCTIONS_REGION}-\${CLOUD_PROJECT_ID}.cloudfunctions.net\`
export const TRUSTED_ORIGINS = [
  CLIENT_APP_URL,
  "http://localhost",
  "http://localhost:8100",
  "capacitor://localhost",
  "https://\${CLOUD_PROJECT_ID}.firebaseapp.com",
]
export const TAX_PUBLISHABLE_KEY = ""
export const PAYMENT_PUBLISHABLE_KEY = ""
export const TURING_TEST_PUBLISHABLE_KEY = ""
export const FIREBASE_CONFIG = ${JSON.stringify(firebaseConfig, null, 2)}
`

export function construct(configuration: Configuration) {
  return function ({
    firebaseConfig,
    projectId,
    displayName
  }: ConfigOptions) {
    switch (configuration) {
      case Configuration.LOCAL:
        return getLocal()
      default:
        return getNonLocal({
          firebaseConfig,
          projectId,
          displayName
        })
    }
  }
}
