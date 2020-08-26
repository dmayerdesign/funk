source production.env && \
\
GOOGLE_APPLICATION_CREDENTIALS=$PATH_TO_SERVICE_ACCOUNT_JSON \
sh build-pipeline/package-scripts/ts-node.sh \
  build-pipeline/package-scripts/functions-authorize-service-account.ts && \
\
npm i && \
npm run test && \
npm run build::production && \
\
node_modules/.bin/firebase use funk-development && \
\
node_modules/.bin/firebase deploy
