sh build-pipeline/package-scripts/ts-node.sh ./build-pipeline/package-scripts/prebuild.ts -c "production" && \
ionic build -c "production" && \
ng run client-app:server -c "production"
