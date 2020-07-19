sh ./ts-node.sh ./build-pipeline/package-scripts/prebuild.ts -c "local" && \
sh ./ts-node.sh ./build-pipeline/package-scripts/functions-prebuild.ts -c "local" && \
node_modules/.bin/tsc --project functions/tsconfig.build.json

sh ./ts-node.sh ./build-pipeline/package-scripts/functions-postbuild.ts
