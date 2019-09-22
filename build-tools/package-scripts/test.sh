node ./node_modules/jest/bin/jest.js && \
ng test web --passWithNoTests && \
firebase emulators:exec --only firestore "node ./firestore.rules.spec.js"
