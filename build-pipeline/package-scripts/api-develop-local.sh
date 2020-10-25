if [ $? -eq 0 ]; then source development.env; else (exit 1); fi
if [ $? -eq 0 ]; then firebase use $PROJECT_ID; else (exit 1); fi
if [ $? -eq 0 ]; then
  GOOGLE_APPLICATION_CREDENTIALS=$PATH_TO_OWNER_CREDENTIALS_JSON \
    sh build-pipeline/package-scripts/ts-node.sh \
      build-pipeline/package-scripts/functions-authorize-service-account.ts;
else (exit 1); fi
if [ $? -eq 0 ]; then npm run api::build::local; else (exit 1); fi
if [ $? -eq 0 ]; then firebase emulators:start --only functions,firestore; else (exit 1); fi

# # Rebuild and restart on file changes. Build once initially.
# # Make *sure* the previous emulator is terminated.
# chokidar \
#   "./(api|configuration|copy|helpers|model)/**/!(node_modules|validators|lib)/**/*.ts" \
#   -c "sh build-pipeline/package-scripts/api-develop-local-onfilechange.sh" \
#   --initial