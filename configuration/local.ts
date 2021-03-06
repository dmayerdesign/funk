import { CLOUD_PROJECT_ID, FUNCTIONS_REGION } from "./development"

/* eslint-disable max-len */
export const CLIENT_APP_URL = "http://localhost:8100"
export const CONFIGURATION = "local" as string
export const INTEGRATION_TEST = false
export const FUNCTIONS_BASE_URL = `http://localhost:5001/${CLOUD_PROJECT_ID}/${FUNCTIONS_REGION}`
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
  OWNER_EMAIL,
  PAYMENT_PUBLISHABLE_KEY,
  TAX_PUBLISHABLE_KEY,
  TURING_TEST_PUBLISHABLE_KEY,
} from "./development"
