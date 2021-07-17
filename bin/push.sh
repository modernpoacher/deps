#!/bin/bash

EXP="[-0-9a-zA-Z]*$"

function report {
  echo
  echo "==========================="
  echo -e "\033[0;35m$1\033[0m" # $1
  echo "==========================="
  echo
}

function checkout_default_branch {
  DIR=$(echo "$PWD" | sed 's/\\/\//g' | sed 's/://') && [[ $(cat "$DIR/.git/refs/remotes/origin/HEAD" 2> /dev/null) =~ $EXP ]] && default_branch="${BASH_REMATCH[0]}"

  if [ -z "$default_branch" ]
  then
    echo -e "Failed to identify the default branch for \033[0;35m$1\033[0m"

    return 1
  else
    echo -e "The default branch for \033[0;35m$1\033[0m is '$default_branch'"

    git checkout $default_branch 2> /dev/null

    if [[ $? != 0 ]]
    then
      echo -e "Failed to checkout the default branch for \033[0;35m$1\033[0m" # "$d is not configured for Git"

      return 1
    fi
  fi

  return 0
}

function update {
  git pull
  git push
  git push --tags
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
