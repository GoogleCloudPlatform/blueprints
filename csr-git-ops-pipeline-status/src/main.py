#!/usr/bin/env python

import argparse
import pprint
import sys
import os
import time

import git

from cloudbuild import BuildStatusSummary, get_cloudbuild_summary
from google.cloud import storage
from nomos import get_nomos_summary
from print import print_results
from git_status import GitStatus, get_git_summary
import collections

PipelineSummary = collections.namedtuple('PipelineSummary', ['git', 'cloudbuild', 'nomos'])

def get_parameters():
  parser = argparse.ArgumentParser(description='Process command line inputs on cluster and git info')
  parser.add_argument('--commit_sha', '-s', action="store", dest="commit_sha", help="Commit SHA of the change you'd like to track. By default, set to latest SHA")
  parser.add_argument('--branch', '-b', action="store", dest="branch", help="Branch of the change you'd like to track")
  parser.add_argument('--project_id', '-p', action="store", dest="project_id", default=storage.Client().project, help="Project ID of your Yakima cluster")
  parser.add_argument('--cluster_name', '-c', action="store", dest="cluster_name", required=True, help="Name of your Yakima cluster in GKE/ ACP (NOTE: prepend 'krmapihost-' to your cluster name if ACP)")
  parser.add_argument('--region', '-r', action="store", dest="region", required=True, help="Region of your Yakima cluster")
  parser.add_argument('--git_repo', '-g', action="store", dest="git_repo", default=".", help="Path to your git repo. By default, set to current repo.")
  parser.add_argument('--poll', action="store_true", default=False, help="Run the command in a poll loop to monitor your status periodically.")

  args = parser.parse_args(sys.argv[1:])

  if args.commit_sha == None:
    args.commit_sha = git.Repo(args.git_repo).head.commit.hexsha

  if args.branch == None:
    args.branch = git.Repo(args.git_repo).active_branch.name

  return args

def get_kubectl_creds(parameters):
  os.system('gcloud container clusters get-credentials {} --region {} --project {}'.format(
    parameters.cluster_name,
    parameters.region,
    parameters.project_id
  ))

# Provides a single pane hydration UX experience for CSR git ops pipeline users
# by retrieving results from Git, CloudBuild & Nomos and showing a summary
# of the state of the change corresponding to a commit.
def main():
  parameters = get_parameters()
  executed = False

  while parameters.poll or not executed:
    git_summary = get_git_summary(parameters)
    cloudbuild_summary = None
    nomos_summary = None

    if git_summary.status == GitStatus.PUSHED:
      cloudbuild_summary = get_cloudbuild_summary(parameters)

    if cloudbuild_summary != None and cloudbuild_summary.status == BuildStatusSummary.BUILD_SUCCESS:
      if not executed:
        get_kubectl_creds(parameters)

      nomos_summary = get_nomos_summary(parameters, cloudbuild_summary.commit_sha)

    print_results(PipelineSummary(git=git_summary, cloudbuild=cloudbuild_summary, nomos=nomos_summary))
    executed = True
    time.sleep(1)

if __name__ == "__main__":
  main()
