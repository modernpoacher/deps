#!/bin/bash

cd "$HOME"

if [ -f .bashrc ];
then
  source .bashrc

  export ZSH_AUTH_SOCK=$ZSH_AUTH_SOCK
  export PATH=$PATH
  export HOME=$HOME
fi

exit 0
