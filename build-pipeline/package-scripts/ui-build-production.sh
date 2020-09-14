sh build-pipeline/package-scripts/ts-node.sh ./build-pipeline/package-scripts/prebuild.ts -c "production" && \
sh build-pipeline/package-scripts/ts-node.sh ./build-pipeline/package-scripts/ui-prebuild.ts -c "production" && \
ionic build -c "production" && \
ng run client-app:server -c "production"
ionic capacitor copy ios --no-build
ionic capacitor copy android --no-build
