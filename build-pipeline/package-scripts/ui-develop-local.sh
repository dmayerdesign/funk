sh build-pipeline/package-scripts/ts-node.sh ./build-pipeline/package-scripts/prebuild.ts -c "local"
if [ $? -eq 0 ]; then sh build-pipeline/package-scripts/ts-node.sh ./build-pipeline/package-scripts/ui-prebuild.ts -c "local"; else (exit 1); fi
if [ $? -eq 0 ]; then ionic serve -c "local"; else (exit 1); fi
