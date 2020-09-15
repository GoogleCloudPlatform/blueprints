# Blueprints

This repository contains blueprints for
[Landing Zone Steel Thread](http://go/cpa-landing-zone).

The ongoing conversations are documented in
[Landing Zone Steel Thread (Working Group)](http://go/cpa-landing-zone-notes).

Overall top-level
[tracking of September 2020 announcement](http://go/cpaseptemberlaunch-demoeap-tracker).

## Landing Zone CUJs

Landing Zone CUJs and associated blueprints.

| CUJ                                                      | Blueprint                        | Status                        | Recording                                                                                                                                                                             |
| -------------------------------------------------------- | -------------------------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [CUJ1: Discovery/Set up][1]                              | [Bootstrap]                      | Script-only, supports ACP     | [bootstrap part 1](https://drive.google.com/file/d/1eUVWmLB_Hm4BFV4gsh805-jD_r9swA9f/view) - [waiting part 2](https://drive.google.com/file/d/1ui45VLO8M8FoQCzFnDojrMYSKz_MVBHn/view) |
|                                                          | [GitOps](/csr-git-ops-pipeline/) | Ready: supports CSR           |                                                                                                                                                                                       |
|                                                          | [Landing Zone](/landing-zone/)   | **requirements undefined**    |                                                                                                                                                                                       |
| [CUJ2: Configure Resource Hierarchy][2] - [4 Options][9] | [Overview Docs](/hierarchy)      | Mostly done                   |                                                                                                                                                                                       |
|                                                          | [Simple](/hierarchy/simple)      | Works, Needs docs             |                                                                                                                                                                                       |
|                                                          | [Team](/hierarchy/team)          | Works, Needs docs             |                                                                                                                                                                                       |
|                                                          | [BU](/hierarchy/bu)              | Works, Needs docs             |                                                                                                                                                                                       |
|                                                          | [Env & BU](/hierarchy/env-bu)    | Works, Needs docs             | [hierarchy/folders](https://drive.google.com/file/d/1_0VmcIHNHREOnm_FxaA4BDSl1azD5zj4/view)                                                                                           |
| [CUJ3: Manage Project Factory][3]                        | [Project](/project/)             | Works, **billing needs work** | [project factory](https://drive.google.com/file/d/1PdeTxQFoy9kEB2c0h5DWjA4Zjhzh44LX/view)                                                                                             |
| [CUJ4: Set up networking][4]                             | [Network](/network/)             | BP exists, **Not verified**   |                                                                                                                                                                                       |
|                                                          | [Firewall](/firewall/)           | **Missing**                   |                                                                                                                                                                                       |
| [CUJ5: Set up access control][5]                         | [Org hierarchy](/hierarchy/)     | BP exists, **Not verified**   |                                                                                                                                                                                       |
|                                                          | [Project](/project/)             | BP exists, **Not verified**   |                                                                                                                                                                                       |
|                                                          | [Network](/network/)             | **Missing**                   |                                                                                                                                                                                       |
| [CUJ6: Set up logging and monitoring][6]                 | [Project](/project/)             | BP exists, **Not verified**   |                                                                                                                                                                                       |
|                                                          | [Log export](/log-export/)       | **Missing**                   |                                                                                                                                                                                       |
| [CUJ7: Set up change control and security guardrails][7] | [Org policies](/policies/)       | **Missing**                   |                                                                                                                                                                                       |
| [CUJ8: Collaborate][8]                                   | [GitOps](/csr-git-ops-pipeline/) | Ready                         | N/A - Tested by CUJ 2 through 7                                                                                                                                                       |

[bootstrap]: https://cnrm.git.corp.google.com/yakima/+/refs/heads/master/bootstrap/script
[1]: https://docs.google.com/document/d/1uaWE2_MZs5GDA1jRbs5EcCdL2nBNQ6YQiINxtnhcTsM/edit#heading=h.umcqf3j6dgca
[2]: https://docs.google.com/document/d/1uaWE2_MZs5GDA1jRbs5EcCdL2nBNQ6YQiINxtnhcTsM/edit#heading=h.qz2xkc2cigyf
[3]: https://docs.google.com/document/d/1uaWE2_MZs5GDA1jRbs5EcCdL2nBNQ6YQiINxtnhcTsM/edit#heading=h.gzafg45s2dia
[4]: https://docs.google.com/document/d/1uaWE2_MZs5GDA1jRbs5EcCdL2nBNQ6YQiINxtnhcTsM/edit#heading=h.mcvs0p4rkqom
[5]: https://docs.google.com/document/d/1uaWE2_MZs5GDA1jRbs5EcCdL2nBNQ6YQiINxtnhcTsM/edit#heading=h.az9d5mlq0s19
[6]: https://docs.google.com/document/d/1uaWE2_MZs5GDA1jRbs5EcCdL2nBNQ6YQiINxtnhcTsM/edit#heading=h.bute9ap5doug
[7]: https://docs.google.com/document/d/1uaWE2_MZs5GDA1jRbs5EcCdL2nBNQ6YQiINxtnhcTsM/edit#heading=h.mhglvdi4aeu2
[8]: https://docs.google.com/document/d/1uaWE2_MZs5GDA1jRbs5EcCdL2nBNQ6YQiINxtnhcTsM/edit#heading=h.h301nyjgayyf
[9]: http://go/org-hierarchy-options
[cl-22280]: https://cnrm-review.git.corp.google.com/c/blueprints/+/22280

### Terms

- BP - Blueprint, set of config files, docs, and KPT metadata.
- BU - Business Unit, a.k.a. Division.

## Contact information

- Yakima: yakima@google.com
- Landing Zone Working Group: cpa-landing-zone-wg@google.com
