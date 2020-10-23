sh build-pipeline/package-scripts/ts-node.sh ./build-pipeline/package-scripts/prebuild.ts -c "production"
if [ $? -eq 0 ]; then sh build-pipeline/package-scripts/ts-node.sh ./build-pipeline/package-scripts/ui-prebuild.ts -c "production"; else (exit 1); fi
if [ $? -eq 0 ]; then ionic build --prod -c "production"; else (exit 1); fi
if [ $? -eq 0 ]; then ng run client-app:server -c "production"; else (exit 1); fi
if [ $? -eq 0 ]; then ionic capacitor copy ios --no-build; else (exit 1); fi
if [ $? -eq 0 ]; then ionic capacitor copy android --no-build; else (exit 1); fi
