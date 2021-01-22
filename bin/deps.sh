#!/bin/bash
#
# https://google.github.io/styleguide/shellguide.html#s7-naming-conventions

function update {
  git checkout $default_branch

  git pull

  rm -rf node_modules package-lock.json
  npm i --registry https://registry.npmjs.org
  deps --registry https://registry.npmjs.org

  git add package.json package-lock.json
  git commit -m 'Updated `package.json` &/ `package-lock.json`'

  git push
}

function can_update {
  git_status=$(git status 2> /dev/null)

  if [[ $? != 0 ]]
  then
    echo -e "\033[0;35m$1\033[0m is not configured for Git" # "$1 is not configured for Git"

    return 1
  else
    if [[ ! "$git_status" =~ "nothing to commit" ]]
    then
      echo -e "\033[0;35m$1\033[0m has changes to commit" # "$1 has changes to commit"

      return 1
    fi
  fi

  [[ $(cat "$PWD/.git/refs/remotes/origin/HEAD" 2> /dev/null) =~ [-0-9a-zA-Z]*$ ]] && default_branch="${BASH_REMATCH[0]}"

  if [ -z "$default_branch" ]
  then
    echo -e "Failed to identify the default branch"

    return 1
  else
    echo -e "Default branch is '$default_branch'"

    return 0
  fi
}

function report {
  echo
  echo "==========================="
  echo -e "\033[0;35m$1\033[0m" # $1
  echo "==========================="
  echo
}

function execute {
  report "$1"

  can_update "$1"

  if [[ $? = 0 ]]
  then
    update "$1"
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
    from=*|-f=*|--from=*)
    from="${i#*=}"
    ;;
    only=*|-o=*|--only=*)
    only="${i#*=}"
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
  else
    if [ ! -z "$from" ]
    then
      for d in *
      do
        [[ "$d" = "$from" ]] && here=true

        if [[ "$here" = true ]]
        then
          if [ -d "$d" ]
          then
            cd "$d"

            execute "$d"

            cd ..
          fi
        fi
      done
    else
      if [ ! -z "$only" ]
      then
        for d in *
        do
          if [[ "$d" = "$only" ]]
          then
            if [ -d "$d" ]
            then
              cd "$d"

              execute "$d"

              cd ..
            fi
          fi
        done
      fi
    fi
  fi
fi

echo
echo -e "\033[0;32mDone.\033[0m" # "Done."
echo

exit 0
