from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from firebase_config import db  # Firebase Firestore connection

app = FastAPI()

# Define the expected data model
class IMUData(BaseModel):
    message: str
    sensor: str
    timestamp: int

@app.post("/add-imu-data/")
async def add_imu_data(data: IMUData):
    try:
        print("Received Data:", data.dict())  # Debugging
        imu_collection = db.collection("imu_data")
        doc_ref = imu_collection.document()
        doc_ref.set(data.dict())

        return {"message": "Data added successfully", "id": doc_ref.id}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/get-imu-data/{item_id}/")
async def get_imu_data(item_id: str):
    try:
        item_ref = db.collection("imu_data").document(item_id)
        item = item_ref.get()

        if item.exists:
            return item.to_dict()
        raise HTTPException(status_code=404, detail="Item not found")

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
