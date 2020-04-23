node ./build-pipeline/package-scripts/prebuild.js -c "local" && \
node ./build-pipeline/package-scripts/functions-prebuild.js -c "local" && \
node_modules/.bin/tsc --project functions/tsconfig.build.json

node ./build-pipeline/package-scripts/functions-postbuild.js
