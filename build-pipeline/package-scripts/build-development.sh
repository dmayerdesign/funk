npm install && npm run format && npm run lint-fix

if [ $? -eq 0 ]; then sh ts-node.sh ./build-pipeline/package-scripts/prebuild.ts -c "development"; else (exit 1); fi
if [ $? -eq 0 ]; then
  concurrently \
    "sh ts-node.sh ./build-pipeline/package-scripts/external-prebuild.ts -c \"development\"; if [ \$? -eq 0 ]; then ionic build -c \"development\"; else (exit 1); fi; if [ \$? -eq 0 ]; then ng run client-app:server -c \"development\"; else (exit 1); fi" \
    "sh ts-node.sh ./build-pipeline/package-scripts/internal-prebuild.ts -c \"development\"; if [ \$? -eq 0 ]; then tsc --project tsconfig.build-functions.json; else (exit 1); fi; if [ \$? -eq 0 ]; then sh ts-node.sh ./build-pipeline/package-scripts/internal-postbuild.ts; else (exit 1); fi" \
    --success first
else (exit 1); fi
