from colorize import Color, colorize
from cloudbuild import BuildStatusSummary
from actuation import ActuationSummaryStatus

def get_nomos_status_formatted_text(nomos_status):
  NOMOS_STATUS_COLORIZED = {
    "SYNCED": colorize("SYNCED", Color.GREEN),
    "ERROR": colorize("ERROR", Color.RED),
    "NOT INSTALLED": colorize("NOT INSTALLED", Color.RED),
    "NOT CONFIGURED": colorize("NOT CONFIGURED", Color.RED),
    "PENDING": colorize("PENDING", Color.BLUE)
  }

  return NOMOS_STATUS_COLORIZED.get(nomos_status, nomos_status)

def get_nomos_up_to_date_text(up_to_date):
  if up_to_date == None:
    return ""
  elif up_to_date:
    return colorize("Up to date", Color.GREEN)
  else:
    return colorize("Out of date", Color.RED)

def print_git_info(git_summary):
  print("{} {}\n".format(colorize("Git status:", Color.BOLD), git_summary.status.value))

def print_cloudbuild_info(cloudbuild_summary):
  if cloudbuild_summary != None:
    print("{} {}\n".format(colorize("Build status:", Color.BOLD), cloudbuild_summary.status.value))
    print("{}\n{}\n".format(colorize("Build logs:", Color.BOLD), cloudbuild_summary.logs))
    print(colorize("See your build results at the URL below:", Color.BOLD))
    print(cloudbuild_summary.logs_url)

def print_nomos_info(nomos_summary):
  if nomos_summary != None:
    status = get_nomos_status_formatted_text(nomos_summary.status)
    last_synced_token = nomos_summary.last_synced_token

    if nomos_summary.up_to_date != None:
      last_synced_token += " ({})".format(get_nomos_up_to_date_text(nomos_summary.up_to_date))

    print("\n{} {}\n".format(colorize("Nomos status:", Color.BOLD), status))
    print("{} {}\n".format(colorize("Nomos last synced token:", Color.BOLD), last_synced_token))

    if nomos_summary.logs != None and nomos_summary.logs != "":
      print("{}\n{}\n".format(colorize("Nomos logs:", Color.BOLD), nomos_summary.logs))

def print_actuation_info(actuation_summary):
  if actuation_summary != None:
    status_dict = actuation_summary.status_dict

    if len(status_dict) > 0:
      print(colorize("Actuation status:", Color.BOLD))

    for key in status_dict:
      print("{} - {}".format(key, status_dict[key].status.value))

      if status_dict[key].reason != None:
        print("  Reason: " + str(status_dict[key].reason))
      if status_dict[key].message != None:
        print("  Message: " + str(status_dict[key].message))
        print("")


# Pretty prints the final results of the pipeline status summarized by info
# extracted from various sources.
def print_results(pipeline_summary):
  print("\n============ RESULTS ===============\n")
  print_git_info(pipeline_summary.git)
  print_cloudbuild_info(pipeline_summary.cloudbuild)
  print_nomos_info(pipeline_summary.nomos)
  print_actuation_info(pipeline_summary.actuation)

  nomos_status = "Unknown"

  if pipeline_summary.nomos:
    nomos_up_to_date = pipeline_summary.nomos.up_to_date
    nomos_status = get_nomos_up_to_date_text(nomos_up_to_date) if nomos_up_to_date != None else get_nomos_status_formatted_text(pipeline_summary.nomos.status)

  print(colorize("\nOverall pipeline summary:", Color.BOLD))
  print("Git [{}] --> Build [{}] --> Sync to cluster [{}] --> Actuated [{}]".format(
    pipeline_summary.git.status.value,
    pipeline_summary.cloudbuild.status.value if pipeline_summary.cloudbuild != None else "Unknown",
    nomos_status,
    pipeline_summary.actuation.overall_status.value if pipeline_summary.actuation != None else "Unknown"
  ))
  print("=======================================\n")
