#!/bin/bash

DIR="$(dirname "$0")"

export NODE_OPTIONS='--disable-warning=ExperimentalWarning'

if [ -f "$HOME/.zshrc" ];
then
  zsh "$DIR/z.sh"
else
  if [ -f "$HOME/.bashrc" ];
  then
    bash "$DIR/b.sh"
  fi
fi

echo SSH auth sock is $SSH_AUTH_SOCK
echo Home is $HOME
echo Path is $PATH

EXP="[-0-9a-zA-Z]*$"

function report {
  local directory_name

  directory_name="${1##*/}" # directory_name="$(basename "$(git rev-parse --show-toplevel)")"

  echo
  echo "==========================="
  echo -e "\033[0;35m$directory_name\033[0m" # $1
  echo "==========================="
  echo
}

function has_git {
  local directory_name

  directory_name="${1##*/}" # directory_name="$(basename "$(git rev-parse --show-toplevel)")"

  git_status=$(git status 2> /dev/null)

  if [[ $? != 0 ]]
  then
    echo -e "\033[0;35m$directory_name\033[0m is not configured for Git" # "$1 is not configured for Git"

    return 1
  else
    echo -e "\033[0;35m$directory_name\033[0m is configured for Git" # "$1 is configured for Git"

    return 0
  fi
}

function is_clean {
  local directory_name

  directory_name="${1##*/}" # directory_name="$(basename "$(git rev-parse --show-toplevel)")"

  git_status=$(git status 2> /dev/null)

  if [[ ! "$git_status" =~ "nothing to commit" ]]
  then
    echo -e "\033[0;35m$directory_name\033[0m is not clean" # "$1 is not clean"

    return 1
  else
    echo -e "\033[0;35m$directory_name\033[0m is clean" # "$1 is clean"

    return 0
  fi
}

function get_default_branch {
  DIR=$(echo "$PWD" | sed 's/\\/\//g' | sed 's/://') && [[ $(cat "$DIR/.git/refs/remotes/origin/HEAD" 2> /dev/null) =~ $EXP ]] && default_branch="${BASH_REMATCH[0]}"

  echo $default_branch
}

function get_current_branch {
  current_branch=$(git rev-parse --abbrev-ref HEAD)

  echo $current_branch
}

function can_git_remote_set_head {
  local directory_name

  directory_name="${1##*/}" # directory_name="$(basename "$(git rev-parse --show-toplevel)")"

  DIR=$(echo "$PWD" | sed 's/\\/\//g' | sed 's/://') && [[ $(cat "$DIR/.git/refs/remotes/origin/HEAD" 2> /dev/null) =~ $EXP ]] && default_branch="${BASH_REMATCH[0]}"

  if [ -z "$default_branch" ]
  then
    default_branch=$(git remote show origin | awk '/HEAD branch/ {print $NF}')

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

    return 0
  fi
}

function git_remote_set_head {
  git remote set-head origin -a 2> /dev/null

  return $?
}

function execute {
  report "$1"

  has_git "$1"

  local directory_name

  directory_name="${1##*/}" # directory_name="$(basename "$(git rev-parse --show-toplevel)")"

  if [[ $? = 0 ]]
  then
    is_clean "$1"

    if [[ $? = 0 ]]
    then
      can_git_remote_set_head "$1"

      if [[ $? = 0 ]]
      then
        default_branch=$(get_default_branch)

        current_branch=$(get_current_branch)

        if [[ $default_branch == $current_branch ]];
        then
          echo -e "The current branch for \033[0;35m$directory_name\033[0m is '$default_branch'"

          return 0
        else
          git_remote_set_head "$1"

          if [[ $? = 1 ]]
          then
            echo -e "Failed to change current branch for \033[0;35m$directory_name\033[0m to '$default_branch'"

            return 1
          else
            echo -e "The current branch for \033[0;35m$directory_name\033[0m is '$default_branch'"

            return 0
          fi
        fi
      fi
    fi
  fi
}

TOP=$PWD

echo
echo -e "\033[0;32mStarting \`deps-head\` ...\033[0m" # "Starting ..."

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
