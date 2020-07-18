ts-node ./build-pipeline/package-scripts/prebuild.ts -c "development" && \
ionic build -c "development" && \
ng run client-app:server -c "development"
