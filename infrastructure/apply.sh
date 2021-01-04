source ../development.env

../.funk/google-cloud-sdk/bin/gcloud auth application-default login
PATH_TO_VAR_FILE=../.funk/build-pipeline-output/configuration/configuration.auto.tfvars.json

terraform apply -var-file=$PATH_TO_VAR_FILE
