npm install
npm run format
if [ $? -eq 0 ]; then sh build-pipeline/package-scripts/ts-node.sh ./build-pipeline/package-scripts/prebuild.ts -c "local"; else (exit 1); fi
if [ $? -eq 0 ]; then sh build-pipeline/package-scripts/ts-node.sh ./build-pipeline/package-scripts/ui-prebuild.ts -c "local"; else (exit 1); fi
if [ $? -eq 0 ]; then ionic build -c "local"; else (exit 1); fi
if [ $? -eq 0 ]; then ng run client-app:server -c "local"; else (exit 1); fi
if [ $? -eq 0 ]; then sh build-pipeline/package-scripts/ts-node.sh ./build-pipeline/package-scripts/api-prebuild.ts -c "local"; else (exit 1); fi
if [ $? -eq 0 ]; then tsc --project api/functions/tsconfig.build.json; else (exit 1); fi
if [ $? -eq 0 ]; then sh build-pipeline/package-scripts/ts-node.sh ./build-pipeline/package-scripts/api-postbuild.ts; else (exit 1); fi
