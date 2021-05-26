sh ts-node.sh ./build-pipeline/package-scripts/prebuild.ts -c "development"
if [ $? -eq 0 ]; then sh ts-node.sh ./build-pipeline/package-scripts/external-prebuild.ts -c "development"; else (exit 1); fi
# if [ $? -eq 0 ]; then ionic build --prod -c "development"; else (exit 1); fi
# if [ $? -eq 0 ]; then ng run client-app:server -c "development"; else (exit 1); fi
# if [ $? -eq 0 ]; then ionic capacitor copy ios --no-build; else (exit 1); fi
# if [ $? -eq 0 ]; then ionic capacitor copy android --no-build; else (exit 1); fi
