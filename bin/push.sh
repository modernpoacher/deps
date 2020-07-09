#!/bin/bash

echo
echo -e "\033[0;32mStarting ...\033[0m" # "Starting ..."

for d in *
do
  if [ -d "$d" ]
  then
    echo
    echo "==========================="
    echo -e "\033[0;35m$d\033[0m" # $d
    echo "==========================="
    echo

    cd "$d"

    git checkout master 2> /dev/null

    if [[ $? != 0 ]]
    then
      echo -e "\033[0;35m$d\033[0m is not configured for Git" # "$d is not configured for Git"
    else
      git pull
      git push
      git push --tags
    fi

    cd ..
  fi
done

echo
echo -e "\033[0;32mDone.\033[0m" # "Done."
echo

exit 0
