#!/bin/zsh

cd "$HOME"

if [ -f .zshrc ];
then
  source .zshrc
fi

export ZSH_AUTH_SOCK=$ZSH_AUTH_SOCK
export PATH=$PATH
export HOME=$HOME

exit 0
