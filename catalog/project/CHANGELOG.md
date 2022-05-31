# Changelog

### [0.4.3](https://github.com/GoogleCloudPlatform/blueprints/compare/project-blueprint-v0.4.2...project-blueprint-v0.4.3) (2022-05-24)


### Bug Fixes

* Add 'ignore-clusterless' annotations to resources that are irrelevant to clusterless actuation mode (when a GKE cluster is not involved) ([#164](https://github.com/GoogleCloudPlatform/blueprints/issues/164)) ([84fa763](https://github.com/GoogleCloudPlatform/blueprints/commit/84fa76359253eca234ab5664a97c62dc88b1a860))
* Add ignore-clusterless to project blueprint resources that are unnecessary in clusterless workflow. ([#173](https://github.com/GoogleCloudPlatform/blueprints/issues/173)) ([3c2dda6](https://github.com/GoogleCloudPlatform/blueprints/commit/3c2dda6e6ba2c7929b2cb5e4c71c9584eb62654c))
* add local-config annotations to kptfiles and functionConfigs ([#176](https://github.com/GoogleCloudPlatform/blueprints/issues/176)) ([0d005f0](https://github.com/GoogleCloudPlatform/blueprints/commit/0d005f0174d95d3aca1691e67deffa573c3e7db7))

### [0.4.2](https://github.com/GoogleCloudPlatform/blueprints/compare/project-blueprint-v0.4.1...project-blueprint-v0.4.2) (2022-02-02)


### Bug Fixes

* remove redundant project annotation ([#132](https://github.com/GoogleCloudPlatform/blueprints/issues/132)) ([35b03a8](https://github.com/GoogleCloudPlatform/blueprints/commit/35b03a801fd7996e7dace90cb967b02cba332557))

### [0.4.1](https://www.github.com/GoogleCloudPlatform/blueprints/compare/project-blueprint-v0.4.0...project-blueprint-v0.4.1) (2021-10-15)


### Bug Fixes

* add validation for project ns blueprint ([#77](https://www.github.com/GoogleCloudPlatform/blueprints/issues/77)) ([a5d8d37](https://www.github.com/GoogleCloudPlatform/blueprints/commit/a5d8d37e250d6cb1f9db83963e5cdc3865736e88))

## [0.4.0](https://www.github.com/GoogleCloudPlatform/blueprints/compare/project-blueprint-v0.3.0...project-blueprint-v0.4.0) (2021-09-14)


### Features

* Switch to using IAMPartialPolicy instead of IAMPolicyMember ([#62](https://www.github.com/GoogleCloudPlatform/blueprints/issues/62)) ([395b921](https://www.github.com/GoogleCloudPlatform/blueprints/commit/395b921fe35bf54677e66df013f3ca4c2a09fdb6))
