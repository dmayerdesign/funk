sh build-pipeline/package-scripts/ts-node.sh ./build-pipeline/package-scripts/prebuild.ts -c "integration-test"
if [ $? -eq 0 ]; then sh build-pipeline/package-scripts/ts-node.sh ./build-pipeline/package-scripts/ui-prebuild.ts -c "integration-test"; else (exit 1); fi
if [ $? -eq 0 ]; then ionic serve -c "integration-test" --no-open; else (exit 1); fi
