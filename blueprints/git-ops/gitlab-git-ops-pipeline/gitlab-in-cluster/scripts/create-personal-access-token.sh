# Create a new personal access token based off of the root password
# Reference: https://github.com/GoogleCloudPlatform/solutions-modern-cicd-anthos/blob/master/2_gitlab/cloudbuild.yaml#L73-L83
# TODO(jcwc): Consider running this in cloudbuild to provide a more sandboxed environment
NAMESPACE=$1
GITLAB_PASSWORD=$(kubectl get secrets gitlab-gitlab-initial-root-password -o jsonpath="{.data.password}" -n $NAMESPACE | base64 --decode)
WEBSERVICE_POD=$(kubectl get pods -l=app=webservice -o jsonpath='{.items[0].metadata.name}' -n $NAMESPACE)
export GITLAB_TOKEN=${GITLAB_PASSWORD}
kubectl exec -i $WEBSERVICE_POD -c webservice -n $NAMESPACE -- /bin/bash -c "
  cd /srv/gitlab;
  bin/rails r \"
  token_digest = Gitlab::CryptoHelper.sha256 \\\"${GITLAB_PASSWORD}\\\";
  token=PersonalAccessToken.create!(name: \\\"Yakima Git Ops Installer\\\", scopes: [:api], user: User.where(id: 1).first, token_digest: token_digest);
  token.save!
  \";
"
