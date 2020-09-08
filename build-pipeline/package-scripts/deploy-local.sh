# npm i && \
# npm run test && \
# npm run build::local && \
# \
firebase use funk-development-0907 --config=config.local.firebase.json && \
\
sh build-pipeline/package-scripts/ts-node.sh build-pipeline/data/local-import-collection-json.ts \
  --collection "commerce.orders" && \
sh build-pipeline/package-scripts/ts-node.sh build-pipeline/data/local-import-collection-json.ts \
  --collection "commerce.products" && \
sh build-pipeline/package-scripts/ts-node.sh build-pipeline/data/local-import-collection-json.ts \
  --collection "contents" && \
sh build-pipeline/package-scripts/ts-node.sh build-pipeline/data/local-import-collection-json.ts \
  --collection "identity.user-states" && \
sh build-pipeline/package-scripts/ts-node.sh build-pipeline/data/local-import-collection-json.ts \
  --collection "organizations"
