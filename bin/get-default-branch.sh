#!/bin/bash

EXP="[-0-9a-zA-Z]*$"

[[ $(cat .git/refs/remotes/origin/HEAD) =~ $EXP ]] && echo "${BASH_REMATCH[0]}"

exit 0
