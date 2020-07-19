sh ./ts-node.sh ./build-pipeline/package-scripts/prebuild.ts -c "local" && \
ionic build -c "local" && \
ng run client-app:server -c "local"
