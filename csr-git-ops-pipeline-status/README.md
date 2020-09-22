# Monitor pipeline

[TOC]

## Prerequisites
**To use:**
- gcloud installed
  - gcloud authenticated locally
- CSR Git Ops pipeline created
- Git

**To develop:**
- python3
- pip
- virtualenv (`pip install virtualenv`)

## Usage
### Installation
Using `gsutil`, copy the necessary files into any directory contained within the `$PATH` environment variable. Examples:

**MacOS**
```bash
mkdir tmp
gsutil cp gs://git-pipeline-status/csr/darwin_amd64/latest/* ./tmp/.
chmod a+x tmp/* # This step is necessary to add executable permissions on the files
sudo mv tmp/* /usr/local/bin/.
rm -rf tmp
```

**Linux**
```bash
mkdir tmp
gsutil cp gs://git-pipeline-status/csr/linux_amd64/latest/* ./tmp/.
chmod a+x tmp/* # This step is necessary to add executable permissions on the files
sudo mv tmp/* /usr/local/bin/.
rm -rf tmp
```

**Windows**
TBD

### Using with your CSR Git Ops pipeline
1. Navigate to your source repository
2. Run the following command to track your changes on your latest commit of your current branch:
   ```bash
   git pipeline-status --cluster_name [CLUSTER NAME] --region [REGION] # Optional: --git_repo, --commit_sha, --project_id, --branch, --poll, --help
   ```

## Development
1. (Optional) Run virtualenv to create a virtual environment: `python3 -m venv venv`
2. (Optional) Activate virtualenv to use a local build of all your dependencies: `source ./venv/bin/activate`
3. Install all necessary dependencies: `pip install -r requirements.txt`
4. Run the script to make sure it works: `./src/main.py --help`
5. Make your updates
6. Build your changes into an executable:
   ```sh
   pyinstaller --onefile --paths venv/lib/python3.6/site-packages/ --additional-hooks-dir=./hooks ./src/main.py --name csr-pipeline-status
   ```
7. Run your built executable to confirm it works: `./dist/csr-pipeline-status --help`
8. Run tests (TBD)

## Using the built executable locally
1. Copy your built executable to somewhere in your `$PATH` (i.e. `/usr/local/bin`)
   ```sh
   sudo cp ./dist/csr-pipeline-status /usr/local/bin/csr-pipeline-status
   ```
2. Copy the git custom command to somewhere in your `$PATH` (i.e. `/usr/local/bin`)
   ```sh
   sudo cp ./scripts/git-pipeline-status /usr/local/bin/git-pipeline-status
   ```
3. See the **Using with your CSR Git Ops pipeline** section for instructions on how to run the command

## Pending feature updates
1. Being able to correlative nomos status last synced token w/ the changes related to your commit SHA (likely can parse cloud build logs to get info)
2. Being able to get actuation status from the cluster directly (likely we can do a kubectl command to get the pending or errored KCC resources on the cluster)
3. Provide a link to the deployment repo for further debugging if needed
4. Cleanly show the "blast radius" info from the cloud build logs
5. Rely less on nomos cmd and more on a stable API server of some sort

TODO(jcwc): Add notes about testing process and release process
TODO2(jcwc): Consider making this declarative by accepting a Kptfile?
