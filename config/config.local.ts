/* eslint-disable max-len */

// The following variables are duplicated from the `development` configuration.
export const OWNER_EMAIL = "d.a.mayer92@gmail.com"
export const IS_PRODUCTION = false
export const CLOUD_PROJECT_ID = "funk-development-0907"
export const CLOUD_PROJECT_REGION = "us-east1"
export const FUNCTIONS_REGION = "us-central1"
export const SALES_TAX_RATE_CALCULATOR_URL = "https://rest.avatax.com/api/v2/taxrates/bypostalcode"
export const TAX_PUBLISHABLE_KEY = "2000143843"
export const PAYMENT_PUBLISHABLE_KEY = "pk_test_FCCMRbB54V2BMvswJxpJht0T002zd0buM1"
export const TURING_TEST_PUBLISHABLE_KEY = "6LdS_rsZAAAAAEUeQO7xkWMJno0N068Xv5l136OR"
export const FIREBASE_CONFIG = {
  apiKey: "AIzaSyBZQgIw4lH7fKN_gwjMZjKvk1HCIAnLDsg",
  authDomain: "funk-development-0907.firebaseapp.com",
  databaseURL: "https://funk-development-0907.firebaseio.com",
  projectId: "funk-development-0907",
  storageBucket: "funk-development-0907.appspot.com",
  messagingSenderId: "984336631582",
  appId: "1:984336631582:web:fc0bdaf5d3a1d66e03ab0f",
}

// The following variables are specific to the `local` configuration.
export const CLIENT_APP_URL = "http://localhost:8100"
export const IS_LOCAL = true
export const FUNCTIONS_BASE_URL = `http://localhost:5001/${CLOUD_PROJECT_ID}/${FUNCTIONS_REGION}`
export const TRUSTED_ORIGINS = [
  CLIENT_APP_URL,
  "http://localhost",
  "capacitor://localhost",
]
