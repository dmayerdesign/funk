source production.env

GOOGLE_APPLICATION_CREDENTIALS=$PATH_TO_OWNER_CREDENTIALS_JSON \
  sh build-pipeline/package-scripts/ts-node.sh build-pipeline/data/local-export-all-json.ts
