#!/bin/bash

# [ -L "$0" ] && DIR="$(realpath "$(dirname "$(readlink -f "$0")")")" || DIR="$(realpath "$(dirname "$0")")"

DIR="$(realpath "$(dirname "$(readlink -f "$0")")")"
BIN="$DIR"

source "$DIR/common.sh"

source_home "$DIR"

# echo SSH auth sock is $SSH_AUTH_SOCK
# echo Home is $HOME
# echo Path is $PATH

# echo DIR is $DIR
# echo BIN is $BIN

node "$DIR/deps.mjs" "$@"
