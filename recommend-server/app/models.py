from sqlalchemy import Column, Integer, String
from app.database import Base

class Cocktail(Base):
    __tablename__ = "cocktail"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    alc = Column(Integer)
    sweet = Column(Integer)
    sour = Column(Integer)
    bitter = Column(Integer)
    sparkling = Column(Integer)
