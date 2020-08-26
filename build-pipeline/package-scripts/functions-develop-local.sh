npm run functions::build::local && \
node_modules/.bin/firebase emulators:start --only functions,firestore

# # Rebuild and restart on file changes. Build once initially.
# # Make *sure* the previous emulator is terminated.
# node_modules/.bin/chokidar \
#   "./(api|config|copy|functions|helpers|model)/**/!(node_modules|validators|lib)/**/*.ts" \
#   -c "sh build-pipeline/package-scripts/functions-develop-local-onfilechange.sh" \
#   --initial
