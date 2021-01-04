# This file is intended to manage non-Firebase resources.
# Firebase resources will be managed via the `gcloud` API.
provider "google" {
  project = var.cloud_project_id
  region = var.cloud_project_region
}
provider "google-beta" {
  project = var.cloud_project_id
  region = var.cloud_project_region
}
resource "google_project" "main" {
  provider = google-beta
  project_id = var.cloud_project_id
  name = var.display_name
  billing_account = data.google_billing_account.account.id
}
data "google_billing_account" "account" {
  billing_account = "billingAccounts/${var.cloud_billing_account_id}"
}

# resource "google_project_iam_member" "owner" {
#   role = "roles/owner"
#   member = "user:${var.owner_email}"
#   depends_on = [google_project.main]
# }

resource "google_project_iam_binding" "app_service_account_kms" {
  project = var.cloud_project_id
  depends_on = [google_project.main]
  role = "roles/cloudkms.cryptoKeyEncrypterDecrypter"
  members = [ "serviceAccount:test-a9c4abf-development@appspot.gserviceaccount.com" ]
}
resource "google_project_iam_binding" "app_service_account_firestore" {
  project = var.cloud_project_id
  depends_on = [google_project.main]
  role = "roles/datastore.user"
  members = [ "serviceAccount:test-a9c4abf-development@appspot.gserviceaccount.com" ]
}
resource "google_project_iam_binding" "app_service_account_firebase_auth" {
  project = var.cloud_project_id
  depends_on = [google_project.main]
  role = "roles/firebaseauth.admin"
  members = [
    "serviceAccount:firebase-adminsdk-9u0ug@test-a9c4abf-development.iam.gserviceaccount.com",
    "serviceAccount:test-a9c4abf-development@appspot.gserviceaccount.com",
  ]
}

# resource "google_project_service" "compute" {
#   service = "compute.googleapis.com"
#   depends_on = [google_project.main]
# }
resource "google_project_service" "billing" {
  service = "cloudbilling.googleapis.com"
  depends_on = [google_project.main]
}
resource "google_project_service" "kms" {
  service = "cloudkms.googleapis.com"
  depends_on = [google_project.main]
}

##### KMS #####
# source: https://github.com/terraform-google-modules/terraform-google-kms/blob/master
# module "kms" {
#   source  = "terraform-google-modules/kms/google"
#   project_id = var.project_id
#   location = "global"
#   keyring = "main"
#   keys = ["main"]
#   # keys can be destroyed by Terraform
#   prevent_destroy = false
# }
resource "google_kms_key_ring" "key_ring" {
  name = "main"
  project = var.cloud_project_id
  location = "global"
}

resource "google_kms_crypto_key" "key" {
  count = 1
  name = "main"
  key_ring = google_kms_key_ring.key_ring.self_link
  rotation_period = "100000s"

  lifecycle {
    prevent_destroy = true
  }

  version_template {
    algorithm = "GOOGLE_SYMMETRIC_ENCRYPTION"
    protection_level = "SOFTWARE"
  }
}
##### END KMS #####

