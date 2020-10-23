sh build-pipeline/package-scripts/ts-node.sh ./build-pipeline/package-scripts/prebuild.ts -c "development"
if [ $? -eq 0 ]; then sh build-pipeline/package-scripts/ts-node.sh ./build-pipeline/package-scripts/ui-prebuild.ts -c "development"; else (exit 1); fi
if [ $? -eq 0 ]; then ionic build --prod -c "development"; else (exit 1); fi
if [ $? -eq 0 ]; then ionic capacitor copy android --no-build; else (exit 1); fi
if [ $? -eq 0 ]; then ionic capacitor open android; else (exit 1); fi
