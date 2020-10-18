sh build-pipeline/package-scripts/ts-node.sh ./build-pipeline/package-scripts/prebuild.ts -c "production" && \
sh build-pipeline/package-scripts/ts-node.sh ./build-pipeline/package-scripts/functions-prebuild.ts -c "production" && \
\
mkdir -p ".funk/build-pipeline-output/functions-build" && \
tsc --project functions/tsconfig.build.json && \
\
sh build-pipeline/package-scripts/ts-node.sh ./build-pipeline/package-scripts/functions-postbuild.ts
