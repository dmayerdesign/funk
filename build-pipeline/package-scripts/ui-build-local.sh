sh build-pipeline/package-scripts/ts-node.sh ./build-pipeline/package-scripts/prebuild.ts -c "local" && \
sh build-pipeline/package-scripts/ts-node.sh ./build-pipeline/package-scripts/ui-prebuild.ts -c "local" && \
ionic build -c "local" && \
ng run client-app:server -c "local" && \
ionic capacitor copy ios --no-build && \
ionic capacitor copy android --no-build
