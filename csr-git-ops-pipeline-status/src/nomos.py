import os
import re
import shutil
import subprocess
import platform

from google.cloud import storage
from google.cloud.storage.blob import Blob
import collections

NomosSummary = collections.namedtuple('NomosSummary', ['status', 'logs', 'last_synced_token'])

NOMOS_BUILD_DIR = "tmp"
NOMOS_PATH = "{}/nomos".format(NOMOS_BUILD_DIR)

NOMOS_DOWNLOAD_PATH = {
  "Darwin": "gs://config-management-release/released/latest/darwin_amd64/nomos", # MacOS
  "Linux": "gs://config-management-release/released/latest/linux_amd64/nomos", # Linux
  "Windows": "gsutil cp gs://config-management-release/released/latest/windows_amd64/nomos.exe" # Windows
}

def download_nomos(storage_client):
  if platform.system() not in NOMOS_DOWNLOAD_PATH:
    print("Your OS is not supported.")
    quit()

  blob = Blob.from_string(NOMOS_DOWNLOAD_PATH[platform.system()], storage_client)

  blob.download_to_filename(NOMOS_PATH)
  os.chmod(NOMOS_PATH, 0o755)

def extract_nomos_status(nomos_output, cluster_id):
  nomos_status_entries = nomos_output.splitlines()
  nomos_status_entries = list(filter(lambda x: 'is an invalid cluster' not in x, nomos_status_entries))
  nomos_status_entries = list(filter(lambda x: 'Failed to retrieve' not in x, nomos_status_entries))

  nomos_status_list = list(filter(lambda x: cluster_id in x, nomos_status_entries))
  nomos_status_line = nomos_status_list[0] if len(nomos_status_list) > 0 else ""
  nomos_status_array = re.split('\s+', nomos_status_line.replace('*', '').strip())

  return {
    "status": nomos_status_array[1] if len(nomos_status_array) > 1 else "CANNOT_RETRIEVE_NOMOS_STATUS",
    "last_synced_token": nomos_status_array[2] if len(nomos_status_array) > 2 else "N/A"
  }

def extract_nomos_errors(nomos_output, cluster_id):
  nomos_output = nomos_output.split("Config Management Errors:")

  if len(nomos_output) > 1:
    nomos_error_entries = nomos_output[1].splitlines()
    return '\n\n'.join(list(filter(lambda x: cluster_id in x, nomos_error_entries)))
  else:
    return ""

# This function downloads nomos and extracts the useful information pertaining
# to a set of parameters (from the main function) and returns it in a summarized
# format.
def get_nomos_summary(parameters):
  storage_client = storage.Client(parameters.project_id)

  if not os.path.exists(NOMOS_BUILD_DIR):
    os.mkdir(NOMOS_BUILD_DIR)

  # TODO(jcwc): Check if nomos client exists first and if not, download new client
  download_nomos(storage_client)

  nomos_output = ""
  cluster_id = 'gke_{}_{}_{}'.format(parameters.project_id, parameters.region, parameters.cluster_name)
  # Nomos cuts off the name after 50 chars. Truncate to match
  # TODO(jcwc): Come up with a more stable way to match name
  cluster_id = (cluster_id[-50:]) if len(cluster_id) > 50 else cluster_id
  nomos_status = {
    "status": "N/A"
  }
  max_retries = 3
  retry_count = 0

  while nomos_status["status"] == "N/A" and retry_count < max_retries:
    nomos_output = subprocess.check_output(["./{}".format(NOMOS_PATH), "status"]).decode("utf-8")
    nomos_status = extract_nomos_status(nomos_output, cluster_id)
    retry_count += 1

  status = nomos_status["status"]
  last_synced_token = nomos_status["last_synced_token"]
  logs = extract_nomos_errors(nomos_output, cluster_id)
  shutil.rmtree(NOMOS_BUILD_DIR)

  return NomosSummary(status=status, logs=logs, last_synced_token=last_synced_token)
