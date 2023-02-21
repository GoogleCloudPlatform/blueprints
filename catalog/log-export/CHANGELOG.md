# Changelog

## [0.6.1](https://github.com/GoogleCloudPlatform/blueprints/compare/log-export-blueprint-v0.6.0...log-export-blueprint-v0.6.1) (2023-02-21)


### Bug Fixes

* update generate-kpt-pkg-docs version to fix bug ([#204](https://github.com/GoogleCloudPlatform/blueprints/issues/204)) ([51c8c8c](https://github.com/GoogleCloudPlatform/blueprints/commit/51c8c8cc870cae72d3bb73a86313f151dc3e0e94))

## [0.6.0](https://github.com/GoogleCloudPlatform/blueprints/compare/log-export-blueprint-v0.5.0...log-export-blueprint-v0.6.0) (2022-08-24)


### Features

* adds blueprints for log-export with sinks for Cloud Log Buckets ([6edd3f5](https://github.com/GoogleCloudPlatform/blueprints/commit/6edd3f5c40cbcb331aea575f0d159a5912d4285a))


### Bug Fixes

* adds depends-on annotation for log-export ([7696fa4](https://github.com/GoogleCloudPlatform/blueprints/commit/7696fa4a1b9df7692e21db01e520422436591b2e))
* adds the iam policy resource for the sink for log-bucket ([1ac8e49](https://github.com/GoogleCloudPlatform/blueprints/commit/1ac8e4930c9da45e80c622d4cbd681ee0a7c364d))
* org logbucket retention setter ([42a7d0d](https://github.com/GoogleCloudPlatform/blueprints/commit/42a7d0d39c4aded518b856b8315cbb0f6438f44d))
* sets bucket-locked to false as default ([2725a8e](https://github.com/GoogleCloudPlatform/blueprints/commit/2725a8eca562a732c4616cfee65ec43220c965f7))

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
