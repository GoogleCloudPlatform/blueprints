from colorize import Color, colorize
from cloudbuild import BuildStatusSummary

def get_nomos_formatted_text(nomos_status):
  NOMOS_STATUS_COLORIZED = {
    "SYNCED": colorize("SYNCED", Color.GREEN),
    "ERROR": colorize("ERROR", Color.RED),
    "NOT INSTALLED": colorize("NOT INSTALLED", Color.RED),
    "NOT CONFIGURED": colorize("NOT CONFIGURED", Color.RED),
    "PENDING": colorize("PENDING", Color.BLUE)
  }

  return NOMOS_STATUS_COLORIZED.get(nomos_status, nomos_status)

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
    print("\n{} {}\n".format(colorize("Nomos status:", Color.BOLD), get_nomos_formatted_text(nomos_summary.status)))
    # TODO(jcwc): We can probably add the latest commit SHA to the cloud build output and parse it here to determine if last synced token reflects the latest state
    print("{} {}\n".format(colorize("Nomos last synced token:", Color.BOLD), nomos_summary.last_synced_token))
    print("{}\n{}\n".format(colorize("Nomos logs:", Color.BOLD), nomos_summary.logs))

# Pretty prints the final results of the pipeline status summarized by info
# extracted from various sources.
def print_results(pipeline_summary):
  print("\n============ RESULTS ===============\n")
  print_git_info(pipeline_summary.git)
  print_cloudbuild_info(pipeline_summary.cloudbuild)
  print_nomos_info(pipeline_summary.nomos)

  print(colorize("\nOverall pipeline summary:", Color.BOLD))
  print("Git [{}] --> Build [{}] --> Sync to cluster [{}] --> Actuated [{}]".format(
    pipeline_summary.git.status.value,
    pipeline_summary.cloudbuild.status.value if pipeline_summary.cloudbuild != None else BuildStatusSummary.UNKNOWN.value,
    get_nomos_formatted_text(pipeline_summary.nomos.status if pipeline_summary.nomos != None else "Unknown"),
    "Unknown" # TODO(jcwc): Figure out how to add actuated state
  ))
  print("=======================================\n")
