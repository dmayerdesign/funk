npm install && \
sh build-pipeline/package-scripts/format.sh && \
\
sh build-pipeline/package-scripts/ts-node.sh ./build-pipeline/package-scripts/prebuild.ts -c "development" && \
\
sh build-pipeline/package-scripts/ts-node.sh ./build-pipeline/package-scripts/ui-prebuild.ts -c "development" && \
ionic build -c "development" && \
ng run client-app:server -c "development" && \
\
sh build-pipeline/package-scripts/ts-node.sh ./build-pipeline/package-scripts/functions-prebuild.ts -c "development" && \
tsc --project api/functions/tsconfig.build.json && \
\
ls -a1
ls -a1 .funk
ls -a1 .funk/build-pipeline-output/functions-build
sh build-pipeline/package-scripts/ts-node.sh ./build-pipeline/package-scripts/functions-postbuild.ts
