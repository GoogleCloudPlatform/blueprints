# Changelog

## [0.5.0](https://github.com/GoogleCloudPlatform/blueprints/compare/log-export-blueprint-v0.4.0...log-export-blueprint-v0.5.0) (2022-05-24)


### ⚠ BREAKING CHANGES

* replace bucket policy in storage log export with uniform bucket level access

### Features

* add one year retention policy to log export buckets ([#181](https://github.com/GoogleCloudPlatform/blueprints/issues/181)) ([c1ddf5e](https://github.com/GoogleCloudPlatform/blueprints/commit/c1ddf5efcc0cdb6b80b734c32f60501f55c703a4))


### Bug Fixes

* add local-config annotations to kptfiles and functionConfigs ([#176](https://github.com/GoogleCloudPlatform/blueprints/issues/176)) ([0d005f0](https://github.com/GoogleCloudPlatform/blueprints/commit/0d005f0174d95d3aca1691e67deffa573c3e7db7))
* add missing project-ids to log-export resources ([#186](https://github.com/GoogleCloudPlatform/blueprints/issues/186)) ([4faea47](https://github.com/GoogleCloudPlatform/blueprints/commit/4faea47cefc8d4a7c966fde76de0a4e6b6260d2d))
* add project-id anno to log-export resources ([#182](https://github.com/GoogleCloudPlatform/blueprints/issues/182)) ([15a753b](https://github.com/GoogleCloudPlatform/blueprints/commit/15a753b9bcc961d7310428ee96c61190454144e3))
* add setters for retention period in log bucket ([#185](https://github.com/GoogleCloudPlatform/blueprints/issues/185)) ([15a7eb0](https://github.com/GoogleCloudPlatform/blueprints/commit/15a7eb050cf9b5cb7d6dd88b815a3fc112bd80aa))
* replace bucket policy in storage log export with uniform bucket level access ([2b288c2](https://github.com/GoogleCloudPlatform/blueprints/commit/2b288c2c1ce534dcdd221b98da690102eaf0e8c2))

## [0.4.0](https://www.github.com/GoogleCloudPlatform/blueprints/compare/log-export-blueprint-v0.3.0...log-export-blueprint-v0.4.0) (2021-09-14)


### Features

* Switch to using IAMPartialPolicy instead of IAMPolicyMember ([#62](https://www.github.com/GoogleCloudPlatform/blueprints/issues/62)) ([395b921](https://www.github.com/GoogleCloudPlatform/blueprints/commit/395b921fe35bf54677e66df013f3ca4c2a09fdb6))
