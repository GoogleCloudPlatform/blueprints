# Google Kubernetes Engine, Cloud Storage bucket blueprint
This blueprint deploys a bucket, and a GKE cluster

Replace Kptfile's `${REQUIRED_NAME}` with the desired name. The name is used for the GKE cluster. 
The bucket name has the project ID as prefix per `pattern: ${PROJECT_ID}-${NAME}` in `Kptfile`. 