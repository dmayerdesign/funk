jest \
  --config jest.ui-config.js \
  --ci \
  --runInBand \
  --detectOpenHandles \
  --coverage --coverageDirectory coverage/ui \
  $@

sh build-pipeline/package-scripts/ts-node.sh build-pipeline/code-gen/behaviors/write-badges.ts
