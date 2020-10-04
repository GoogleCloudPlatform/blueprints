import enum
import collections
import re

from colorize import Color, colorize
from google.cloud import storage
from google.cloud.devtools import cloudbuild_v1
from google.cloud.devtools.cloudbuild_v1.types import Build
from google.cloud.storage.blob import Blob
from blast_radius import get_blast_radius

CloudBuildSummary = collections.namedtuple('CloudBuildSummary', ['status', 'logs', 'logs_url', 'commit_sha', 'blast_radius'])

class BuildStatusSummary(enum.Enum):
  UNKNOWN = "Unknown"
  BUILD_PENDING = colorize("Build Pending", Color.BLUE)
  BUILD_FAILED = colorize("Build Failed", Color.RED)
  BUILD_SUCCESS = colorize("Build Success", Color.GREEN)

def get_relevant_errors(log_entries):
  logs = ""
  initial_error_found = False
  for entry in log_entries:
    if initial_error_found or "error" in entry.lower():
      initial_error_found = True
      logs += "{}\n".format(entry)
  return logs

def get_commit_sha(log_entries):
  relevant_line = [s for s in log_entries if "Latest deployment repo commit SHA" in s]

  if (len(relevant_line) != 1): return None

  result = re.search('Latest deployment repo commit SHA: ([a-zA-Z0-9]{40})', relevant_line[0])
  return None if result == None else result.group(1)

def get_cloudbuild_summary(parameters):
  storage_client = storage.Client(parameters.project_id)
  cloud_build_client = cloudbuild_v1.CloudBuildClient()

  builds = list(cloud_build_client.list_builds({
    "project_id": parameters.project_id,
    "filter": 'source.repo_source.commit_sha="{}"'.format(parameters.commit_sha)
  }))
  filtered_builds = [b for b in builds if b.substitutions["BRANCH_NAME"] == parameters.branch]
  if len(filtered_builds) == 0:
    print("Could not find build for commit sha '{}' and branch '{}'".format(parameters.commit_sha, parameters.branch))
    quit()

  build_info = filtered_builds[0]
  build_status = ""
  build_logs = ""
  blast_radius = None

  blob = Blob.from_string("{}/log-{}.txt".format(build_info.logs_bucket, build_info.id), storage_client)
  log_entries = blob.download_as_string().decode("utf-8").rstrip().splitlines()

  if build_info.status == Build.Status.STATUS_UNKNOWN.value:
    build_status = BuildStatusSummary.UNKNOWN
  elif build_info.status == Build.Status.SUCCESS.value:
    build_status = BuildStatusSummary.BUILD_SUCCESS
    blast_radius = get_blast_radius(log_entries)
    build_logs = blast_radius.logs
  elif build_info.status == Build.Status.QUEUED.value or build_info.status == Build.Status.WORKING.value:
    build_status = BuildStatusSummary.BUILD_PENDING
  else:
    build_status = BuildStatusSummary.BUILD_FAILED
    build_logs = get_relevant_errors(log_entries)

  commit_sha = get_commit_sha(log_entries)

  # Print only the last 10 lines
  build_logs = "\n".join(log_entries[-10:]) if build_logs == "" else build_logs
  return CloudBuildSummary(status=build_status, logs=build_logs, logs_url=build_info.log_url, commit_sha=commit_sha, blast_radius=blast_radius)