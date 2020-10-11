sh build-pipeline/package-scripts/ts-node.sh ./build-pipeline/package-scripts/prebuild.ts -c "development" && \
sh build-pipeline/package-scripts/ts-node.sh ./build-pipeline/package-scripts/ui-prebuild.ts -c "development" && \
ionic build --prod -c "development" && \
ionic capacitor copy ios --no-build && \
ionic capacitor open ios
