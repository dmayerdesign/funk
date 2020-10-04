# Implementing

This project is set up to support 2 cloud projects: one for the `development` configuration, and one for the `production` configuration.
(The "local" configuration found in `local.ts` uses the `development` configuration with a few modifications).
These instructions apply to any configuration, so replace ${CONFIGURATION} with either `development` or `production`.

## Configure core plugins

### Infrastructure

1. Create a Firebase project named `funk-${CONFIGURATION}`.
2. Enable Functions and Firestore.
3. Create a “web” app within the project and add its configuration to `configuration/local.ts` and `configuration/${CONFIGURATION}.ts`.
    * Set the “Public-facing name” for the project (this shows up in the email verification email and other user-facing places).
    * Set the support email address for the project.
4. Generate a private key for the root service account and save it to your machine. Save the path to the private key file in the PATH_TO_OWNER_CREDENTIALS_JSON variable in `${CONFIGURATION}.env`.
5. Generate a private key for the "App Engine Default" service account and save it to your machine. Save the path to the private key file in the PATH_TO_APPLICATION_CREDENTIALS_JSON variable in `${CONFIGURATION}.env`.

### Mobile

1. Edit `capacitor.config.json`.

### Authentication

1. Enable the following authentication providers in the Firebase console:
    * Anonymous
    * Google

### Cloud Functions

1. Update the default App Engine service account so that it only has the following roles:
    * KMS Encrypt/Decrypt
    * Cloud Datastore User (Firestore read/write)
    * Firebase Authentication Admin
2. Enable Cloud KMS on the project
3. Create a KMS keyring and key (both named "main").

```sh
gcloud kms keyrings create main --location global
gcloud kms keys create main --location global \
  --keyring main \
  --purpose encryption
```

## Configure operational plugins

### Tax

1. Sign up for an [Avalara AvaTax account](https://buy.avalara.com/signup).
2. Create a license key by visiting https://integrations.avalara.com/#/software-keys and
  [following these instructions](https://developer.avalara.com/avatax/authentication-in-rest/).
3. Save the license key using the form at /admin with the key TAX_SERVICE_PROVIDER_SECRET.
4. Locate the account ID.
5. Save the account ID in the TAX_PUBLISHABLE_KEY variable in `configuration/*.ts`.

### Payment

1. Sign up for a Stripe account.
2. Locate the test publishable key (begins with `pk_test`) and test secret key (begins with `sk_test`).
3. Save the secret key using the form at /admin with the key PAYMENT_SERVICE_PROVIDER_SECRET.
4. Save the publishable key in the PAYMENT_PUBLISHABLE_KEY variable in `configuration/*.ts`.

### Email

1. Sign up for a SendGrid account.
2. Create an API key.
3. Save the API key using the form at /admin with the key EMAIL_SERVICE_PROVIDER_SECRET.

### Spam protection (turing test)

1. Sign up for a Recaptcha v3 account.
2. Locate the site key and the API key.
3. Save the API key using the form at /admin with the key TURING_TEST_SERVICE_PROVIDER_SECRET.
4. Save the site key in the TURING_TEST_PUBLISHABLE_KEY variable in `configuration/*.ts`.

# Deployment

## Configure DNS

### To host both "www.yourdomain.com" and "yourdomain.com" (without forwarding):

1. Follow the steps in Firebase to connect a "custom domain", including adding the TXT record
   to verify ownership. Use the "naked domain" (not `www`) for this step.
2. When adding the A record to point the naked domain to the host IP addresses, use `@` rather than
   the full domain name.
3. Go through the same process for the `www` subdomain. Add an A record identical to the record for the root domain,
   with the only difference being that `www` is entered into the "host" field rather than `@`.
4. Set up `www.yourdomain.com` as an additional custom domain in the Firebase hosting console.