node functions-prebuild -c "local" && \
tsc-watch --project functions/tsconfig.build.json --onSuccess "node functions-postbuild"
