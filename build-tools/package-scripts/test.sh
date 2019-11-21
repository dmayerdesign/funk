node ./node_modules/.bin/jest && \
ng test web --passWithNoTests && \
firebase emulators:exec --only firestore "node ./firestore.rules.spec.js"
