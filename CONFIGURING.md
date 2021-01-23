# Install dependencies

1. [Install Node.](https://nodejs.org/en/download/)
2. If you haven't already done so, [clone](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository) or [fork](https://docs.github.com/en/github/getting-started-with-github/fork-a-repo) this repository.
   Remember where in your filesystem the repository was cloned.
3. Open up a shell (like Terminal on Mac) and make sure everything's working.
   Type `node --version` into the shell and hit Return.
   If you see a version number, and no obvious errors, everything's good to go!
   (If not, then Node probably didn't get installed correctly; [try a different method of installing Node](https://nodejs.dev/learn/how-to-install-nodejs)).
4. In your shell, make sure you can `cd` into your cloned `funk` folder like so:

```sh
# Replace /Users/dmayerdesign/Code with wherever your cloned `funk` folder lives.
cd /Users/dmayerdesign/Code/funk
```

Any shell command you see in this project will always be run from this folder, unless stated otherwise.

# Automatic setup using the setup wizard

Copy-paste the following into your shell and hit Return:

```sh
npm run setup-wizard -- \
  --displayName "My Awesome Project" \
  --projectId "my-awesome-project"
```

Follow the prompts, and you'll have a project up and running in no time!

# Manual setup

If for some reason the above script doesn't work, or if you just prefer to get your hands dirty in the infrastructure, you have the option of configuring and deploying a new project without any automated help from the setup wizard.

This project is set up to deploy 2 cloud projects: one for the `development` configuration, and one for the `production` configuration.
(The "local" configuration found in `local.ts` uses the `development` configuration with a few modifications).
When following these instructions, replace `{CONFIGURATION}` with either `development` or `production`.

## Configure core plugins

### Infrastructure

1. Create a Firebase project named like `myproject-{CONFIGURATION}`.
2. Enable Functions and Firestore.
3. Create a “web” app within the project and add its configuration to `configuration/{CONFIGURATION}.ts`.
   - Set the “Public-facing name” for the project (this shows up in the email verification email and other user-facing places).
   - Set the support email address for the project.
4. Generate a private key for the root service account and save it to your machine (NOT in source control). Save the path to the private key file in the PATH_TO_ADMIN_CREDENTIALS_JSON variable in `{CONFIGURATION}.env`.
5. Generate a private key for the "App Engine Default" service account and save it to your machine (NOT in source control). Save the path to the private key file in the PATH_TO_APPLICATION_CREDENTIALS_JSON variable in `{CONFIGURATION}.env`.

### Authentication

1. Enable the following authentication providers in the Firebase console:
   - Email/Password
   - Google
   - Anonymous

### Cloud Functions

1. Update the default App Engine service account so that it only has the following roles:
   - KMS Encrypt/Decrypt
   - Cloud Datastore User (Firestore read/write)
   - Firebase Authentication Admin
2. Enable Cloud KMS on the project
3. Create a KMS keyring and key (both named "main").

```sh
gcloud kms keyrings create main --location global
gcloud kms keys create main --location global \
  --keyring main \
  --purpose encryption
```

# Plugin configuration

## Tax

1. Sign up for an [Avalara AvaTax account](https://buy.avalara.com/signup).
2. Create a license key by visiting https://integrations.avalara.com/#/software-keys and
   [following these instructions](https://developer.avalara.com/avatax/authentication-in-rest/).
3. Save the license key using the form at /admin with the key TAX_SERVICE_PROVIDER_SECRET.
4. Locate the account ID.
5. Save the account ID in the TAX_PUBLISHABLE_KEY variable in `configuration/*.ts`.

## Payment

1. Sign up for a Stripe account.
2. Locate the test publishable key (begins with `pk_test`) and test secret key (begins with `sk_test`).
3. Save the secret key using the form at /admin with the key PAYMENT_SERVICE_PROVIDER_SECRET.
4. Save the publishable key in the PAYMENT_PUBLISHABLE_KEY variable in `configuration/*.ts`.

## Email

1. Sign up for a SendGrid account.
2. Create an API key.
3. Save the API key using the form at /admin with the key EMAIL_SERVICE_PROVIDER_SECRET.

## Spam protection (turing test)

1. Sign up for a Recaptcha v3 account.
2. Locate the site key and the API key.
3. Save the API key using the form at /admin with the key TURING_TEST_SERVICE_PROVIDER_SECRET.
4. Save the site key in the TURING_TEST_PUBLISHABLE_KEY variable in `configuration/*.ts`.

# Deployment

## Configure DNS

### To host both `www.yourdomain.com` and `yourdomain.com` (without forwarding):

1. Follow the steps in Firebase to connect a "custom domain", including adding the TXT record
   to verify ownership. Use the "naked domain" (not `www`) for this step.
2. When adding the A record to point the naked domain to the host IP addresses, use `@` rather than
   the full domain name.
3. Go through the same process for the `www` subdomain. Add an A record identical to the record for the root domain,
   with the only difference being that `www` is entered into the "host" field rather than `@`.
4. Set up `www.yourdomain.com` as an additional custom domain in the Firebase hosting console.
