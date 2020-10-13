# Landing Zone KPT Functions

TODO: add more content

## Development
### To make changes to the src/
1. Run `npm install` to fetch all dependencies
1. Make your local changes
2. Run `npm test` to ensure that the tests are still passing
  - If the tests fail, go into the corresponding _test.ts file to fix it
3. Once all tests pass, you can run
   1. *  `npm run kpt:docker-build` to build the image locally
      *  Alternatively: `docker builder build -f build/generate_folders.Dockerfile`
   2. Run it using `docker run gcr.io/yakima-eap/generate_folders:dev --help`
      - Note that the input to the image expects a CRD that matches:
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
4. To push the image with `dev` tag, run `npm run kpt:docker-push`. This will allow you to use the `gcr.io/yakima-eap/generate_folders:dev` image in your KRM manifests and test them with `kpt fn run`.
5. Once you're satisfied with your changes, send out a CR using `git push origin HEAD:refs/for/master`
6. Once the CR is approved, push your changes to the latest image using `npm run kpt:docker-build -- --tag=latest` and `npm run kpt:docker-push -- --tag=latest`.
   - TODO: This step needs to be automated using [prow](go/internal-prow-onboard).

Ref: [Kpt Typescript Development Guide](https://googlecontainertools.github.io/kpt/guides/producer/functions/ts/develop/)

### To make changes to crds/ and src/gen/
TODO: Document this procedure. It's unclear today.
