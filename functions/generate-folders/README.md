# What is this?

This function transforms the `ResourceHierarchy` custom resource into `Folder` custom resources constituting the hierarchy. Post-translation, it's necessary to use the `kpt-folder-parent` function from this repo to translate the results into Cork configs.

## Development
### To make changes to the src/
1. Run `npm install` to fetch all dependencies
1. Make your local changes
1. Run `npm test` to ensure that the tests are still passing. If they fail, go into the corresponding `_test.ts` file to fix it.
1. Once all tests pass, you can run
   1. `npm run kpt:docker-build` to build the image locally
      1. Alternatively: `docker build -f build/generate_folders.Dockerfile ./`
   1. Run it using `docker run gcr.io/yakima-eap/generate-folders:dev --help` (note: despite the image name, this is indeed local!)
      - The input to the image must be a CRD that matches:
      ```yaml
      # Cannot just pass the raw YAML files directly. Need to wrap with "items"
      apiVersion: v1
      items:
      - apiVersion: cft.dev/v1alpha1
        kind: ResourceHierarchy
        metadata:
          name: test-hierarchy
        ...
      ```
1. To push the image with `dev` tag, run `npm run kpt:docker-push`. This will allow you to use the `gcr.io/yakima-eap/generate-folders:dev` image in your KRM manifests and test them with `kpt fn run`.
1. Once you're satisfied with your changes, send out a CR using `git push origin HEAD:refs/for/master`
1. Once the CR is approved, push your changes to the latest image using `npm run kpt:docker-build -- --tag=latest` and `npm run kpt:docker-push -- --tag=latest`.
   - TODO: This step needs to be automated using [prow](go/internal-prow-onboard).

Ref: [Kpt Typescript Development Guide](https://googlecontainertools.github.io/kpt/guides/producer/functions/ts/develop/)

### To make changes to crds/ and src/gen/
TODO: Document this procedure. It's unclear today.
