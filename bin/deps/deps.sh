#!/bin/bash

DIR="$(dirname "$0")"

NODE_OPTIONS="${NODE_OPTIONS:---disable-warning=ExperimentalWarning}"

export NODE_OPTIONS=$NODE_OPTIONS # export NODE_OPTIONS='--disable-warning=ExperimentalWarning'

if [ -f "$HOME/.zshrc" ];
then
  zsh "$DIR/z.sh"
else
  if [ -f "$HOME/.bashrc" ];
  then
    bash "$DIR/b.sh"
  fi
fi

BIN="$(dirname "$DIR/../..")"
node "$BIN/node/deps.mjs"
