source development.env

mkdir -p .funk/build-pipeline-output/export
GOOGLE_APPLICATION_CREDENTIALS=$PATH_TO_ADMIN_CREDENTIALS_JSON \
node_modules/.bin/firestore-export \
  --prettyPrint \
  --backupFile .funk/build-pipeline-output/export/export-all-development.json
