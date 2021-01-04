source ../development.env

PATH_TO_VAR_FILE=../.funk/build-pipeline-output/configuration/configuration.auto.tfvars.json

terraform import \
  -var-file=$PATH_TO_VAR_FILE \
  google_project.main \
  $PROJECT_ID

terraform import \
  -var-file=$PATH_TO_VAR_FILE \
  google_project_iam_binding.app_service_account_kms \
  "$PROJECT_ID roles/cloudkms.cryptoKeyEncrypterDecrypter serviceAccount:$PROJECT_ID@appspot.gserviceaccount.com"
terraform import \
  -var-file=$PATH_TO_VAR_FILE \
  google_project_iam_binding.app_service_account_firestore \
  "$PROJECT_ID roles/datastore.user serviceAccount:$PROJECT_ID@appspot.gserviceaccount.com"
terraform import \
  -var-file=$PATH_TO_VAR_FILE \
  google_project_iam_binding.app_service_account_firebase_auth \
  "$PROJECT_ID roles/firebaseauth.admin serviceAccount:$PROJECT_ID@appspot.gserviceaccount.com"

terraform import \
  -var-file=$PATH_TO_VAR_FILE \
  google_project_service.billing \
  "$PROJECT_ID/cloudbilling.googleapis.com"
terraform import \
  -var-file=$PATH_TO_VAR_FILE \
  google_project_service.kms \
  "$PROJECT_ID/cloudkms.googleapis.com"

terraform import \
  -var-file=$PATH_TO_VAR_FILE \
  google_kms_key_ring.key_ring \
  "global/main"

terraform import \
  -var-file=$PATH_TO_VAR_FILE \
  google_kms_crypto_key.key \
  "global/main/main"


