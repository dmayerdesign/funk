FIREBASE_CONFIG=test_firebase_config \
GCLOUD_PROJECT=test_gcloud_project \
jest \
  --config jest.api-config.js \
  --ci \
  --runInBand \
  --detectOpenHandles \
  $@

# TODO: Explore how to make this more stable (often fails to kill the emulator).
# (e.g. Dockerize)
# firebase emulators:exec --only firestore \
#   "jest --config jest.api-config.js --ci --detectOpenHandles"
