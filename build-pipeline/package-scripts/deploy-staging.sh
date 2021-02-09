source staging.env
npm i

if [ $? -eq 0 ]; then npm run build::staging; else (exit 1); fi
if [ $? -eq 0 ]; then npm run test; else (exit 1); fi
if [ $? -eq 0 ]; then
  firebase use $PROJECT_ID
  GOOGLE_APPLICATION_CREDENTIALS=$PATH_TO_ADMIN_CREDENTIALS_JSON \
    sh ts-node.sh \
      build-pipeline/package-scripts/functions-authorize-service-account.ts;
else (exit 1); fi
if [ $? -eq 0 ]; then firebase deploy; else (exit 1); fi
