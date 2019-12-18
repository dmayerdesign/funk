node ./build-pipeline/package-scripts/prebuild -c "development" && \
ng build -c "development" && \
ng run web:server -c "development"
