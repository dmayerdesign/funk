FIREBASE_CONFIG=test_firebase_config \
GCLOUD_PROJECT=test_gcloud_project \
jest \
  --config jest.api-config.js \
  --ci \
  --runInBand \
  --detectOpenHandles \
  --coverage --coverageDirectory coverage/api \
  $@

# TODO: Explore how to make this more stable (often fails to kill the emulator).
# (e.g. Dockerize)
# firebase emulators:exec --only firestore \
#   "jest --config jest.api-config.js --ci --detectOpenHandles"

sh build-pipeline/package-scripts/ts-node.sh build-pipeline/code-gen/behaviors/write-badges.ts
