Deploy instructions for backend

1. Ensure `requirements.txt` is up-to-date (Flask, Flask-SQLAlchemy, Flask-Migrate, Flask-Cors, psycopg[binary], python-dotenv, gunicorn).
2. Add the repository to your Render or Railway account and create a new Web Service.
   - Build command: `pip install -r requirements.txt`
   - Start command: `gunicorn wsgi:app`
3. Provision a PostgreSQL instance (Render/Railway) and copy the `DATABASE_URL` into the Web Service environment variables.
4. In the Web Service environment variables, add any other env vars used in `backend/.env` (do not commit `.env`).
5. After deploy, run DB migrations:
   - Use the platform terminal or one-off job to run: `flask db upgrade`

Notes:
- The app already enables CORS (allow-all). For production, restrict allowed origins in `app.py` if desired.
- Set `REACT_APP_API_BASE_URL` in your Netlify site settings to the deployed backend URL and rebuild the frontend.
