node functions-prebuild -c "local" && tsc-watch --project functions/tsconfig.json --onSuccess "node functions-postbuild"
