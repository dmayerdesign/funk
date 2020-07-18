TS_NODE_COMPILER_OPTIONS='{"module":"commonjs"}' ts-node ./build-pipeline/package-scripts/prebuild.ts -c "development" && \
TS_NODE_COMPILER_OPTIONS='{"module":"commonjs"}' ts-node ./build-pipeline/package-scripts/functions-prebuild.ts -c "development" && \
tsc --project functions/tsconfig.build.json && \
TS_NODE_COMPILER_OPTIONS='{"module":"commonjs"}' ts-node ./build-pipeline/package-scripts/functions-postbuild.ts
