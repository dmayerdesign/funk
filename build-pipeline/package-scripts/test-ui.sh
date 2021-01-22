jest \
  --config jest.ui-config.js \
  --ci \
  --runInBand \
  --detectOpenHandles \
  --coverage --coverageDirectory coverage/ui \
  $@
if [ $? -eq 0 ]; then
  sh build-pipeline/package-scripts/ts-node.sh build-pipeline/code-gen/behaviors/write-badges.ts
else (exit 1); fi

npx concurrently \
  "npx wait-on http://localhost:8100; node_modules/.bin/cypress run --headless" \
  "npm run ui::develop::integration-test" \
  --success first \
  --kill-others
