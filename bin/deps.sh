#!/bin/bash

# [ -L "$0" ] && DIR="$(realpath "$(dirname "$(readlink -f "$0")")")" || DIR="$(realpath "$(dirname "$0")")"

DIR="$(realpath "$(dirname "$(readlink -f "$0")")")"
BIN="$DIR"

source "$BIN/common.sh"

source_home "$BIN"

node "$BIN/deps.mjs" "$@"
