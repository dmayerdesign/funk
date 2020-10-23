source production.env
npm i

if [ $? -eq 0 ]; then npm run build::production; else (exit 1); fi
if [ $? -eq 0 ]; then npm run test; else (exit 1); fi
if [ $? -eq 0 ]; then
  firebase use $PROJECT_ID
  GOOGLE_APPLICATION_CREDENTIALS=$PATH_TO_OWNER_CREDENTIALS_JSON \
    sh build-pipeline/package-scripts/ts-node.sh \
      build-pipeline/package-scripts/functions-authorize-service-account.ts;
else (exit 1); fi
if [ $? -eq 0 ]; then firebase deploy; else (exit 1); fi
