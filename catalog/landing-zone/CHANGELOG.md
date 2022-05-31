# Changelog

### [0.5.1](https://github.com/GoogleCloudPlatform/blueprints/compare/landing-zone-blueprint-v0.5.0...landing-zone-blueprint-v0.5.1) (2022-05-24)


### Bug Fixes

* Add 'ignore-clusterless' annotations to resources that are irrelevant to clusterless actuation mode (when a GKE cluster is not involved) ([#164](https://github.com/GoogleCloudPlatform/blueprints/issues/164)) ([84fa763](https://github.com/GoogleCloudPlatform/blueprints/commit/84fa76359253eca234ab5664a97c62dc88b1a860))
* add local-config annotations to kptfiles and functionConfigs ([#176](https://github.com/GoogleCloudPlatform/blueprints/issues/176)) ([0d005f0](https://github.com/GoogleCloudPlatform/blueprints/commit/0d005f0174d95d3aca1691e67deffa573c3e7db7))
* ignore namespace IAM resources in clusterless mode ([#170](https://github.com/GoogleCloudPlatform/blueprints/issues/170)) ([4a298ad](https://github.com/GoogleCloudPlatform/blueprints/commit/4a298addae80b239b8a298bf6a057a242470a081))

## [0.5.0](https://www.github.com/GoogleCloudPlatform/blueprints/compare/landing-zone-blueprint-v0.4.0...landing-zone-blueprint-v0.5.0) (2021-12-22)


### Features

* Implement landing-zone-lite and fix some issues in the existing LZ blueprints ([#93](https://www.github.com/GoogleCloudPlatform/blueprints/issues/93)) ([bdd20a5](https://www.github.com/GoogleCloudPlatform/blueprints/commit/bdd20a5f8a5ae54099a254835b8fce15946bf8e9))

## [0.4.0](https://www.github.com/GoogleCloudPlatform/blueprints/compare/landing-zone-blueprint-v0.3.0...landing-zone-blueprint-v0.4.0) (2021-09-14)


### Features

* **landing-zone:** add automaticIamGrantsForDefaultServiceAccounts org policy ([#67](https://www.github.com/GoogleCloudPlatform/blueprints/issues/67)) ([eed1ebe](https://www.github.com/GoogleCloudPlatform/blueprints/commit/eed1ebe91867e05a17e2d0640b315375b461c670))
* Switch to using IAMPartialPolicy instead of IAMPolicyMember ([#62](https://www.github.com/GoogleCloudPlatform/blueprints/issues/62)) ([395b921](https://www.github.com/GoogleCloudPlatform/blueprints/commit/395b921fe35bf54677e66df013f3ca4c2a09fdb6))


### Bug Fixes

* minor fixes in IAMPartialPolicy ([#63](https://www.github.com/GoogleCloudPlatform/blueprints/issues/63)) ([188ad2a](https://www.github.com/GoogleCloudPlatform/blueprints/commit/188ad2ab8d75e696d5127a52b146ca6f8363b8b3))
* swap IAMPartialPolicy back to IAMPolicyMember for org resourceRefs ([#64](https://www.github.com/GoogleCloudPlatform/blueprints/issues/64)) ([45f5718](https://www.github.com/GoogleCloudPlatform/blueprints/commit/45f571820d091c2046ae6a0541ed89d590014090))
