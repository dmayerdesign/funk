node functions-prebuild -c "production" && tsc --project functions/tsconfig.json && node functions-postbuild
