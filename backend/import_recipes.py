import json
import os

from app import create_app
from models import db, Recipe


def load_seed(path="recipes_seed.json"):
    here = os.path.dirname(__file__)
    full = os.path.join(here, path)
    with open(full, "r", encoding="utf-8") as f:
        return json.load(f)


def import_recipes(seed_path="recipes_seed.json"):
    app = create_app()
    with app.app_context():
        data = load_seed(seed_path)
        for item in data:
            title = item.get("title")
            if not title:
                continue
            # skip if already exists (by title)
            existing = Recipe.query.filter_by(title=title).first()
            if existing:
                print(f"Skipping existing: {title}")
                continue

            recipe = Recipe(
                title=title,
                time=item.get("time"),
                ingredients=item.get("ingredients") or [],
                cooking=item.get("cooking") or [],
                image=item.get("image"),
                category=item.get("category"),
            )
            db.session.add(recipe)
        db.session.commit()
        print(f"Imported {len(data)} recipes from {seed_path}")


if __name__ == "__main__":
    import_recipes()
