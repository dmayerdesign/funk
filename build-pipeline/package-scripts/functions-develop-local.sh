source development.env && \
firebase use funk-development-0907 && \
\
GOOGLE_APPLICATION_CREDENTIALS=$PATH_TO_OWNER_CREDENTIALS_JSON \
sh build-pipeline/package-scripts/ts-node.sh \
  build-pipeline/package-scripts/functions-authorize-service-account.ts && \
\
npm run functions::build::local && \
firebase emulators:start --only functions,firestore

# # Rebuild and restart on file changes. Build once initially.
# # Make *sure* the previous emulator is terminated.
# chokidar \
#   "./(api|config|copy|functions|helpers|model)/**/!(node_modules|validators|lib)/**/*.ts" \
#   -c "sh build-pipeline/package-scripts/functions-develop-local-onfilechange.sh" \
#   --initial
