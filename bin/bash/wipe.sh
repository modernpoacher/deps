#!/bin/bash

DIR="$(realpath "$(dirname "$0")")"
BIN="$(realpath "$DIR/..")"

source "$BIN/common.sh"

source_home "$BIN"

# echo SSH auth sock is $SSH_AUTH_SOCK
# echo Home is $HOME
# echo Path is $PATH

# echo DIR is $DIR
# echo BIN is $BIN

EXP="[-0-9a-zA-Z]*$"

function has_git {
  [ ! -z $(git status 2> /dev/null) ]
}

function report {
  local directory_name

  directory_name="${1##*/}" # directory_name="$(basename "$(git rev-parse --show-toplevel)")"

  echo
  echo "==========================="
  echo -e "\033[0;35m$directory_name\033[0m" # $1
  echo "==========================="
  echo
}

function checkout_default_branch {
  local directory_name

  directory_name="${1##*/}" # directory_name="$(basename "$(git rev-parse --show-toplevel)")"

  DIR=$(echo "$PWD" | sed 's/\\/\//g' | sed 's/://') && [[ $(cat "$DIR/.git/refs/remotes/origin/HEAD" 2> /dev/null) =~ $EXP ]] && default_branch="${BASH_REMATCH[0]}"

  if [ -z "$default_branch" ]
  then
    default_branch=$(git remote show origin 2> /dev/null | awk '/HEAD branch/ {print $NF}')

    if [ -z "$default_branch" ]
    then
      echo -e "Failed to identify the default branch for \033[0;35m$directory_name\033[0m"

      return 1
    else
      echo -e "The default branch for \033[0;35m$directory_name\033[0m is '$default_branch'"

      return 0
    fi
  else
    echo -e "The default branch for \033[0;35m$directory_name\033[0m is '$default_branch'"

    git checkout $default_branch 2> /dev/null

    if [[ $? != 0 ]]
    then
      echo -e "Failed to checkout the default branch for \033[0;35m$directory_name\033[0m" # "$d is not configured for Git"

      return 1
    fi
  fi

  return 0
}

function update {
  git pull
  git branch --merged | egrep -v "(^\*|$default_branch)" | xargs git branch -d
  git remote prune origin
  git gc --aggressive --prune=now
}

function execute {
  report "$1"

  checkout_default_branch "$1"

  if [[ $? = 0 ]]
  then
    update
  fi

  return 0
}

TOP=$PWD

echo
echo -e "\033[0;32mStarting\033[0m deps-wipe \033[0;32m...\033[0m" # "Starting ..."

for flag in "$@";
do
  shift
  case "$flag" in
    --path=*|-p=*)
      set -- "$@" '-p' "${flag#*=}"
      ;;
    --path|-p)
      set -- "$@" '-p' "${1}"
      ;;
    *)
      set -- "$@" "$flag"
      ;;
  esac
done

while getopts "p:" flag;
do
  case "${flag}" in
    p)
      path="$OPTARG"
      ;;
    *)
      # Ignoring "$flag"
      ;;
  esac
done

if [[ $# -eq 0 ]] # [ -z "$path" ] && [ -z "$from" ] && [ -z "$only" ] # NO "$path" and NO "$from" and NO "$only"
then
  for d in *
  do
    if [ -d "$d" ]
    then
      cd "$d"

      execute "$PWD"

      cd ..
    fi
  done
else
  if [ ! -z "$path" ]
  then
    cd "$path"

    if [ -d "$PWD/.git" ];
    then
      execute "$PWD"
    else
      for d in *
      do
        if [ -d "$d" ]
        then
          cd "$d"

          execute "$PWD"

          cd ..
        fi
      done
    fi

    cd "$TOP"
  fi
fi

echo
echo -e "\033[0;32mDone.\033[0m" # "Done."
echo

exit 0
