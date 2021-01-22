#!/bin/bash

function report {
  echo
  echo "==========================="
  echo -e "\033[0;35m$1\033[0m" # $1
  echo "==========================="
  echo
}

function can_git_remote_set_head {
  [[ $(cat "$PWD/.git/refs/remotes/origin/HEAD" 2> /dev/null) =~ [-0-9a-zA-Z]*$ ]] && default_branch="${BASH_REMATCH[0]}"

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
  git remote set-head origin -a

  return $?
}

function execute {
  report "$1"

  can_git_remote_set_head "$1"

  if [[ $? = 1 ]]
  then
    git_remote_set_head

    if [[ $? = 0 ]]
    then
      echo -e "Changed the default branch for \033[0;35m$1\033[0m"

      return 1
    else
      echo -e "Failed to change the default branch for \033[0;35m$1\033[0m"

      return 0
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
