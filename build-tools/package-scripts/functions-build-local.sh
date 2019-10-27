node functions-prebuild -c "local" && \
tsc --project functions/tsconfig.build.json && \
node functions-postbuild
