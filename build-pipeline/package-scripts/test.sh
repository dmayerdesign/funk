node_modules/.bin/jest --config jest.browser-config.js --ci && \
firebase emulators:exec --only firestore \
  "node_modules/.bin/jest --config jest.server-config.js --ci"
