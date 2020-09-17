sh build-pipeline/package-scripts/ts-node.sh ./build-pipeline/package-scripts/prebuild.ts -c "development" && \
sh build-pipeline/package-scripts/ts-node.sh ./build-pipeline/package-scripts/ui-prebuild.ts -c "development" && \
ionic build --prod -c "development" && \
ng run client-app:server -c "development" && \
ionic capacitor copy ios --no-build && \
ionic capacitor copy android --no-build
