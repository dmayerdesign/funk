npm install
npm run format
npm run lint-fix
if [ $? -eq 0 ]; then sh ts-node.sh ./build-pipeline/package-scripts/prebuild.ts -c "production"; else (exit 1); fi
if [ $? -eq 0 ]; then sh ts-node.sh ./build-pipeline/package-scripts/external-prebuild.ts -c "production"; else (exit 1); fi
if [ $? -eq 0 ]; then ionic build -c "production"; else (exit 1); fi
if [ $? -eq 0 ]; then ng run client-app:server -c "production"; else (exit 1); fi
if [ $? -eq 0 ]; then sh ts-node.sh ./build-pipeline/package-scripts/internal-prebuild.ts -c "production"; else (exit 1); fi
if [ $? -eq 0 ]; then tsc --project tsconfig.build-functions.json; else (exit 1); fi
if [ $? -eq 0 ]; then sh ts-node.sh ./build-pipeline/package-scripts/internal-postbuild.ts; else (exit 1); fi
