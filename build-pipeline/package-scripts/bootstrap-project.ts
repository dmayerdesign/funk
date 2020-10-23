#!/usr/bin/env node
/* eslint-disable max-len */
import { existsSync, readFileSync, writeFileSync } from "fs-extra"
import { kebabCase } from "lodash"
import { resolve } from "path"
import readlineSync from "readline-sync"
import { sync as rimrafSync } from "rimraf"
import { exec } from "shelljs"
import yargs, { Argv } from "yargs"
import { Configuration } from "../../model/configuration"
import { InvalidInputError } from "../../model/error/invalid-input-error"
import { construct as constructConfigTemplate } from "../code-gen/templates/configuration"
import { construct as constructFirebaseJsonTemplate } from "../code-gen/templates/configuration-firebase.json"
import firebasercTemplate from "../code-gen/templates/firebaserc"
import ionicConfigTemplate from "../code-gen/templates/ionic-config"
import throwIfNonzero from "./helpers/throw-if-nonzero"

interface Options {
  projectName: string
  displayName: string
}

export default function main() {
  const cli = yargs(process.argv)

  const { projectName, displayName } = cli.argv as Argv<Options>["argv"]
  const projectIds: string[] = []

  if (!projectName) throw new InvalidInputError("--projectName is required.")
  if (!displayName) throw new InvalidInputError("--displayName is required.")
  if (!projectName.match(/^[a-z0-9\-].+$/)) {
    throw new InvalidInputError("--projectName must be lowercase with hyphens.")
  }

  const configurationWithProjects = [
    Configuration.DEVELOPMENT,
    Configuration.PRODUCTION,
  ]
  const PATH_TO_GCLOUD = ".funk/google-cloud-sdk/bin/gcloud"
  const PATH_TO_BUILD_ARTIFACTS =
    ".funk/build-pipeline-output/bootstrap-project"

  if (existsSync(resolve(".funk"))) {
    rimrafSync(resolve(".funk"))
  }

  throwIfNonzero(exec("npm install"))
  throwIfNonzero(
    exec(`
    # Set up the working directory.
    mkdir -p .funk`)
  )
  throwIfNonzero(
    exec(`
    # Download the gcloud SDK for Mac OS.
    curl https://dl.google.com/dl/cloudsdk/channels/rapid/downloads/google-cloud-sdk-272.0.0-darwin-x86_64.tar.gz -o .funk/google-cloud-sdk.tar.gz
    tar -xzvf .funk/google-cloud-sdk.tar.gz --directory .funk
    chmod +x ${PATH_TO_GCLOUD}

    # Log into gcloud.
    # TODO: determine whether "gcloud init" is required, and/or whether it can replace "auth login".
    ${PATH_TO_GCLOUD} auth login --brief
  `)
  )

  for (const configuration of configurationWithProjects) {
    // TODO:
    // - enable anonymous, email/password, and google sign-in methods
    // - set app secrets? Some APIs will probably require that this be done via a GUI.
    //   - avalara api key (see https://admin.avalara.com)
    // - npm i -g cordova
    const projectId = `${projectName}-${configuration}`
    const configTemplate = constructConfigTemplate(configuration)
    const localConfigTemplate = constructConfigTemplate(Configuration.LOCAL)
    const firebaseJsonTemplate = constructFirebaseJsonTemplate(configuration)
    const localFirebaseJsonTemplate = constructFirebaseJsonTemplate(
      Configuration.LOCAL
    )

    const KMS_LOCATION = "global"
    const KEY_RING_ID = "main"
    const KEY_ID = "main"

    const PATH_TO_APP_ID_FILE = `${PATH_TO_BUILD_ARTIFACTS}/firebase-apps-create-web-${kebabCase(
      displayName
    )}`
    const PATH_TO_APP_CONFIG_FILE = `${PATH_TO_BUILD_ARTIFACTS}/firebase-apps-sdkconfig-web-${kebabCase(
      displayName
    )}`

    projectIds.push(projectId)

    throwIfNonzero(
      exec(`
        # Create the gcloud project.
        # Add Firebase to the gcloud project.
        # Set project.
        ${PATH_TO_GCLOUD} projects create ${projectId}
        firebase projects:addfirebase ${projectId}
        ${PATH_TO_GCLOUD} config set project ${projectId}
        firebase use ${projectId}
      `)
    )

    throwIfNonzero(
      exec(`
      # Add a web app.
      mkdir -p ${PATH_TO_BUILD_ARTIFACTS}
      echo \`firebase apps:create WEB "${displayName}"\` >> ${PATH_TO_APP_ID_FILE}
    `)
    )

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
    let firebaseConfigFile = readFileSync(PATH_TO_APP_CONFIG_FILE).toString(
      "utf-8"
    )
    firebaseConfigFile = firebaseConfigFile.match(/\{.+/)?.[0]!
    const firebaseConfig = JSON.parse(
      firebaseConfigFile?.substring(0, firebaseConfigFile.lastIndexOf("}") + 1)!
    )
    writeFileSync(
      resolve(__dirname, "../../", `configuration/${configuration}.ts`),
      configTemplate({ firebaseConfig, projectId, displayName })
    )
    writeFileSync(
      resolve(
        __dirname,
        "../../",
        `configuration/${configuration}.firebase.json`
      ),
      firebaseJsonTemplate(projectName)
    )
    writeFileSync(
      resolve(__dirname, "../../", ".firebaserc"),
      firebasercTemplate(projectId)
    )
    writeFileSync(
      resolve(__dirname, "../../", "ionic.config.json"),
      ionicConfigTemplate(displayName)
    )

    if (configuration === Configuration.DEVELOPMENT) {
      writeFileSync(
        resolve(__dirname, "../../", "configuration/local.ts"),
        localConfigTemplate({ firebaseConfig, projectId, displayName })
      )
      writeFileSync(
        resolve(__dirname, "../../", "configuration/local.firebase.json"),
        localFirebaseJsonTemplate(projectName)
      )
    }

    // Enable billing.
    readlineSync.question(
      `\nPlease enable billing for the project ${projectId} by visiting ` +
        "https://console.cloud.google.com/billing/projects.\n\n" +
        `In the Actions column for this ${projectId}, click the button and select "Change Billing".\n\n` +
        "Select a billing account from the dropdown. You may have to add one if none exist.\n\n" +
        'When you\'re finished, continue by hitting the "Return" key here.\n'
    )

    // Enable Functions and Firestore.
    console.log("")
    console.log(
      "Please enable Cloud Functions and Firestore by following these steps. Then press"
    )
    console.log('"Return" to continue.')
    console.log("")
    console.log(
      `1. Visit https://console.firebase.google.com/project/${projectId}/firestore.`
    )
    console.log("")
    console.log('2. Click "Create database".')
    console.log("")
    console.log('3. Click "Next".')
    console.log("")
    console.log('4. Select "us-east-1" as the region.')
    console.log("")
    console.log('5. Click "Enable".')
    console.log("")
    console.log("6. Wait for the setup to complete.")
    console.log("")
    console.log("")
    readlineSync.question('Press "Return" when you\'re finished.')

    // Restrict the App Engine default service account's access.
    throwIfNonzero(
      exec(`
      ${PATH_TO_GCLOUD} projects remove-iam-policy-binding ${projectId} \\
        --member=serviceAccount:${projectId}@appspot.gserviceaccount.com \\
        --role=roles/editor
      ${PATH_TO_GCLOUD} projects add-iam-policy-binding ${projectId} \\
        --member=serviceAccount:${projectId}@appspot.gserviceaccount.com \\
        --role=roles/cloudkms.cryptoKeyEncrypterDecrypter
      ${PATH_TO_GCLOUD} projects add-iam-policy-binding ${projectId} \\
        --member=serviceAccount:${projectId}@appspot.gserviceaccount.com \\
        --role=roles/datastore.user
      ${PATH_TO_GCLOUD} projects add-iam-policy-binding ${projectId} \\
        --member=serviceAccount:${projectId}@appspot.gserviceaccount.com \\
        --role=roles/firebaseauth.admin
    `)
    )

    // Enable other services, add mobile build tools, and run the build.
    throwIfNonzero(
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

      # Run the very first build.
      # npm run build::${configuration}
    `)
    )
  }

  console.log("\n")
  console.log("🎸 Your funkadelic app is almost ready! 🎸")
  console.log("")
  console.log("Just a few manual steps to go.")
  console.log("")
  console.log("")
  console.log(
    "1. Enable the following authentication providers in the Firebase console:"
  )
  console.log("")
  console.log("   Anonymous")
  console.log("   Google")
  console.log("")
  console.log(
    `   When enabling Google, set ${displayName} as the "Project public-facing name"`
  )
  console.log(
    projectIds
      .map(
        (projectId) =>
          `    ${projectId.substring(projectId.lastIndexOf("-") + 1)}: ` +
          `https://console.firebase.google.com/project/${projectId}/authentication/providers`
      )
      .join("\n")
  )
  console.log("")
  console.log("")
  console.log("2. Visit your project's service accounts in Google Cloud:")
  console.log("")
  console.log(
    projectIds
      .map(
        (projectId) =>
          `    ${projectId.substring(projectId.lastIndexOf("-") + 1)}: ` +
          `https://console.cloud.google.com/iam-admin/serviceaccounts?authuser=0&folder=&organizationId=&project=${projectId}`
      )
      .join("\n")
  )
  console.log("")
  console.log(
    "   2.a. For each configuration, generate a private JSON key for the service account"
  )
  console.log(
    '        named "firebase-adminsdk" by clicking on the "Actions" column and'
  )
  console.log(
    '        selecting "Create key". Save it to your machine (NOT in source control).'
  )
  console.log("        Save the path to the private key file in the")
  console.log(
    "        PATH_TO_OWNER_CREDENTIALS_JSON variable in `{CONFIGURATION}.env`."
  )
  console.log("")
  console.log(
    "   2.b. For each configuration, generate a private JSON key for the service account"
  )
  console.log(
    '        named "App Engine Default" by clicking on the "Actions" column and'
  )
  console.log(
    '        selecting "Create key". Save it to your machine (NOT in source control).'
  )
  console.log("        Save the path to the private key file in the")
  console.log(
    "        PATH_TO_APPLICATION_CREDENTIALS_JSON variable in `{CONFIGURATION}.env`."
  )
  console.log("")
  console.log("   For example, in `development.env`, it should look like:")
  console.log("")
  console.log(
    "   export PATH_TO_APPLICATION_CREDENTIALS_JSON=/Users/myusername/folder-for-secrets/service-account-private-key.json"
  )
  console.log("")
  console.log("")
  console.log(
    "3. Set the configuration-specific PROJECT_ID variable in `{CONFIGURATION}.env` in the"
  )
  console.log(
    "   format {PROJECT_ID}-{CONFIGURATION}. For example, in `development.env`, it should look like:"
  )
  console.log("")
  console.log(`   export PROJECT_ID=${projectName}-development`)
  console.log("")
  console.log("")
  console.log(
    "4. Deploy the `development` project by running, in your bash or zsh shell:"
  )
  console.log("")
  console.log("   npm run deploy::development")
  console.log("")
  console.log("")
  console.log("5. Bring it home! Run the app in your browser:")
  console.log("")
  console.log(
    "   5.a. In one bash or zsh shell, run `npm run api::develop::local` to boot up the local API"
  )
  console.log("")
  console.log(
    "   5.b. Once step 2 has succeeded, in another shell, run `npm run deploy::local` to seed the local database"
  )
  console.log("")
  console.log(
    "   5.c. In a third shell, run `npm run ui::develop::local` to build the web app and run it in your browser, with live reloading"
  )
  console.log("")
}

if (require.main === module) {
  main()
}
