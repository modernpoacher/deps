#!/bin/zsh

export PATH=/usr/local/bin:$PATH

EXP="[-0-9a-zA-Z]*$"

DIR=$(echo "$PWD" | sed 's/\\/\//g' | sed 's/://') && [[ $(cat "$DIR/.git/refs/remotes/origin/HEAD" 2> /dev/null) =~ $EXP ]] && echo "${BASH_REMATCH[0]}"

exit 0
