TEST_FILENAME_OR_GLOB_OR_EMPTY="${@:-}"

if [ $? -eq 0 ]; then sh ts-node.sh ./build-pipeline/package-scripts/prebuild.ts -c "development"; else (exit 1); fi
if [ $? -eq 0 ]; then sh ts-node.sh ./build-pipeline/package-scripts/external-prebuild.ts -c "development"; else (exit 1); fi
if [ $? -eq 0 ]; then
  jest \
    --config jest.external-config.js \
    --ci \
    --runInBand \
    --detectOpenHandles \
    --coverage --coverageDirectory coverage/external \
    "$TEST_FILENAME_OR_GLOB_OR_EMPTY"
else (exit 1); fi

if [ $? -eq 0 ]; then
  sh ts-node.sh build-pipeline/package-scripts/write-badges.ts
else (exit 1); fi
