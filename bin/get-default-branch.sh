#!/bin/bash

export PATH=/usr/local/bin:$PATH

# eval `ssh-agent`

if [ $(ps ax | grep ssh-agent | wc -l) -eq 0 ] ; then
  eval $(ssh-agent -s)
  trap "ssh-agent -k" exit
fi

EXP="[-0-9a-zA-Z]*$"

DIR=$(echo "$PWD" | sed 's/\\/\//g' | sed 's/://') && [[ $(cat "$DIR/.git/refs/remotes/origin/HEAD" 2> /dev/null) =~ $EXP ]] && echo "${BASH_REMATCH[0]}"

exit 0
