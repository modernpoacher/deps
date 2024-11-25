#!/bin/bash

DIR="$(realpath "$(dirname "$(readlink -f "$0")")")"
BIN="$(realpath "$DIR/..")"

source "$BIN/common.sh"

source_home "$BIN"

# echo SSH auth sock is $SSH_AUTH_SOCK
# echo Home is $HOME
# echo Path is $PATH

# echo DIR is $DIR
# echo BIN is $BIN

node "$BIN/node/push.mjs" "$@"
