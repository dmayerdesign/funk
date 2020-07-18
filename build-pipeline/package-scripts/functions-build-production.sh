ts-node ./build-pipeline/package-scripts/prebuild.ts -c "production" && \
ts-node ./build-pipeline/package-scripts/functions-prebuild.ts -c "production" && \
tsc --project functions/tsconfig.build.json && \
ts-node ./build-pipeline/package-scripts/functions-postbuild.ts
