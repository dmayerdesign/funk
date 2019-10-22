node functions-prebuild -c "development" && \
tsc --project functions/tsconfig.json && \
node functions-postbuild
