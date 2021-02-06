# if [ $? -eq 0 ]; then sh ts-node.sh ./build-pipeline/package-scripts/prebuild.ts -c "development"; else (exit 1); fi
# if [ $? -eq 0 ]; then sh ts-node.sh ./build-pipeline/package-scripts/internal-prebuild.ts -c "development"; else (exit 1); fi

# TODO: Explore how to make this more stable (often fails to kill the emulator).
# (e.g. Dockerize)
# firebase emulators:exec --only firestore \
#   "jest --config jest.internal-config.js --ci --detectOpenHandles"

FIREBASE_CONFIG=test_firebase_config \
GCLOUD_PROJECT=test_gcloud_project \
jest \
  --config jest.internal-config.js \
  --ci \
  --runInBand \
  --detectOpenHandles \
  --coverage --coverageDirectory coverage/internal \
  $@
if [ $? -eq 0 ]; then
  sh ts-node.sh build-pipeline/package-scripts/write-badges.ts
else (exit 1); fi
