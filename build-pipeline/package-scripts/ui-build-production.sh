node ./build-pipeline/package-scripts/prebuild -c "production" && \
ng build -c "production" && \
ng run web:server -c "production"
