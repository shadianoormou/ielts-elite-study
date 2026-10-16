#!/bin/zsh
set -e
cd "$(dirname "$0")"
export OLLAMA_MODEL="${OLLAMA_MODEL:-llama3.2:3b}"
exec python3 server.py
