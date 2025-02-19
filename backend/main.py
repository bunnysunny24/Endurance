from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import json
from firebase_config import db  # Import db from firebase_config.py

app = FastAPI()

# Path to your imu_data.json file
json_file_path = "D:/Bunny/Endurase/backend/imu_data.json"

@app.post("/add-imu-data/")
async def add_imu_data():
    try:
        with open(json_file_path, 'r') as file:
            imu_data = json.load(file)

        print("Loaded JSON Data:", imu_data)

        if not imu_data:
            return {"error": "JSON file is empty"}

        batch = db.batch()
        imu_collection = db.collection("imu_data")
        document_refs = []

        for entry in imu_data:
            if isinstance(entry, dict):
                doc_ref = imu_collection.document()
                batch.set(doc_ref, entry)
                document_refs.append(doc_ref.id)

        batch.commit()
        return {"ids": document_refs}

    except Exception as e:
        return {"error": str(e)}
@app.get("/get-imu-data/{item_id}/")
async def get_imu_data(item_id: str):
    try:
        item_ref = db.collection("imu_data").document(item_id)
        item = item_ref.get()

        if item.exists:
            return item.to_dict()
        return {"error": "Item not found"}
    
    except Exception as e:
        return {"error": str(e)}
