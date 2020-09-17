source development.env && \
\
npm i && \
npm run test && \
npm run build::development && \
\
firebase use funk-development-0907 && \
\
GOOGLE_APPLICATION_CREDENTIALS=$PATH_TO_OWNER_CREDENTIALS_JSON \
sh build-pipeline/package-scripts/ts-node.sh \
  build-pipeline/package-scripts/functions-authorize-service-account.ts && \
\
firestore-import \
  -y \
  -a $PATH_TO_OWNER_CREDENTIALS_JSON \
  -n commerce.orders \
  -b build-pipeline/data/development-data/commerce.orders.json && \
firestore-import \
  -y \
  -a $PATH_TO_OWNER_CREDENTIALS_JSON \
  -n commerce.products \
  -b build-pipeline/data/development-data/commerce.products.json && \
firestore-import \
  -y \
  -a $PATH_TO_OWNER_CREDENTIALS_JSON \
  -n contents \
  -b build-pipeline/data/development-data/contents.json && \
firestore-import \
  -y \
  -a $PATH_TO_OWNER_CREDENTIALS_JSON \
  -n identity.user-states \
  -b build-pipeline/data/development-data/identity.user-states.json && \
firestore-import \
  -y \
  -a $PATH_TO_OWNER_CREDENTIALS_JSON \
  -n organizations \
  -b build-pipeline/data/development-data/organizations.json && \
\
firebase deploy
