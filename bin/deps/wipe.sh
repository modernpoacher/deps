#!/bin/bash

DIR="$(realpath "$(dirname "$(readlink -f "$0")")")"
BIN="$(realpath "$DIR/..")"

source "$BIN/common.sh"

source_home "$BIN"

node "$BIN/node/wipe.mjs" "$@"
