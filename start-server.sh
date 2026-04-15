#!/bin/bash
PORT=${PORT:-4323}
cd "$(dirname "$0")"
exec /usr/bin/python3 -m http.server $PORT
