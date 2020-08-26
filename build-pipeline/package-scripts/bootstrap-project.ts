/* eslint-disable max-len */
import { exec } from "shelljs"
import program from "commander"
import { configToJson } from "../../config/helpers/config-to-json"

(async () =>
{
  program.option("-c, --configuration <configuration>", "e.g. production")
  program.parse(process.argv)
  const { configuration } = program.opts()
  const {
    CLOUD_PROJECT_ID,
  } = configToJson(configuration)

  const KMS_LOCATION = "global"
  const KEY_RING_ID = "primary"
  const KEY_ID = "main"

  // TODO:
  // - do a full firebase init
  // - enable billing (https://cloud.google.com/billing/v1/libraries)
  // - enable anonymous, email/password, and google sign-in methods
  // - create keyring in each configuration
  // - grant "use for encryption" permission to keyring
  // - set app secrets
  //   - avalara api key (see https://admin.avalara.com)
  // - initial deploy
  // - npm i -g cordova

  exec(`
    # Install.
    echo "Installing dependencies..."
    npm i
    # Download the gcloud SDK for Mac OS.
    curl https://dl.google.com/dl/cloudsdk/channels/rapid/downloads/google-cloud-sdk-272.0.0-darwin-x86_64.tar.gz -o google-cloud-sdk.tar.gz
    tar -xzvf google-cloud-sdk.tar.gz
    chmod +x ./google-cloud-sdk/bin/gcloud

    # Configure.
    ./google-cloud-sdk/bin/gcloud init
    ./google-cloud-sdk/bin/gcloud config set project ${CLOUD_PROJECT_ID}
    node_modules/.bin/firebase use ${CLOUD_PROJECT_ID}

    # Add a service account.
    # Name it "Functions".
    # Give it the "Project > Owner" role.
    # Create a private key and save it somewhere.

    # Enable services.
    ./google-cloud-sdk/bin/gcloud services enable --project ${CLOUD_PROJECT_ID} \
      cloudkms.googleapis.com

    # Set up KMS for data encryption.
    ./google-cloud-sdk/bin/gcloud kms keyrings create ${KEY_RING_ID} \
      --location ${KMS_LOCATION}
    ./google-cloud-sdk/bin/gcloud kms keys create ${KEY_ID} \
      --location ${KMS_LOCATION} \
      --keyring ${KEY_RING_ID} \
      --purpose encryption

    # Set up the firestore emulator.
    node_modules/.bin/firebase setup:emulators:firestore
  `)
})()
