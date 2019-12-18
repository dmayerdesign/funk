node ./build-pipeline/package-scripts/prebuild -c "production" && \
node ./build-pipeline/package-scripts/functions-prebuild -c "production" && \
tsc --project functions/tsconfig.build.json && \
node ./build-pipeline/package-scripts/functions-postbuild
