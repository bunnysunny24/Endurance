from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from firebase_config import db  # Ensure firebase_config.py correctly sets up Firestore

app = FastAPI()

IMU_COLLECTION_NAME = "imu_records"

# Define IMU Data Model
class IMUData(BaseModel):
    sensor: str
    timestamp: int
    angleX: float
    angleY: float
    angleZ: float
    velocityX: float
    velocityY: float
    velocityZ: float
    steps: int

@app.post("/add-imu-data/")
async def add_imu_data(data: IMUData):
    """Receives IMU data and stores it in Firestore."""
    try:
        print("Received Data:", data.dict())  # Debugging
        imu_collection = db.collection(IMU_COLLECTION_NAME)
        doc_ref = imu_collection.document()
        doc_ref.set(data.dict())
        return {"message": "Data added successfully", "id": doc_ref.id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
async def root():
    return {"message": "IMU Data API Running!"}
