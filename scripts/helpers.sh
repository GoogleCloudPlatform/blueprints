CLUSTER_NAME="yakima-static-gke"
CLUSTER_REGION="us-central1"

verify_cloudbuild_success() {
  local SOURCE_REPO=$1
  local PROJECT_ID=$2
  CURRENT_DIR=$(pwd)

  cd ${SOURCE_REPO}
  FILTER="source.repo_source.commit_sha=$(git rev-parse HEAD)"
  # You can poll on this command until status is either SUCCESS or FAILURE
  BUILD_ID=$(gcloud builds list --project=${PROJECT_ID} --filter=${FILTER} --format='get(id)' | head -n 1)
  BUILD_STATUS="$(gcloud builds describe ${BUILD_ID} --format="get(status)" --project ${PROJECT_ID})"

  while [[ "${BUILD_STATUS}" == "WORKING" ]]; do
    echo "Waiting for cloudbuild..."
    gcloud builds list --project=${PROJECT_ID} --filter=${FILTER}
    sleep 5
    BUILD_STATUS="$(gcloud builds describe ${BUILD_ID} --format="get(status)" --project ${PROJECT_ID})"
  done

  if [[ "${BUILD_STATUS}" != "SUCCESS" ]]; then
    echo "Build status: $BUILD_STATUS"
    exit 1
  fi

  cd $CURRENT_DIR # Return to whatever directory we called this function from
}

verify_kubernetes_resources() {
  local SOURCE_REPO=$1
  shift
  local PROJECT_ID=$1
  shift
  local SYNC_TIMEOUT=$1
  shift
  local NAMESPACE=$1
  shift
  local RESOURCE_TYPE=$1
  shift

  resources=("$@")

  gcloud container clusters get-credentials ${CLUSTER_NAME} --region ${CLUSTER_REGION} --project ${PROJECT_ID}

  # while loop checking for resources to appear in kubectl
  for resource in ${resources[@]}
  do
    success=false
    for i in $(seq 1 $SYNC_TIMEOUT)
    do
      if kubectl get ${RESOURCE_TYPE} ${resource} -n ${NAMESPACE} &&
        [[ "$(kubectl get $RESOURCE_TYPE ${resource} -n ${NAMESPACE} -o=jsonpath='{.status.conditions[0].reason}')" == "UpToDate" ]]; then
        success=true
        echo "Successfully found resource named '${resource}' of type '${RESOURCE_TYPE}'"
        break
      else
        echo "Resource ${resource} not found yet. Polling.... Retry: ${i}"
        sleep 1
      fi
    done

    if [ ${success} = false ]; then
      kubectl describe ${RESOURCE_TYPE} $resource -n ${NAMESPACE}
      echo "Resource could not be successfully updated"
      exit 1
    fi
  done
}
