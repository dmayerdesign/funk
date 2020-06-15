FIREBASE_CONFIG=test_firebase_config \
GCLOUD_PROJECT=test_gcloud_project \
node_modules/.bin/jest --config jest.api-config.js --ci $@

# TODO: Explore how to make this more stable (often fails to kill the emulator).
# (e.g. Dockerize)
# node_modules/.bin/firebase emulators:exec --only firestore \
#   "node_modules/.bin/jest --config jest.api-config.js --ci --detectOpenHandles"
