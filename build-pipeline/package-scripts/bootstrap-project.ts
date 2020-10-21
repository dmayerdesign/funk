/* eslint-disable max-len */
import program from "commander"
import { readFileSync, writeFileSync } from "fs-extra"
import { kebabCase } from "lodash"
import { resolve } from "path"
import readlineSync from "readline-sync"
import { exec } from "shelljs"
import { construct as constructConfigTemplate } from "../code-gen/templates/configuration"
import { construct as constructFirebaseJsonTemplate } from "../code-gen/templates/configuration-firebase.json"

export default function main() {
  program.option("-c, --configuration <configuration>", "e.g. development")
  program.option("-p, --projectId <projectId>", "e.g. my-project-development")
  program.option("-p, --projectId <projectId>", "e.g. my-project-development")
  program.parse(process.argv)
  const { configuration, projectId, displayName } = program.opts()

  const configTemplate = constructConfigTemplate(configuration)
  const firebaseJsonTemplate = constructFirebaseJsonTemplate(configuration)

  const KMS_LOCATION = "global"
  const KEY_RING_ID = "main"
  const KEY_ID = "main"

  // TODO:
  // - enable billing (https://cloud.google.com/billing/v1/libraries)
  // - enable anonymous, email/password, and google sign-in methods
  // - create keyring in each configuration
  // - grant "use for encryption" permission to keyring
  // - set app secrets? Some APIs will probably require that this be done via a GUI.
  //   - avalara api key (see https://admin.avalara.com)
  // - initial deploy
  // - npm i -g cordova

  // TODO: Make sure this runs inside of an npm script, to make use of
  // the binary aliases.

  const PATH_TO_GCLOUD = ".funk/google-cloud-sdk/bin/gcloud"
  const PATH_TO_BUILD_ARTIFACTS = ".funk/build-pipeline-output/bootstrap-project"
  const PATH_TO_APP_ID_FILE = `${PATH_TO_BUILD_ARTIFACTS}/firebase-apps-create-web-${kebabCase(
    displayName
  )}`
  const PATH_TO_APP_CONFIG_FILE = `${PATH_TO_BUILD_ARTIFACTS}/firebase-apps-sdkconfig-web-${kebabCase(
    displayName
  )}`

  // Log into Google Cloud and create the Firebase project.
  exec(`
    # Set up the working directory.
    mkdir -p .funk

    # Download the gcloud SDK for Mac OS.
    curl https://dl.google.com/dl/cloudsdk/channels/rapid/downloads/google-cloud-sdk-272.0.0-darwin-x86_64.tar.gz -o .funk/google-cloud-sdk.tar.gz
    tar -xzvf .funk/google-cloud-sdk.tar.gz --directory .funk
    chmod +x ${PATH_TO_GCLOUD}

    # Log into gcloud.
    # TODO: determine whether "gcloud init" is required, and/or whether it can replace "auth login".
    ${PATH_TO_GCLOUD} auth login --brief

    # Create the gcloud project.
    ${PATH_TO_GCLOUD} projects create ${projectId}

    # Add Firebase to the gcloud project.
    firebase projects:addfirebase ${projectId}

    # Set project.
    ${PATH_TO_GCLOUD} config set project ${projectId}
    firebase use ${projectId}

    # Add a web app.
    mkdir -p ${PATH_TO_BUILD_ARTIFACTS}
    echo \`firebase apps:create WEB "${displayName}"\` >> ${PATH_TO_APP_ID_FILE}

    # Restrict the App Engine default service account's access.
    gcloud projects remove-iam-policy-binding ${projectId} \\
      --member=serviceAccount:${projectId}@appspot.gserviceaccount.com \\
      --role=roles/editor
    gcloud projects add-iam-policy-binding ${projectId} \\
      --member=serviceAccount:${projectId}@appspot.gserviceaccount.com \\
      --role=roles/cloudkms.cryptoKeyEncrypterDecrypter
    gcloud projects add-iam-policy-binding ${projectId} \\
      --member=serviceAccount:${projectId}@appspot.gserviceaccount.com \\
      --role=roles/datastore.user
    gcloud projects add-iam-policy-binding ${projectId} \\
      --member=serviceAccount:${projectId}@appspot.gserviceaccount.com \\
      --role=roles/firebaseauth.admin
  `)

  // Get and cache the Firebase web config.
  const appIdFile = readFileSync(PATH_TO_APP_ID_FILE).toString("utf-8")
  const appId = appIdFile
    .split("App ID: ")[1]
    .trim()
    .match(/^[a-zA-Z0-9:]+/)?.[0]
  exec(`
    # Add the web app config to configuration/${configuration}.ts.
    echo \`firebase apps:sdkconfig WEB ${appId}\` >> ${PATH_TO_APP_CONFIG_FILE}
  `)

  // Create configuration files, using the cached Firebase config.
  let appConfigFile = readFileSync(PATH_TO_APP_CONFIG_FILE).toString("utf-8")
  appConfigFile = appConfigFile.match(/\{.+/)?.[0]!
  const appConfig = JSON.parse(
    appConfigFile?.substring(0, appConfigFile.lastIndexOf("}") + 1)!
  )
  writeFileSync(resolve(__dirname, "../../", `configuration/${configuration}.ts`), configTemplate(appConfig))
  writeFileSync(resolve(__dirname, "../../", `configuration/${configuration}.firebase.json`), firebaseJsonTemplate())

  // Enable billing.
  readlineSync.question(
    `\nPlease enable billing for the project ${projectId} by visiting ` +
      `https://console.cloud.google.com/billing/projects.\n\n` +
      `When you're finished, return here and press any key.\n`
  )

  // Enable other services, add mobile build tools, and run the build.
  exec(`
    # Enable services.
    ${PATH_TO_GCLOUD} services enable --project ${projectId} \\
      cloudkms.googleapis.com

    # Set up KMS for data encryption.
    ${PATH_TO_GCLOUD} kms keyrings create ${KEY_RING_ID} \\
      --location ${KMS_LOCATION}
    ${PATH_TO_GCLOUD} kms keys create ${KEY_ID} \\
      --location ${KMS_LOCATION} \\
      --keyring ${KEY_RING_ID} \\
      --purpose encryption

    # Set up the firestore emulator.
    firebase setup:emulators:firestore

    # Add iOS.
    # ionic capacitor add ios
    # If you get the error "Error running update: Analyzing dependencies", run the
    # following command:
    # sudo xcode-select -s /Applications/Xcode.app/Contents/Developer
    # See: https://github.com/ionic-team/capacitor/issues/1072

    # Add Android.
    # ionic capacitor add android

    # Do the initial deploy.
    # npm run deploy::${configuration}
  `)

  console.log("\n\n")
  console.log("🎸 Your Funk app is ready! 🎸")
  console.log("")
  console.log("To run the app in your browser:")
  console.log("  1) In one bash or zsh shell, run `npm run functions::develop::local`")
  console.log("  2) Once step 2 has succeeded, in another shell, run `npm run deploy::local`")
  console.log("  3) In a third shell, run `npm run ui::develop::local`")
}

if (require.main === module) {
  main()
}
