sh build-pipeline/package-scripts/ts-node.sh ./build-pipeline/package-scripts/prebuild.ts -c "production" && \
sh build-pipeline/package-scripts/ts-node.sh ./build-pipeline/package-scripts/functions-prebuild.ts -c "production" && \
tsc --project functions/tsconfig.build.json && \
sh build-pipeline/package-scripts/ts-node.sh ./build-pipeline/package-scripts/functions-postbuild.ts
