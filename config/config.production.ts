/* eslint-disable max-len */
export const OWNER_EMAIL = "d.a.mayer92@gmail.com"
export const IS_PRODUCTION = false
export const CLOUD_PROJECT_ID = "funk-development"
export const CLOUD_PROJECT_REGION = "us-east1"
export const FUNCTIONS_REGION = "us-central1"
export const FUNCTIONS_BASE_URL = `https://${FUNCTIONS_REGION}-${CLOUD_PROJECT_ID}.cloudfunctions.net`
export const TRUSTED_ORIGINS = "http://localhost:8100,https://funk-development.firebaseapp.com,https://funk-development.web.app"
// TODO: Remove this in favor of setting the GOOGLE_APPLICATION_CREDENTIALS env variable.
export const PATH_TO_SERVICE_ACCOUNT_JSON = "/Users/danielmayer/.secrets/funk-development/funk-development-093bbbc44257.json"
export const TAX_RATE_CALCULATOR_URL = "https://rest.avatax.com/api/v2/taxrates/bypostalcode"
export const TAX_PUBLISHABLE_KEY = "2000143843"
export const PAYMENT_PUBLISHABLE_KEY = "pk_test_FCCMRbB54V2BMvswJxpJht0T002zd0buM1"
