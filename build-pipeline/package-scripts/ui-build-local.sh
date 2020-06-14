node ./build-pipeline/package-scripts/prebuild -c "local" && \
ionic build -c "local" && \
ng run client-app:server -c "local"
