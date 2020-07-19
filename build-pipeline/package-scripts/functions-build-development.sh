sh ./ts-node.sh ./build-pipeline/package-scripts/prebuild.ts -c "development" && \
sh ./ts-node.sh ./build-pipeline/package-scripts/functions-prebuild.ts -c "development" && \
tsc --project functions/tsconfig.build.json && \
sh ./ts-node.sh ./build-pipeline/package-scripts/functions-postbuild.ts
