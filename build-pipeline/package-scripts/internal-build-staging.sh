sh ts-node.sh ./build-pipeline/package-scripts/prebuild.ts -c "staging"
if [ $? -eq 0 ]; then sh ts-node.sh ./build-pipeline/package-scripts/internal-prebuild.ts -c "staging"; else (exit 1); fi
if [ $? -eq 0 ]; then mkdir -p ".funk/build-pipeline-output/internal-build"; else (exit 1); fi
if [ $? -eq 0 ]; then tsc --project tsconfig.build-functions.json; else (exit 1); fi
if [ $? -eq 0 ]; then sh ts-node.sh ./build-pipeline/package-scripts/internal-postbuild.ts; else (exit 1); fi
