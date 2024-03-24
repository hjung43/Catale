from sqlalchemy.orm import Session
from app.models import Item
from app.schemas import ItemCreate

def get_items(db: Session):
    return db.query(Item).all()

def get_item(db: Session, item_id: int):
    return db.query(Item).filter(Item.id == item_id).first()
