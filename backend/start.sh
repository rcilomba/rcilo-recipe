#!/usr/bin/env bash
set -euo pipefail

echo "Running database migrations..."
python - <<'PY'
from backend.app import create_app
from flask_migrate import upgrade
app = create_app()
with app.app_context():
    upgrade()
PY

if [ "${RUN_SEED:-}" = "1" ]; then
  echo "RUN_SEED=1 detected — importing seed data..."
  python backend/import_recipes.py
fi

echo "Starting Gunicorn..."
exec gunicorn backend.wsgi:app --bind 0.0.0.0:${PORT:-8000}
