#!/bin/bash

function report {
  echo
  echo "==========================="
  echo -e "\033[0;35m$1\033[0m" # $1
  echo "==========================="
  echo
}

function execute {
  report "$1"

  [[ $(cat "$PWD/.git/refs/remotes/origin/HEAD" 2> /dev/null) =~ [-0-9a-zA-Z]*$ ]] && default_branch="${BASH_REMATCH[0]}"

  if [ -z "$default_branch" ]
  then
    echo -e "Failed to identify the default branch"

    return 1
  else
    echo -e "Default branch is '$default_branch'"

    git checkout $default_branch 2> /dev/null

    if [[ $? != 0 ]]
    then
      echo -e "\033[0;35m$1\033[0m is not configured for Git" # "$d is not configured for Git"
    else
      git pull
      git push
      git push --tags
    fi

    return 0
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
