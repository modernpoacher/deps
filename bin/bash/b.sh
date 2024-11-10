#!/bin/bash

cd "$HOME"

if [ -f .bashrc ];
then
  source .bashrc
fi

export ZSH_AUTH_SOCK=$ZSH_AUTH_SOCK
export PATH=$PATH
export HOME=$HOME

exit 0
