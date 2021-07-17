#!/bin/bash

EXP="[-0-9a-zA-Z]*$"

function report {
  echo
  echo "==========================="
  echo -e "\033[0;35m$1\033[0m" # $1
  echo "==========================="
  echo
}

function has_git {
  git_status=$(git status 2> /dev/null)

  if [[ $? != 0 ]]
  then
    echo -e "\033[0;35m$1\033[0m is not configured for Git" # "$1 is not configured for Git"

    return 1
  else
    echo -e "\033[0;35m$1\033[0m is configured for Git" # "$1 is configured for Git"

    return 0
  fi
}

function is_clean {
  git_status=$(git status 2> /dev/null)

  if [[ ! "$git_status" =~ "nothing to commit" ]]
  then
    echo -e "\033[0;35m$1\033[0m is not clean" # "$1 is not clean"

    return 1
  else
    echo -e "\033[0;35m$1\033[0m is clean" # "$1 is clean"

    return 0
  fi
}

function get_default_branch {
  [[ $(cat "$PWD/.git/refs/remotes/origin/HEAD" 2> /dev/null) =~ $EXP ]] && default_branch="${BASH_REMATCH[0]}"

  echo $default_branch
}

function get_current_branch {
  current_branch=$(git rev-parse --abbrev-ref HEAD)

  echo $current_branch
}

function can_git_remote_set_head {
  [[ $(cat "$PWD/.git/refs/remotes/origin/HEAD" 2> /dev/null) =~ $EXP ]] && default_branch="${BASH_REMATCH[0]}"

  if [ -z "$default_branch" ]
  then
    echo -e "Failed to identify the default branch for \033[0;35m$1\033[0m"

    return 1
  else
    echo -e "The default branch for \033[0;35m$1\033[0m is '$default_branch'"

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
          echo -e "The current branch for \033[0;35m$1\033[0m is '$default_branch'"

          return 0
        else
          git_remote_set_head "$1"

          if [[ $? = 1 ]]
          then
            echo -e "Failed to change current branch for \033[0;35m$1\033[0m to '$default_branch'"

            return 1
          else
            echo -e "The current branch for \033[0;35m$1\033[0m is '$default_branch'"

            return 0
          fi
        fi
      fi
    fi
  fi
}

HOME=$PWD

echo
echo -e "\033[0;32mStarting ...\033[0m" # "Starting ..."

for i in "$@"
do
  case $i in
    path=*|-p=*|--path=*)
    path="${i#*=}"
    ;;
    *)
    # unknown option
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

      execute "$d"

      cd ..
    fi
  done
else
  if [ ! -z "$path" ]
  then
    cd "$path"

    for d in *
    do
      if [ -d "$d" ]
      then
        cd "$d"

        execute "$d"

        cd ..
      fi
    done

    cd "$HOME"
  fi
fi

echo
echo -e "\033[0;32mDone.\033[0m" # "Done."
echo

exit 0
