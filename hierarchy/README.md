# Org hierarchy blueprint
## What is this?
This folder contains 4 different blueprint options for org hierarchy folder structures: simple, team, bu and env-bu.

## How to use it
Make sure to navigate to your Yakima source repository before running the commands below.

```bash
kpt pkg get sso://cnrm/blueprints.git/hierarchy/<hierarchy option>@master hierarchy
kpt cfg list-setters hierarchy
kpt cfg set hierarchy namespace <your namespace>
kpt cfg set hierarchy organization-id <your organization ID>
git add -A && git commit -m "Added hierarchy blueprint" && git push

# Verify folder creation
kubectl -n ${YOUR_NAMESPACE} get folders -o custom-columns=NAME:.metadata.name,ID:.status.name
```

TODO(jcwc): Add more info about:
1. Hierarchy folder structures
2. Where this blueprint should live in the source repo
3. What prerequisites/ permissions it needs
4. How to verify if it worked or not (and debug)

Owners:
- [jcwc](http://who/jcwc@google.com)
- [morgantep](http://who/morgantep@google.com)
