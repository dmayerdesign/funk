# This script must be run from the project's root folder.
source development.env

npm run build::development
if [ $? -eq 0 ]; then npm run test; else (exit 1); fi
if [ $? -eq 0 ]; then firebase use $PROJECT_ID; else (exit 1); fi
if [ $? -eq 0 ]; then
  GOOGLE_APPLICATION_CREDENTIALS=$PATH_TO_ADMIN_CREDENTIALS_JSON \
  sh ts-node.sh \
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
  -n organizations \
  -b build-pipeline/data/development-data/organizations.json;
else (exit 1); fi
if [ $? -eq 0 ]; then
firestore-import \
  -y \
  -a $PATH_TO_ADMIN_CREDENTIALS_JSON \
  -n taxonomies \
  -b build-pipeline/data/development-data/taxonomies.json;
else (exit 1); fi
if [ $? -eq 0 ]; then
firestore-import \
  -y \
  -a $PATH_TO_ADMIN_CREDENTIALS_JSON \
  -n taxonomy-terms \
  -b build-pipeline/data/development-data/taxonomy-terms.json;
else (exit 1); fi
if [ $? -eq 0 ]; then
  firebase deploy;
else (exit 1); fi
