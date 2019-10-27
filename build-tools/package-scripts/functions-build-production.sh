node functions-prebuild -c "production" && \
tsc --project functions/tsconfig.build.json && \
node functions-postbuild
