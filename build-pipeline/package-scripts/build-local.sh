sh build-pipeline/package-scripts/lint-fix.sh && \
\
sh build-pipeline/package-scripts/ts-node.sh ./build-pipeline/package-scripts/prebuild.ts -c "local" && \
\
sh build-pipeline/package-scripts/ts-node.sh ./build-pipeline/package-scripts/ui-prebuild.ts -c "local" && \
ionic build -c "local" && \
ng run client-app:server -c "local" && \
\
sh build-pipeline/package-scripts/ts-node.sh ./build-pipeline/package-scripts/functions-prebuild.ts -c "local" && \
node_modules/.bin/tsc --project functions/tsconfig.build.json && \
\
sh build-pipeline/package-scripts/ts-node.sh ./build-pipeline/package-scripts/functions-postbuild.ts
