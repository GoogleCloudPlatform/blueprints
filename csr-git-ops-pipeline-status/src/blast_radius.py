import re
import collections

BlastRadius = collections.namedtuple('BlastRadius', ['additions', 'deletions', 'modifications', 'logs'])
ResourceIdentifier = collections.namedtuple('ResourceIdentifier', ['name', 'namespace', 'kind'])

OVERALL_SUMMARY_REGEX = "\d+ - new resources added, \d+ - existing resources modified, \d+ - existing resources deleted"
EVALUATION_REGEX = '"Evaluate hydrated changes":'
KIND_HEADER_REGEX = "(?P<resources>\d+) - (?P<kind>\w+) (?P<operation>addition|deletion|modification)\(s\)$"
NAMESPACE_REGEX = "'(?P<namespace>[a-zA-Z0-9-\.]+)' namespace"
NAME_REGEX = EVALUATION_REGEX + " +- (?P<name>[a-zA-Z0-9-\.]{0,253})"

def get_blast_radius(cb_log_entries):
  kind = ""
  namespace = ""
  remaining_resources = 0
  operation = ""

  eval_status = {
    "addition": [],
    "modification": [],
    "deletion": []
  }

  eval_entries = [entry for entry in cb_log_entries if re.search(EVALUATION_REGEX, entry) != None]
  logs = ""
  record_logs = False

  for entry in eval_entries:
    if re.search(OVERALL_SUMMARY_REGEX, entry) != None: record_logs = True
    if record_logs: logs += entry + "\n"

    if remaining_resources == 0:
      r = re.search(KIND_HEADER_REGEX, entry)
      if r == None: continue
      remaining_resources = int(r.group('resources'))
      kind = r.group('kind')
      operation = r.group('operation')
    else:
      namespace_matcher = re.search(NAMESPACE_REGEX, entry)
      name_matcher = re.search(NAME_REGEX, entry)

      if namespace_matcher != None:
        namespace = namespace_matcher.group('namespace')
      elif name_matcher != None:
        eval_status[operation].append(ResourceIdentifier(name=name_matcher.group('name'), namespace=namespace, kind=kind))
        remaining_resources -= 1

  return BlastRadius(additions=eval_status["addition"], deletions=eval_status["deletion"], modifications=eval_status["modification"], logs=logs)

