source development.env
# npm i
# npm run test
# npm run build::local

firebase use $PROJECT_ID

sh build-pipeline/package-scripts/ts-node.sh build-pipeline/data/local-import-collection-json.ts \
  --collection "commerce.orders" \
  --collection "commerce.products" \
  --collection "contents" \
  --collection "identity.persons" \
  --collection "identity.user-states" \
  --collection "organizations"
