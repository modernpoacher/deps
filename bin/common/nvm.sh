#!/bin/bash

NVM=~/.nvm

if [[ -f "$NVM/nvm.sh" ]];
then
  source $NVM/nvm.sh
else
  NVM=$(brew --prefix nvm)

  if [[ -f "$NVM/nvm.sh" ]];
  then
    source $NVM/nvm.sh
  fi
fi

VERSION=$(nvm --version)

if [[ -z "$VERSION" ]];
then
  echo NVM not installed
else
  echo NVM version $VERSION installed

  set +e

  nvm use &> /dev/null

  if [[ $? != 0 ]];
  then
    echo NVM not configured
  else
    echo NVM version $VERSION configured
  fi
fi
