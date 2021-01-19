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
  projectId: string
  displayName: string
  configuration?: Configuration
  clean?: boolean
  skipBuild?: boolean
}

export default function main() {
  const cli = yargs(process.argv)

  const {
    projectId: projectId,
    displayName,
    configuration: onlyConfiguration,
    clean,
    skipBuild,
  } = cli.argv as Argv<Options>["argv"]
  const cloudProjectIds: string[] = []

  if (!projectId) throw new InvalidInputError("--projectId is required.")
  if (!displayName) throw new InvalidInputError("--displayName is required.")
  if (!projectId.match(/^[a-z0-9\-].+$/)) {
    throw new InvalidInputError("--projectId must be lowercase with hyphens.")
  }

  const projectConfigurations = !!onlyConfiguration
    ? [onlyConfiguration]
    : [Configuration.DEVELOPMENT, Configuration.PRODUCTION]

  const PATH_TO_GCLOUD = ".funk/google-cloud-sdk/bin/gcloud"
  const PATH_TO_BUILD_ARTIFACTS =
    ".funk/build-pipeline-output/bootstrap-project"

  const hasInitializedBefore = existsSync(resolve(".funk"))
  let isClean = !hasInitializedBefore

  if (hasInitializedBefore || clean) {
    rimrafSync(resolve(".funk"))
    isClean = true
  }

  throwIfNonzero(exec("npm install"))
  throwIfNonzero(
    exec(`
    # Set up the working directory.
    mkdir -p .funk`),
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
  `),
  )

  for (const configuration of projectConfigurations) {
    // TODO:
    // - enable anonymous, email/password, and google sign-in methods
    // - set app secrets? Some APIs will probably require that this be done via a GUI.
    //   - avalara api key (see https://admin.avalara.com)
    // - npm i -g cordova
    const cloudProjectId = `${projectId}-${configuration}`
    const configTemplate = constructConfigTemplate(configuration)
    const localConfigTemplate = constructConfigTemplate(Configuration.LOCAL)
    const firebaseJsonTemplate = constructFirebaseJsonTemplate(configuration)
    const localFirebaseJsonTemplate = constructFirebaseJsonTemplate(
      Configuration.LOCAL,
    )

    const KMS_LOCATION = "global"
    const KEY_RING_ID = "main"
    const KEY_ID = "main"

    const PATH_TO_APP_ID_FILE = `${PATH_TO_BUILD_ARTIFACTS}/firebase-apps-create-web-${kebabCase(
      displayName,
    )}`
    const PATH_TO_APP_CONFIG_FILE = `${PATH_TO_BUILD_ARTIFACTS}/firebase-apps-sdkconfig-web-${kebabCase(
      displayName,
    )}`

    cloudProjectIds.push(cloudProjectId)

    throwIfNonzero(
      exec(`
        # Create the gcloud project.
        ${PATH_TO_GCLOUD} projects create ${cloudProjectId} --name=${displayName}

        # Add Firebase to the gcloud project.
        firebase projects:addfirebase ${cloudProjectId}

        ${PATH_TO_GCLOUD} config set project ${cloudProjectId}
        firebase use ${cloudProjectId}
      `),
    )

    throwIfNonzero(
      exec(`
      # Add a web app.
      mkdir -p ${PATH_TO_BUILD_ARTIFACTS}
      echo \`firebase apps:create WEB "${displayName}"\` >> ${PATH_TO_APP_ID_FILE}
    `),
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
      "utf-8",
    )
    firebaseConfigFile = firebaseConfigFile.match(/\{.+/)?.[0]!
    const firebaseConfig = JSON.parse(
      firebaseConfigFile?.substring(
        0,
        firebaseConfigFile.lastIndexOf("}") + 1,
      )!,
    )
    writeFileSync(
      resolve(__dirname, "../../", `configuration/${configuration}.ts`),
      configTemplate({ firebaseConfig, cloudProjectId, displayName }),
    )
    writeFileSync(
      resolve(
        __dirname,
        "../../",
        `configuration/${configuration}.firebase.json`,
      ),
      firebaseJsonTemplate(cloudProjectId),
    )
    writeFileSync(
      resolve(__dirname, "../../", ".firebaserc"),
      firebasercTemplate(projectId),
    )
    writeFileSync(
      resolve(__dirname, "../../", "ionic.config.json"),
      ionicConfigTemplate(displayName),
    )

    if (configuration === Configuration.DEVELOPMENT) {
      writeFileSync(
        resolve(__dirname, "../../", "configuration/local.ts"),
        localConfigTemplate({
          firebaseConfig,
          cloudProjectId,
          displayName,
        }),
      )
      writeFileSync(
        resolve(__dirname, "../../", "configuration/local.firebase.json"),
        localFirebaseJsonTemplate(projectId),
      )
    }

    // Enable billing.
    readlineSync.question(
      `\nPlease enable billing for the project ${cloudProjectId} by visiting ` +
        "https://console.cloud.google.com/billing/projects.\n\n" +
        `In the Actions column for this ${cloudProjectId}, click the button and select "Change Billing".\n\n` +
        "Select a billing account from the dropdown. You may have to add one if none exist.\n\n" +
        'When you\'re finished, continue by hitting the "Return" key here.\n',
    )

    // Enable Functions and Firestore.
    console.log(`
Please enable Cloud Functions and Firestore by following these steps. Then press
"Return" to continue.

    1. Visit https://console.firebase.google.com/project/${cloudProjectId}/firestore.
    2. Click "Create database".
    3. Click "Next".
    4. Select "us-east-1" as the region.
    5. Click "Enable".
    6. Wait for the setup to complete.

    Press "Return" when you\'re finished.
    `)

    // Restrict the App Engine default service account's access.
    throwIfNonzero(
      exec(`
      ${PATH_TO_GCLOUD} projects remove-iam-policy-binding ${cloudProjectId} \\
        --member=serviceAccount:${cloudProjectId}@appspot.gserviceaccount.com \\
        --role=roles/editor
      ${PATH_TO_GCLOUD} projects add-iam-policy-binding ${cloudProjectId} \\
        --member=serviceAccount:${cloudProjectId}@appspot.gserviceaccount.com \\
        --role=roles/cloudkms.cryptoKeyEncrypterDecrypter
      ${PATH_TO_GCLOUD} projects add-iam-policy-binding ${cloudProjectId} \\
        --member=serviceAccount:${cloudProjectId}@appspot.gserviceaccount.com \\
        --role=roles/datastore.user
      ${PATH_TO_GCLOUD} projects add-iam-policy-binding ${cloudProjectId} \\
        --member=serviceAccount:${cloudProjectId}@appspot.gserviceaccount.com \\
        --role=roles/firebaseauth.admin
    `),
    )

    // Enable other services, add mobile build tools, and run the build.
    throwIfNonzero(
      exec(`
      # Enable services.
      ${PATH_TO_GCLOUD} services enable --project ${cloudProjectId} \\
        cloudkms.googleapis.com

      # Set up KMS for data encryption.
      ${PATH_TO_GCLOUD} kms keyrings create ${KEY_RING_ID} \\
        --location ${KMS_LOCATION}
      ${PATH_TO_GCLOUD} kms keys create ${KEY_ID} \\
        --location ${KMS_LOCATION} \\
        --keyring ${KEY_RING_ID} \\
        --purpose encryption

      # Set up the firestore emulator.
      ${isClean ? "firebase setup:emulators:firestore" : ""}

      # Add iOS.
      ${isClean ? "ionic capacitor add ios" : ""}
      # If you get the error "Error running update: Analyzing dependencies", run the
      # following command:
      # sudo xcode-select -s /Applications/Xcode.app/Contents/Developer
      # See: https://github.com/ionic-team/capacitor/issues/1072

      # Add Android.
      ${isClean ? "ionic capacitor add android" : ""}

      # Run the very first build.
      ${!skipBuild ? `npm run build::${configuration}` : ""}
    `),
    )
  }

  console.log(`

🎸🎸🎸🎸 Your funkadelic app is almost ready! 🎸🎸🎸🎸

Just a few manual steps to go.

  1. Enable the following authentication providers in the Firebase console:

    Email/Password
    Google
    Anonymous

When enabling Google, set ${displayName} as the Project public-facing name.

${cloudProjectIds
  .map(
    (cloudProjectId) =>
      `    ${cloudProjectId.substring(cloudProjectId.lastIndexOf("-") + 1)}: ` +
      `https://console.firebase.google.com/project/${cloudProjectId}/authentication/providers`,
  )
  .join("\n")}

2. Visit your project's service accounts in Google Cloud:

${cloudProjectIds
  .map(
    (cloudProjectId) =>
      `    ${cloudProjectId.substring(cloudProjectId.lastIndexOf("-") + 1)}: ` +
      `https://console.cloud.google.com/iam-admin/serviceaccounts?authuser=0&folder=&organizationId=&project=${cloudProjectId}`,
  )
  .join("\n")}

2.a. For each configuration, generate a private JSON key for the service account
     named "firebase-adminsdk" by clicking on the "Actions" column and
     selecting "Create key". Save it to your machine (NOT in source control).

     Save the path to the private key file in the PATH_TO_ADMIN_CREDENTIALS_JSON
     variable in \`{CONFIGURATION}.env\`.

2.b. For each configuration, generate a private JSON key for the service account
     named "App Engine Default" by clicking on the "Actions" column and
     selecting "Create key". Save it to your machine (NOT in source control).

     Save the path to the private key file in the PATH_TO_APPLICATION_CREDENTIALS_JSON
     variable in \`{CONFIGURATION}.env\`.

     For example, in \`development.env\`, it should look like:

     export PATH_TO_APPLICATION_CREDENTIALS_JSON=/Users/myusername/folder-for-secrets/service-account-private-key.json

3. Set the configuration-specific PROJECT_ID variable in \`{CONFIGURATION}.env\` in the
   format {PROJECT_ID}-{CONFIGURATION}. For example, in \`development.env\`, it should look like:

   export PROJECT_ID=${projectId}-development

4. Deploy the \`development\` project by running, in your bash or zsh shell:

   npm run deploy::development

5. Bring it home! Run the app in your browser:

   5.a. In one bash or zsh shell, run \`npm run api::develop::local\` to boot up the local API
   5.b. Once step 2 has succeeded, in another shell, run \`npm run deploy::local\` to seed the local database
   5.c. In a third shell, run \`npm run ui::develop::local\` to build the web app and run it in your browser, with live reloading
  `)
}

if (require.main === module) {
  main()
}
