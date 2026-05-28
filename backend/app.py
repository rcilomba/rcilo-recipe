from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_migrate import Migrate
from dotenv import load_dotenv
import os

from config import Config
from models import Recipe, db

load_dotenv()


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Configure CORS
    cors_origins = os.getenv("CORS_ORIGINS")
    if cors_origins:
        origins = [o.strip() for o in cors_origins.split(",") if o.strip()]
        CORS(app, origins=origins)
    else:
        CORS(app)

    db.init_app(app)
    Migrate(app, db)

    # --- SEED DATABASE IF RUN_SEED=1 ---
    with app.app_context():
        if os.getenv("RUN_SEED") == "1":
            print("Seeding database...")

            if Recipe.query.count() == 0:
                seed_recipes = [
                    Recipe(
                        title="Spaghetti Bolognese",
                        time="30 min",
                        ingredients=["pasta", "köttfärs", "tomatsås"],
                        cooking=["Koka pasta", "Stek köttfärs", "Blanda"],
                        image=None,
                        category="Italian"
                    ),
                    Recipe(
                        title="Kycklinggryta",
                        time="45 min",
                        ingredients=["kyckling", "grädde", "lök"],
                        cooking=["Stek kyckling", "Tillsätt grädde", "Låt sjuda"],
                        image=None,
                        category="Dinner"
                    ),
                ]

                db.session.add_all(seed_recipes)
                db.session.commit()
                print("Database seeded!")
            else:
                print("Database already has data, skipping seed.")

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
