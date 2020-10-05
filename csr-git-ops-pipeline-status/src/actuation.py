import collections
import enum
import json
import subprocess
from colorize import Color, colorize

ActuationItem = collections.namedtuple('ActuationItem', ['status', 'message', 'reason'])
ActuationSummary = collections.namedtuple('ActuationSummary', ['status_dict', 'overall_status'])

# These are resources that don't follow the same convention as KCC/ Cork custom resources:
# containing a `status.conditions[]` field to expose progress.
#
# For now, we assume any issues with this will show up in nomos and the existence of the resource means it is updated.
# TODO(jcwc): Come up with a more programmatic way to do this rather than an allow list of resources
ABERRANT_RESOURCES = [
  "role",
  "rolebinding",
  "configmap",
  "namespace",
  "configconnectorcontext",
  "constrainttemplate"
]

class ActuationSummaryStatus(enum.Enum):
  UNKNOWN = "Unknown"
  DELETED = colorize("Deleted", Color.GREEN)
  UPDATING = colorize("Updating", Color.BLUE)
  UPDATED = colorize("Updated", Color.GREEN)
  ERROR = colorize("Error", Color.RED)

def get_key(id):
  return id.namespace + ":" + id.name + " ({})".format(id.kind)

def get_status_of_modify_or_add(k8s_object):
  status = ActuationSummaryStatus.UNKNOWN
  reason = ""
  message = ""

  if "status" in k8s_object and "conditions" in k8s_object["status"]:
    reason = k8s_object["status"]["conditions"][0]["reason"]
    message = k8s_object["status"]["conditions"][0]["message"]

    if k8s_object["status"]["conditions"][0]["type"] == "Ready":
      status = ActuationSummaryStatus.UPDATED if k8s_object["status"]["conditions"][0]["status"] == "True" else ActuationSummaryStatus.ERROR
    elif reason == "Updating":
      status = ActuationSummaryStatus.UPDATING

  return ActuationItem(status=status, message=message, reason=reason)

def get_status_of_delete(message):
  if "(NotFound)" in message:
    return ActuationItem(status=ActuationSummaryStatus.DELETED, message=None, reason=None)
  else:
    return ActuationItem(status=ActuationSummaryStatus.UNKNOWN, message=message, reason=None)

def get_overall_status(status_dict):
  status = ActuationSummaryStatus.UNKNOWN
  immediateStates = [
    ActuationSummaryStatus.ERROR,
    ActuationSummaryStatus.UPDATING
  ]

  for key in status_dict:
    if status_dict[key].status in immediateStates:
      return status_dict[key].status

  return ActuationSummaryStatus.UPDATED

def get_actuation_summary(blast_radius):
  status_dict = {}
  stdout = ""

  # Check for modifications and additions status
  for change in blast_radius.additions + blast_radius.modifications:
    try:
      stdout = subprocess.check_output(["kubectl", "-n", change.namespace, "get", change.kind, change.name, "-o=json"], stderr=subprocess.STDOUT).decode("utf-8")
    except subprocess.CalledProcessError as e:
      status_dict[get_key(change)] = ActuationItem(status=ActuationSummaryStatus.ERROR, message=str(e.output), reason=None)
      continue

    if change.kind.lower() in ABERRANT_RESOURCES:
      status_dict[get_key(change)] = ActuationItem(status=ActuationSummaryStatus.UPDATED, message=None, reason=None)
    else:
      k8s_object = json.loads(stdout)
      status_dict[get_key(change)] = get_status_of_modify_or_add(k8s_object)

  # Check for deletion items and make sure they've been removed
  for deletion in blast_radius.deletions:
    try:
      stdout = subprocess.check_output(["kubectl", "-n", deletion.namespace, "get", deletion.kind, deletion.name], stderr=subprocess.STDOUT).decode("utf-8")
    except subprocess.SubprocessError as e:
      stdout = str(e.output)
    status_dict[get_key(deletion)] = get_status_of_delete(stdout)

  # Get an overall summary based on the overall state
  return ActuationSummary(status_dict=status_dict, overall_status=get_overall_status(status_dict))
