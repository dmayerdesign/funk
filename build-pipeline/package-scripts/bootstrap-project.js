#!/usr/bin/env node
const { exec } = require('shelljs')
const program = require('commander')
const { configToJson } = require('../../config/helpers/config-to-json')

(async () =>
{
  program.option('-c, --configuration <configuration>', 'e.g. production')
  program.parse(process.argv)
  const { configuration } = program.opts()
  const {
    FIRE_PROJECT_ID,
  } = configToJson(configuration)

  const KMS_LOCATION = 'global'
  const KEY_RING_ID = FIRE_PROJECT_ID
  const KEY_ID = 'master'

  // TODO:
  // - do a full firebase init
  // - enable billing (https://cloud.google.com/billing/v1/libraries)
  // - enable anonymous, email/password, and google sign-in methods
  // - create keyring in each configuration
  // - grant "use for encryption" permission to keyring
  // - set app secrets
  //   - avalara api key (see https://admin.avalara.com)
  // - initial deploy

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
    ./google-cloud-sdk/bin/gcloud config set project ${FIRE_PROJECT_ID}
    firebase use ${FIRE_PROJECT_ID}

    # Enable services.
    ./google-cloud-sdk/bin/gcloud services enable --project ${FIRE_PROJECT_ID} \
      cloudkms.googleapis.com

    # Set up KMS for data encryption.
    ./google-cloud-sdk/bin/gcloud kms keyrings create ${KEY_RING_ID} \
      --location ${KMS_LOCATION}
    ./google-cloud-sdk/bin/gcloud kms keys create ${KEY_ID} \
      --location ${KMS_LOCATION} \
      --keyring ${KEY_RING_ID} \
      --purpose encryption

    # Set up the firestore emulator.
    firebase setup:emulators:firestore
  `)
})()