sh build-pipeline/package-scripts/ts-node.sh ./build-pipeline/package-scripts/prebuild.ts -c "local" && \
sh build-pipeline/package-scripts/ts-node.sh ./build-pipeline/package-scripts/api-prebuild.ts -c "local" && \
\
mkdir -p ".funk/build-pipeline-output/api-build" && \
tsc --project api/functions/tsconfig.build.json && \
\
sh build-pipeline/package-scripts/ts-node.sh ./build-pipeline/package-scripts/api-postbuild.ts
