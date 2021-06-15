# This script must be run from the project's root folder.
source development.env
# npm i
# npm run test
# npm run build::local

firebase use $PROJECT_ID

node build-pipeline/data/local-import-collection-json.js \
  --collection "commerce.orders" \
  --collection "commerce.products" \
  --collection "contents" \
  --collection "identity.persons" \
  --collection "identity.user-contents" \
  --collection "organizations" \
  --collection "taxonomies" \
  --collection "taxonomy-terms"
if [ $? -ne 0 ]; then
(exit 1);
fi
