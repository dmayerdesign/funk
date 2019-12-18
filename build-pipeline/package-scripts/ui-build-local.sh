node ./build-pipeline/package-scripts/prebuild -c "local" && \
ng build -c "local" && \
ng run web:server -c "local"
