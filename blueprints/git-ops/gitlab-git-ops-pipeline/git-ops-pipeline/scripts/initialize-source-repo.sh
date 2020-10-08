# TODO(jcwc): Consider running this on cloudbuild for a more sandboxed environment
set -e

PERSONAL_ACCESS_TOKEN=$1
PROJECT_ID=$2
SOURCE_REPO_NAME=$3
REPO_URL="https://oauth2:${PERSONAL_ACCESS_TOKEN}@gitlab.endpoints.${PROJECT_ID}.cloud.goog/root/${SOURCE_REPO_NAME}.git"

push_changes_to_repo() {
  branch=$1
  commit_msg=$2

  git add -A
  git commit -m "${commit_msg}"
  git push $REPO_URL $branch
}

echo "Making temporary directory and cloning ${REPO_URL}"
mkdir -p .build && cd .build
git clone $REPO_URL
cd $SOURCE_REPO_NAME
cp ../../scripts/.gitlab-ci.yml .

echo "Pushing initial GitLab CI changes to source repo master branch"
push_changes_to_repo "master" "[Automatic] Initial commit to set GitLab CI"
echo '.gitlab-ci.yml' > .gitignore
push_changes_to_repo "master" "[Automatic] Add .gitignore to prevent changes against GitLab CI"

echo "Pushing initial GitLab CI changes to source repo staging branch"
git checkout -b staging
git push $REPO_URL staging

echo "Deleting temporary directory"
cd ..
rm -rf $SOURCE_REPO_NAME

echo "All steps successful. GitLab CI initialized in master and staging branches of ${REPO_URL}"
