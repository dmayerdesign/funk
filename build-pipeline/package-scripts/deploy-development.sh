source development.env && \
\
GOOGLE_APPLICATION_CREDENTIALS=$PATH_TO_SERVICE_ACCOUNT_JSON \
sh build-pipeline/package-scripts/ts-node.sh \
  build-pipeline/package-scripts/functions-authorize-service-account.ts && \
\
npm i && \
npm run test && \
npm run build::development && \
\
node_modules/.bin/firebase use funk-development && \
\
node_modules/.bin/firestore-import \
  -a $PATH_TO_SERVICE_ACCOUNT_JSON \
  -n commerce.orders \
  -b build-pipeline/data/development-data/commerce.orders.json && \
node_modules/.bin/firestore-import \
  -a $PATH_TO_SERVICE_ACCOUNT_JSON \
  -n commerce.products \
  -b build-pipeline/data/development-data/commerce.products.json && \
node_modules/.bin/firestore-import \
  -a $PATH_TO_SERVICE_ACCOUNT_JSON \
  -n contents \
  -b build-pipeline/data/development-data/contents.json && \
node_modules/.bin/firestore-import \
  -a $PATH_TO_SERVICE_ACCOUNT_JSON \
  -n identity.user-states \
  -b build-pipeline/data/development-data/identity.user-states.json && \
node_modules/.bin/firestore-import \
  -a $PATH_TO_SERVICE_ACCOUNT_JSON \
  -n organizations \
  -b build-pipeline/data/development-data/organizations.json
\
node_modules/.bin/firebase deploy
