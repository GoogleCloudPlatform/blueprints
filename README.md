# Blueprints

This repository contains blueprints for
[Landing Zone Steel Thread](http://go/cpa-landing-zone).

The ongoing conversations are documented in
[Landing Zone Steel Thread (Working Group)](http://go/cpa-landing-zone-notes).

Overall top-level
[tracking of September 2020 announcement](http://go/cpaseptemberlaunch-demoeap-tracker).

## Landing Zone CUJs

Landing Zone CUJs and associated blueprints.

| CUJ                                                      | Blueprint                                           | Status                | Demo Recordings                                                                     |
| -------------------------------------------------------- | --------------------------------------------------- | --------------------- | ----------------------------------------------------------------------------------- |
| [CUJ1: Discovery/Set up][1]                              | [Bootstrap]                                         | Script, supports ACP  | [bootstrap, video][demo-1a] - [actuation][demo-1b], [shell](./demos/bootstrap.cast) |
|                                                          | [GitOps](/blueprints/git-ops/csr-git-ops-pipeline/) | Ready                 | [Clone + LZ](./demos/lz.cast)                                                       |
|                                                          | [Landing Zone](/blueprints/landing-zone/)           | Ready                 |                                                                                     |
| [CUJ2: Configure Resource Hierarchy][2] - [4 Options][9] | [Overview Docs](/blueprints/hierarchy)              | Ready                 |                                                                                     |
|                                                          | [Simple](/blueprints/hierarchy/simple)              | Ready                 |                                                                                     |
|                                                          | [Team](/blueprints/hierarchy/team)                  | Ready                 |                                                                                     |
|                                                          | [BU](/blueprints/hierarchy/bu)                      | Ready                 |                                                                                     |
|                                                          | [Env & BU](/blueprints/hierarchy/env-bu)            | Ready                 | [hierarchy/folders][demo-2]                                                         |
| [CUJ3: Manage Project Factory][3]                        | [Project](/blueprints/project/)                     | Ready                 | [project factory][demo-3]                                                           |
| [CUJ4: Set up networking][4]                             | [Network](/blueprints/networking/network/)          | Ready                 |                                                                                     |
|                                                          | [Firewall](/blueprints/networking/firewall/)        | Ready                 |                                                                                     |
| [CUJ5: Set up access control][5]                         | [Landing Zone](/blueprints/landing-zone/)           | Ready                 |                                                                                     |
|                                                          | [Org hierarchy](/blueprints/hierarchy/)             | Ready                 |                                                                                     |
|                                                          | [Project](/blueprints/project/)                     | Ready                 |                                                                                     |
|                                                          | [Network](/blueprints/networking/network/)          | Ready                 |                                                                                     |
| [CUJ6: Set up logging and monitoring][6]                 | [Log export](/blueprints/log-export/)               | Ready                 |                                                                                     |
| [CUJ7: Set up change control and security guardrails][7] | [Landing Zone](/blueprints/landing-zone/)           | Ready                 |                                                                                     |
| [CUJ8: Collaborate][8]                                   | [GitOps](/blueprints/git-ops/csr-git-ops-pipeline/) | Ready                 | N/A - Tested by CUJ 2 through 7                                                     |

[bootstrap]: ./bootstrap
[1]: https://docs.google.com/document/d/1uaWE2_MZs5GDA1jRbs5EcCdL2nBNQ6YQiINxtnhcTsM/edit#heading=h.umcqf3j6dgca
[2]: https://docs.google.com/document/d/1uaWE2_MZs5GDA1jRbs5EcCdL2nBNQ6YQiINxtnhcTsM/edit#heading=h.qz2xkc2cigyf
[3]: https://docs.google.com/document/d/1uaWE2_MZs5GDA1jRbs5EcCdL2nBNQ6YQiINxtnhcTsM/edit#heading=h.gzafg45s2dia
[4]: https://docs.google.com/document/d/1uaWE2_MZs5GDA1jRbs5EcCdL2nBNQ6YQiINxtnhcTsM/edit#heading=h.mcvs0p4rkqom
[5]: https://docs.google.com/document/d/1uaWE2_MZs5GDA1jRbs5EcCdL2nBNQ6YQiINxtnhcTsM/edit#heading=h.az9d5mlq0s19
[6]: https://docs.google.com/document/d/1uaWE2_MZs5GDA1jRbs5EcCdL2nBNQ6YQiINxtnhcTsM/edit#heading=h.bute9ap5doug
[7]: https://docs.google.com/document/d/1uaWE2_MZs5GDA1jRbs5EcCdL2nBNQ6YQiINxtnhcTsM/edit#heading=h.mhglvdi4aeu2
[8]: https://docs.google.com/document/d/1uaWE2_MZs5GDA1jRbs5EcCdL2nBNQ6YQiINxtnhcTsM/edit#heading=h.h301nyjgayyf
[9]: http://go/org-hierarchy-options
[demo-1a]: https://drive.google.com/file/d/1eUVWmLB_Hm4BFV4gsh805-jD_r9swA9f/view
[demo-1b]: https://drive.google.com/file/d/1ui45VLO8M8FoQCzFnDojrMYSKz_MVBHn/view
[demo-2]: https://drive.google.com/file/d/1_0VmcIHNHREOnm_FxaA4BDSl1azD5zj4/view
[demo-3]: https://drive.google.com/file/d/1PdeTxQFoy9kEB2c0h5DWjA4Zjhzh44LX/view

### Terms

- BP - Blueprint, set of config files, docs, and KPT metadata.
- BU - Business Unit, a.k.a. Division.

## Contact information

- Yakima: yakima@google.com
- Landing Zone Working Group: cpa-landing-zone-wg@google.com
