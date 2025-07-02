#!/bin/sh

set -e
export PYTHONUNBUFFERED=1

# 1) start FastAPI in background
gunicorn app.main:app \
  -k uvicorn.workers.UvicornWorker \
  --capture-output --log-level info \
  -w 2 -b 0.0.0.0:8000 &

# 2) start Next.js standalone
cd /app
exec node server.js --port 3000 -H 0.0.0.0
