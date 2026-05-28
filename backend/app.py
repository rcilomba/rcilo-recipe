from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_migrate import Migrate
from dotenv import load_dotenv

from config import Config
from models import Recipe, db


load_dotenv()


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Configure CORS origins via env var CORS_ORIGINS (comma-separated).
    # If not set, default to allow all origins (useful for initial deploy/testing).
    import os
    cors_origins = os.getenv("CORS_ORIGINS")
    if cors_origins:
        origins = [o.strip() for o in cors_origins.split(",") if o.strip()]
        CORS(app, origins=origins)
    else:
        CORS(app)
    db.init_app(app)
    Migrate(app, db)

    @app.get("/health")
    def health_check():
        return jsonify({"status": "ok"})

    @app.get("/recipes")
    def get_recipes():
        search = request.args.get("search", "").strip()
        query = Recipe.query

        if search:
            query = query.filter(Recipe.title.ilike(f"%{search}%"))

        recipes = query.order_by(Recipe.title.asc()).all()
        return jsonify([recipe.to_dict() for recipe in recipes])

    @app.post("/recipes")
    def create_recipe():
        data = request.get_json(silent=True) or {}
        title = (data.get("title") or "").strip()

        if not title:
            return jsonify({"error": "title is required"}), 400

        recipe = Recipe(
            title=title,
            time=data.get("time"),
            ingredients=data.get("ingredients") or [],
            cooking=data.get("cooking") or [],
            image=data.get("image"),
            category=data.get("category"),
        )
        db.session.add(recipe)
        db.session.commit()

        return jsonify(recipe.to_dict()), 201

    return app


app = create_app()


if __name__ == "__main__":
    app.run(debug=True)
