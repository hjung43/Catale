# main.py
from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from app import schemas, database, crud


app = FastAPI()

@app.get("/")
async def getTest():
    return {"message": "Test api 호출 완료"}

@app.post("/api/v1/recommend/{cocktailId}")
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    return crud.create_user(db=db, user=user)

# @app.post("/image/", response_model=schemas.ImageCreate)
# def create_image(image: schemas.ImageCreate, db: Session = Depends(database.get_db)):
#     return crud.create_image(db=db, image=image)

