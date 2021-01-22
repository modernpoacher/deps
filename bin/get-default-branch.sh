#!/bin/bash

[[ $(cat .git/refs/remotes/origin/HEAD) =~ [-0-9a-zA-Z]*$ ]] && echo "${BASH_REMATCH[0]}"

exit 0

# INPUT=$(cat .git/refs/remotes/origin/HEAD)
# PATTERN="[-0-9a-zA-Z]*$"

# echo Input is \"$INPUT\"

# [[ $INPUT =~ $PATTERN ]] && DEFAULT_BRANCH="${BASH_REMATCH[0]}"

# if [ -z "$DEFAULT_BRANCH" ]
# then
#   echo Failed to identify the default branch
#   exit 1
# else
#   echo Default branch is \"$DEFAULT_BRANCH\"
#   exit 0
# fi
