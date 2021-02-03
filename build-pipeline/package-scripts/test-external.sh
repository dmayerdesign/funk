if [ $? -eq 0 ]; then sh ts-node.sh ./build-pipeline/package-scripts/prebuild.ts -c "development"; else (exit 1); fi
if [ $? -eq 0 ]; then sh ts-node.sh ./build-pipeline/package-scripts/external-prebuild.ts -c "development"; else (exit 1); fi

if [ $? -eq 0 ]; then
  jest \
    --config jest.external-config.js \
    --ci \
    --runInBand \
    --detectOpenHandles \
    --coverage --coverageDirectory coverage/external \
    $@
else (exit 1); fi

if [ $? -eq 0 ]; then
  sh ts-node.sh build-pipeline/package-scripts/write-badges.ts
else (exit 1); fi

if [ $? -eq 0 ]; then
node_modules/.bin/concurrently \
  "node_modules/.bin/wait-on http://localhost:8100; node_modules/.bin/cypress run --headless" \
  "npm run external::develop::integration-test" \
  --success first \
  --kill-others
else (exit 1); fi
