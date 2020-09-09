# Blueprints

This repository contains blueprints for
[Landing Zone Steel Thread](http://go/cpa-landing-zone).

The ongoing conversations are documented in
[Landing Zone Steel Thread (Working Group)](http://go/cpa-landing-zone-notes).

Overall top-level
[tracking of September 2020 announcement](http://go/cpaseptemberlaunch-demoeap-tracker).

## Landing Zone CUJs

Landing Zone CUJs and associated blueprints.

| CUJ                                                      | Blueprint                        | Status                                 |
| -------------------------------------------------------- | -------------------------------- | -------------------------------------- |
| [CUJ1: Discovery/Set up][1]                              | [Bootstrap]                      | Script-only, no BP[^1], supports ACP   |
|                                                          | [GitOps](/csr-git-ops-pipeline/) | Ready: supports CSR                    |
|                                                          | [Landing Zone](/landing-zone/)   | Catch-all, **requirements undefined**  |
| [CUJ2: Configure Resource Hierarchy][2] - [4 Options][9] | Overview Docs                    | [pending][cl-22280]                    |
|                                                          | [Simple](/hierarchy/simple)      | Works, Needs docs                      |
|                                                          | [Team](/hierarchy/team)          | Works, Needs docs                      |
|                                                          | [BU](/hierarchy/bu)[^2]          | Works, Needs docs                      |
|                                                          | [Env & BU](/hierarchy/env-bu)    | Works, Needs docs                      |
| [CUJ3: Manage Project Factory][3]                        | [Project](/project/)             | Works, Needs better docs               |
| [CUJ4: Set up networking][4]                             | [Network](/network/)             | **Missing**                            |
|                                                          | [Firewall](/firewall/)           | **Missing**                            |
| [CUJ5: Set up access control][5]                         | [Org hierarchy](/hierarchy/)     | BP exists, **UNKNOWN** CUJ support[^3] |
|                                                          | [Project](/project/)             | BP exists, **UNKNOWN** CUJ support[^3] |
|                                                          | [Network](/network/)             | **Missing**                            |
| [CUJ6: Set up logging and monitoring][6]                 | [Project](/project/)             | BP exists, **UNKNOWN** CUJ support[^3] |
|                                                          | [Log export](/log-export/)       | **Missing**                            |
| [CUJ7: Set up change control and security guardrails][7] | [Org policies](/policies/)       | **Missing**                            |
| [CUJ8: Collaborate][8]                                   | [GitOps](/csr-git-ops-pipeline/) | Ready                                  |

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

---

[^1]: Blueprint, set of config files, docs, and KPT metadata.

[^2]: Business Unit, a.k.a. Division.

[^3]:
  The blueprint exists, but whether the BP fulfills the CUJ requirements in its
  current state is still unknown because it hasn't been tested yet.

## Contact information

- Yakima: yakima@google.com
- Landing Zone Working Group: cpa-landing-zone-wg@google.com
