# This script must be run from the project's root folder.
source production.env

mkdir -p .funk/build-pipeline-output/export
GOOGLE_APPLICATION_CREDENTIALS=$PATH_TO_ADMIN_CREDENTIALS_JSON \
node_modules/.bin/firestore-export \
  --prettyPrint \
  --backupFile .funk/build-pipeline-output/export/export-all-production.json
