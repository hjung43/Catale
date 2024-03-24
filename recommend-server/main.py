from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
import app.models, app.database
from app.cosine_similarity import get_sorted_cocktails
from app.database import SessionLocal, engine

app.models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# DB 세션관리 차원에서 main에 선언함 
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
async def getTest():
    return {"message": "Test api 호출 완료"}


@app.get("api/cocktail/{cocktail_id}/similar")
def get_recommendations(cocktail_id: int, db: Session = Depends(get_db)):
    target_cocktail = db.query(app.models.Cocktail).filter(app.models.Cocktail.id == cocktail_id).first()
    if not target_cocktail:
        raise HTTPException(status_code=404, detail="해당하는 ID의 Cocktail이 없습니다.")
    all_cocktails = db.query(app.models.Cocktail).all()
    recommendations = get_sorted_cocktails(target_cocktail, all_cocktails)
    return [{"id": cocktail.id, "name": cocktail.name, "similarity_score": score} for cocktail, score in recommendations]
