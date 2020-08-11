sh build-pipeline/package-scripts/ts-node.sh \
  build-pipeline/package-scripts/functions-authorize-service-account.ts && \

npm i && \
npm run test && \
npm run build::development && \

node_modules/.bin/firebase use funk-development && \

sh build-pipeline/package-scripts/ts-node.sh build-pipeline/data/import-collection-json.ts \
  --collection "commerce.orders" && \
sh build-pipeline/package-scripts/ts-node.sh build-pipeline/data/import-collection-json.ts \
  --collection "commerce.products" && \
sh build-pipeline/package-scripts/ts-node.sh build-pipeline/data/import-collection-json.ts \
  --collection "contents" && \
sh build-pipeline/package-scripts/ts-node.sh build-pipeline/data/import-collection-json.ts \
  --collection "identity.user-states" && \
sh build-pipeline/package-scripts/ts-node.sh build-pipeline/data/import-collection-json.ts \
  --collection "organizations" && \
node_modules/.bin/firebase deploy
