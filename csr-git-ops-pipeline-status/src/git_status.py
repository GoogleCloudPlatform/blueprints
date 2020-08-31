import enum

import git

from colorize import Color, colorize
import collections

GitSummary = collections.namedtuple('GitSummary', ['status'])

class GitStatus(enum.Enum):
  PENDING_PUSH = colorize("Pending Push", Color.RED)
  PUSHED = colorize("Pushed", Color.GREEN)

# Retrieves a git summary from the repo requested in the parameters of the main
# function. Summary contains info about whether the current commit has been
# pushed or not.
def get_git_summary(parameters):
  g = git.Git(parameters.git_repo)
  hexshas = g.log('origin/{branch}..{branch}'.format(branch=parameters.branch), '--pretty=%H').splitlines()
  status = GitStatus.PENDING_PUSH if parameters.commit_sha in hexshas else GitStatus.PUSHED
  return GitSummary(status=status)
