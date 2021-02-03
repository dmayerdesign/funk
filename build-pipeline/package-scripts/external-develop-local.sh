sh ts-node.sh ./build-pipeline/package-scripts/prebuild.ts -c "local"
if [ $? -eq 0 ]; then sh ts-node.sh ./build-pipeline/package-scripts/external-prebuild.ts -c "local"; else (exit 1); fi
if [ $? -eq 0 ]; then ionic serve -c "local" --no-open; else (exit 1); fi
