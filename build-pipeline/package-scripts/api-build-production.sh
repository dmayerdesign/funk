sh build-pipeline/package-scripts/ts-node.sh ./build-pipeline/package-scripts/prebuild.ts -c "production"
if [ $? -eq 0 ]; then sh build-pipeline/package-scripts/ts-node.sh ./build-pipeline/package-scripts/api-prebuild.ts -c "production"; else (exit 1); fi
if [ $? -eq 0 ]; then mkdir -p ".funk/build-pipeline-output/api-build"; else (exit 1); fi
if [ $? -eq 0 ]; then tsc --project api/functions/tsconfig.build.json; else (exit 1); fi
if [ $? -eq 0 ]; then sh build-pipeline/package-scripts/ts-node.sh ./build-pipeline/package-scripts/api-postbuild.ts; else (exit 1); fi
