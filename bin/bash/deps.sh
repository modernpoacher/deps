#!/bin/bash
#
# https://google.github.io/styleguide/shellguide.html#s7-naming-conventions

export PATH=/usr/local/bin:$PATH

EXP="[-0-9a-zA-Z]*$"

function update {
  if [ $(ps ax | grep ssh-agent | wc -l) -eq 0 ];
then
  eval $(ssh-agent -s)
  trap "ssh-agent -k" exit
fi # eval "$(ssh-agent -s)" # eval $(ssh-agent) 1> /dev/null
  ssh -vT git@github.com
  git checkout $default_branch
  git pull

  rm -rf node_modules package-lock.json
  npm i --registry https://registry.npmjs.org
  deps --registry https://registry.npmjs.org

  git add package.json package-lock.json
  git commit -m "Updated \`package.json\` &/ \`package-lock.json\`"
  git push
  git push --tags
  # eval $(ssh-agent -k) 1> /dev/null
}

function can_update {
  local directory_name

  directory_name="${1##*/}" # directory_name="$(basename "$(git rev-parse --show-toplevel)")"

  git_status=$(git status 2> /dev/null)

  if [[ $? != 0 ]]
  then
    echo -e "\033[0;35m$directory_name\033[0m is not configured for Git" # "$1 is not configured for Git"

    return 1
  else
    if [[ ! "$git_status" =~ "nothing to commit" ]]
    then
      echo -e "\033[0;35m$directory_name\033[0m has changes to commit" # "$1 has changes to commit"

      return 1
    fi
  fi

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

function report {
  local directory_name

  directory_name="${1##*/}" # directory_name="$(basename "$(git rev-parse --show-toplevel)")"

  echo
  echo "==========================="
  echo -e "\033[0;35m$directory_name\033[0m" # $1
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
echo -e "\033[0;32mStarting \`deps\` ...\033[0m" # "Starting ..."

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
    --from=*|-f=*)
      set -- "$@" '-f' "${flag#*=}"
      ;;
    --from|-f)
      set -- "$@" '-f' "${1}"
      ;;
    --only=*|-o=*)
      set -- "$@" '-o' "${flag#*=}"
      ;;
    --only|-o)
      set -- "$@" '-o' "${1}"
      ;;
    *)
      set -- "$@" "$flag"
      ;;
  esac
done

while getopts "p:f:o:" flag;
do
  case "${flag}" in
    p)
      path="$OPTARG"
      ;;
    f)
      from="$OPTARG"
      ;;
    o)
      only="$OPTARG"
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

            execute "$PWD"

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

              execute "$PWD"

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
