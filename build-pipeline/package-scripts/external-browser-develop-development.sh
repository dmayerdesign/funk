sh ts-node.sh ./build-pipeline/package-scripts/prebuild.ts -c "development"
if [ $? -eq 0 ]; then sh ts-node.sh ./build-pipeline/package-scripts/external-prebuild.ts -c "development"; else (exit 1); fi
if [ $? -eq 0 ]; then ionic serve -c "development" --no-open; else (exit 1); fi
