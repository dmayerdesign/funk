node prebuild -c "development" && \
node functions-prebuild -c "development" && \
tsc --project functions/tsconfig.build.json && \
node functions-postbuild
