#!/bin/zsh

cd "$HOME"

if [ -f .zshrc ];
then
  source .zshrc

  export ZSH_AUTH_SOCK=$ZSH_AUTH_SOCK
  export PATH=$PATH
  export HOME=$HOME
fi

cd "$CWD"
