sh build-pipeline/package-scripts/ts-node.sh ./build-pipeline/package-scripts/prebuild.ts -c "local" && \
sh build-pipeline/package-scripts/ts-node.sh ./build-pipeline/package-scripts/functions-prebuild.ts -c "local" && \
\
mkdir -p ".funk/build-pipeline-output/functions-build" && \
tsc --project functions/tsconfig.build.json && \
\
sh build-pipeline/package-scripts/ts-node.sh ./build-pipeline/package-scripts/functions-postbuild.ts
