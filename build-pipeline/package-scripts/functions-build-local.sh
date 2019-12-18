node ./build-pipeline/package-scripts/prebuild -c "local" && \
node ./build-pipeline/package-scripts/functions-prebuild -c "local" && \
tsc --project functions/tsconfig.build.json && \
node ./build-pipeline/package-scripts/functions-postbuild
