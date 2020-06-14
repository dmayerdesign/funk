node ./build-pipeline/package-scripts/prebuild -c "production" && \
ionic build -c "production" && \
ng run client-app:server -c "production"
