# Usage
```
pyinstaller --onefile --paths venv/lib/python3.6/site-packages/ --additional-hooks-dir=./hooks ./src/main.py --name csr-pipeline-status
```

Run on source repo:
```
./dist/csr-pipeline-status --commit_sha=495b544ca861f791d467dd1b3c513d7dd438e595 --cluster_name=yakima-csr --region=us-west1 --branch=staging
```

TODO(jcwc): Find a way to make this declarative (probably using Kptfile)
