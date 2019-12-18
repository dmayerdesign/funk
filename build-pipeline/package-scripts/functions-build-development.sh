node ./build-pipeline/package-scripts/prebuild.js -c "development" && \
node ./build-pipeline/package-scripts/functions-prebuild.js -c "development" && \
tsc --project functions/tsconfig.build.json && \
node ./build-pipeline/package-scripts/functions-postbuild.js
