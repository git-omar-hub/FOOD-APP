#!/usr/bin/env bash
set -e

cleanup() {
  echo "Stopping all processes..."
  kill 0 2>/dev/null
  exit 0
}
trap cleanup SIGINT SIGTERM

echo "Starting Backend..."
(cd Backend && npm start) &

echo "Starting Frontend..."
(cd Frontend && BROWSER=none npm start) &

echo "Starting Admin..."
(cd Admin && npm run dev) &

wait
