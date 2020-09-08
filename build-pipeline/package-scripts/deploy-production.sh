source production.env && \
\
npm i && \
npm run test && \
npm run build::production && \
\
firebase use funk-production-0907 --config=config.production.firebase.json && \
\
GOOGLE_APPLICATION_CREDENTIALS=$PATH_TO_OWNER_CREDENTIALS_JSON \
sh build-pipeline/package-scripts/ts-node.sh \
  build-pipeline/package-scripts/functions-authorize-service-account.ts && \
\
firebase deploy --config=config.production.firebase.json
