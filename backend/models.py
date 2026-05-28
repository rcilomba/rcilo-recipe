from datetime import datetime

from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


class Recipe(db.Model):
    __tablename__ = "recipes"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False, index=True)
    time = db.Column(db.String(100), nullable=True)
    ingredients = db.Column(db.JSON, nullable=False, default=list)
    cooking = db.Column(db.JSON, nullable=False, default=list)
    image = db.Column(db.String(500), nullable=True)
    category = db.Column(db.String(100), nullable=True, index=True)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(
        db.DateTime,
        nullable=False,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
    )

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "time": self.time,
            "ingredients": self.ingredients or [],
            "cooking": self.cooking or [],
            "image": self.image,
            "category": self.category,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }

