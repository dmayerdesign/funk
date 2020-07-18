ts-node ./build-pipeline/package-scripts/prebuild.ts -c "local" && \
ts-node ./build-pipeline/package-scripts/functions-prebuild.ts -c "local" && \
node_modules/.bin/tsc --project functions/tsconfig.build.json

ts-node ./build-pipeline/package-scripts/functions-postbuild.ts
