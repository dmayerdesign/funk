node_modules/.bin/jest --config jest.browser-config.js --ci && \
node_modules/.bin/jest --config jest.server-config.js --ci
# TODO: Explore how to make this more stable (often fails to kill the emulator).
# (e.g. Dockerize)
# node_modules/.bin/firebase emulators:exec --only functions,firestore \
#   "node_modules/.bin/jest --config jest.server-config.js --ci --detectOpenHandles"
