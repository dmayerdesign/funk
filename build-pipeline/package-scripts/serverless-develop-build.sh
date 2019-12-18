node ./build-pipeline/package-scripts/prebuild.js -c "local" && \
node ./build-pipeline/package-scripts/functions-prebuild.js -c "local" && \
firebase functions:config:get > .runtimeconfig.json && \
tsc-watch --project functions/tsconfig.build.json --onSuccess "node ./build-pipeline/package-scripts/functions-postbuild.js"
