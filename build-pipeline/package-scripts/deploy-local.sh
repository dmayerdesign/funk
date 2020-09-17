# npm i && \
# npm run test && \
# npm run build::local && \
# \
firebase use funk-development-0907 && \
\
sh build-pipeline/package-scripts/ts-node.sh build-pipeline/data/local-import-collection-json.ts \
  --collection "commerce.orders" \
  --collection "commerce.products" \
  --collection "contents" \
  --collection "identity.user-states" \
  --collection "organizations"
