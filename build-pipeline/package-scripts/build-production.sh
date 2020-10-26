npm install
npm run format
npm run lint-fix
if [ $? -eq 0 ]; then sh build-pipeline/package-scripts/ts-node.sh ./build-pipeline/package-scripts/prebuild.ts -c "production"; else (exit 1); fi
if [ $? -eq 0 ]; then sh build-pipeline/package-scripts/ts-node.sh ./build-pipeline/package-scripts/ui-prebuild.ts -c "production"; else (exit 1); fi
if [ $? -eq 0 ]; then ionic build -c "production"; else (exit 1); fi
if [ $? -eq 0 ]; then ng run client-app:server -c "production"; else (exit 1); fi
if [ $? -eq 0 ]; then sh build-pipeline/package-scripts/ts-node.sh ./build-pipeline/package-scripts/api-prebuild.ts -c "production"; else (exit 1); fi
if [ $? -eq 0 ]; then tsc --project api/functions/tsconfig.build.json; else (exit 1); fi
if [ $? -eq 0 ]; then sh build-pipeline/package-scripts/ts-node.sh ./build-pipeline/package-scripts/api-postbuild.ts; else (exit 1); fi
