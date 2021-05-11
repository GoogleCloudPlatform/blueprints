# What is this?

This function transforms the `ResourceHierarchy` custom resource into `Folder` custom resources constituting the hierarchy. Post-translation, it's necessary to use the `kpt-folder-parent` function from this repo to translate the results into Cork configs.

## Development
### To make changes to the src/
1. Run `npm install` to fetch all dependencies
1. Make your local changes
1. Run `npm test` to ensure that the tests are still passing. If they fail, go into the corresponding `_test.ts` file to fix it.
1. Once all tests pass, you can run via Docker or Node. Regardless, see the "Example input/output" section below for more information on providing well-formed input.
   - Docker
     - Build locally either via the npm script (`npm run kpt:docker-build`) or the `docker` command: `docker build -f build/generate_folders.Dockerfile ./`
     - Run via `docker run gcr.io/yakima-eap/generate-folders:dev --help` (note: despite the image name, this is indeed local!).
   - Node
     - `node dist/generate_folders_run.js -i <PATH TO YAML>`
1. To push the image with `dev` tag, run `npm run kpt:docker-push`. This will allow you to use the `gcr.io/yakima-eap/generate-folders:dev` image in your KRM manifests and test them with `kpt fn run`.
1. Once you're satisfied with your changes, send out a CR using `git push origin HEAD:refs/for/master`
1. Once the CR is approved, push your changes to the latest image using `npm run kpt:docker-build -- --tag=latest` and `npm run kpt:docker-push -- --tag=latest`.
   - TODO: This step needs to be automated using [prow](go/internal-prow-onboard).

Ref: [Kpt Typescript Development Guide](https://googlecontainertools.github.io/kpt/guides/producer/functions/ts/develop/)

## Example input/output

Well-formed YAML samples exist in this repo in the `hierarchy` folder, e.g. `simple/hierarchy.yaml`. **However**, the input must be wrapped in an `items` dictionary as shown below:

```yaml
# Cannot just pass the raw YAML files directly. Need to wrap with "items"
apiVersion: v1
items:
- apiVersion: blueprints.cloud.google.com/v1alpha3
  kind: ResourceHierarchy
  metadata:
    name: test-hierarchy
  ...
```

This outer resource is technically of `kind: ResourceList` ([reference](https://googlecontainertools.github.io/kpt/guides/producer/functions/#resourcelistitems)), but the `kind` is optional.

### `config`

The `config` array within `spec` represents the desired folder hierarchy.
Each item represents a top level folder.
Nested folders can be created within the config.

```yaml
layers:
- layer_one
- layer_two
config:
  - vegetables:
    - carrot
    - tomato
  - fruits:
    - apple
    - banana
```

This will produce the following folders:
- `vegetables`, `vegetables.carrot`, `vegetables.tomato`
- `fruits`, `fruits.apple`, `fruits.banana`

A `folder-ref` annotation will automatically be created for all but the root folders. For example, `fruits.apple` points to `fruits`:

```yaml
- apiVersion: resourcemanager.cnrm.cloud.google.com/v1beta1
  kind: Folder
  metadata:
    name: fruits.apple
    annotations:
      cnrm.cloud.google.com/folder-ref: fruits
    namespace: hierarchy
  spec:
    displayName: apple
```

For more information about _why_ `folder-ref` is needed, see the README located at `functions/kpt-folder-parent` in this repo.

### To make changes to crds/ and src/gen/
TODO: Document this procedure. It's unclear today.
