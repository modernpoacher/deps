#!/bin/bash

DIR="$(dirname $(readlink -f "$0"))"
BIN="$(realpath "$DIR/..")"

echo DIR is $DIR
echo BIN is $BIN

NODE_OPTIONS="${NODE_OPTIONS:---disable-warning=ExperimentalWarning}"

export NODE_OPTIONS=$NODE_OPTIONS # export NODE_OPTIONS='--disable-warning=ExperimentalWarning'

if [ -f "$HOME/.zshrc" ];
then
  zsh "$BIN/z.sh"
else
  if [ -f "$HOME/.bashrc" ];
  then
    bash "$BIN/b.sh"
  fi
fi

node "$BIN/node/install.mjs" "$@"
