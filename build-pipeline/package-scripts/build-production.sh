sh build-pipeline/package-scripts/lint-fix.sh && \
\
sh build-pipeline/package-scripts/ts-node.sh ./build-pipeline/package-scripts/prebuild.ts -c "production" && \
\
sh build-pipeline/package-scripts/ts-node.sh ./build-pipeline/package-scripts/ui-prebuild.ts -c "production" && \
ionic build -c "production" && \
ng run client-app:server -c "production" && \
\
sh build-pipeline/package-scripts/ts-node.sh ./build-pipeline/package-scripts/functions-prebuild.ts -c "production" && \
node_modules/.bin/tsc --project functions/tsconfig.build.json && \
\
sh build-pipeline/package-scripts/ts-node.sh ./build-pipeline/package-scripts/functions-postbuild.ts
