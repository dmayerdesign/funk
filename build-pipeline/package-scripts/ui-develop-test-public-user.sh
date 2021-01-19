sh build-pipeline/package-scripts/ts-node.sh ./build-pipeline/package-scripts/prebuild.ts -c "test-public-user"
if [ $? -eq 0 ]; then sh build-pipeline/package-scripts/ts-node.sh ./build-pipeline/package-scripts/ui-prebuild.ts -c "test-public-user"; else (exit 1); fi
if [ $? -eq 0 ]; then ionic serve -c "test-public-user" --no-open; else (exit 1); fi
