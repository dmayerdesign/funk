source development.env

npm run build::development
if [ $? -eq 0 ]; then npm run test; else (exit 1); fi
if [ $? -eq 0 ]; then firebase use $PROJECT_ID; else (exit 1); fi
if [ $? -eq 0 ]; then
  GOOGLE_APPLICATION_CREDENTIALS=$PATH_TO_ADMIN_CREDENTIALS_JSON \
  sh build-pipeline/package-scripts/ts-node.sh \
    build-pipeline/package-scripts/functions-authorize-service-account.ts;
else (exit 1); fi
if [ $? -eq 0 ]; then
  firestore-import \
    -y \
    -a $PATH_TO_ADMIN_CREDENTIALS_JSON \
    -n commerce.orders \
    -b build-pipeline/data/development-data/commerce.orders.json;
else (exit 1); fi
if [ $? -eq 0 ]; then
firestore-import \
  -y \
  -a $PATH_TO_ADMIN_CREDENTIALS_JSON \
  -n commerce.products \
  -b build-pipeline/data/development-data/commerce.products.json;
else (exit 1); fi
if [ $? -eq 0 ]; then
firestore-import \
  -y \
  -a $PATH_TO_ADMIN_CREDENTIALS_JSON \
  -n contents \
  -b build-pipeline/data/development-data/contents.json;
else (exit 1); fi
if [ $? -eq 0 ]; then
firestore-import \
  -y \
  -a $PATH_TO_ADMIN_CREDENTIALS_JSON \
  -n identity.user-states \
  -b build-pipeline/data/development-data/identity.user-states.json;
else (exit 1); fi
if [ $? -eq 0 ]; then
firestore-import \
  -y \
  -a $PATH_TO_ADMIN_CREDENTIALS_JSON \
  -n organizations \
  -b build-pipeline/data/development-data/organizations.json;
else (exit 1); fi
if [ $? -eq 0 ]; then
  firebase deploy;
else (exit 1); fi
