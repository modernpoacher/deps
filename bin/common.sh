#!/bin/bash
#
# https://google.github.io/styleguide/shellguide.html#s7-naming-conventions

NODE_OPTIONS="${NODE_OPTIONS:---disable-warning=ExperimentalWarning}"

export NODE_OPTIONS=$NODE_OPTIONS # export NODE_OPTIONS='--disable-warning=ExperimentalWarning'

source_home () {
  local BIN=$1

  if [ -f "$HOME/.zshrc" ];
  then
    zsh "$BIN/common/z.sh"
  else
    if [ -f "$HOME/.bashrc" ];
    then
      bash "$BIN/common/b.sh"
    fi
  fi
}

export -f source_home
