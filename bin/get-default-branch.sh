#!/bin/bash

[[ $(cat .git/refs/remotes/origin/HEAD) =~ [-0-9a-zA-Z]*$ ]] && echo "${BASH_REMATCH[0]}"

exit 0
