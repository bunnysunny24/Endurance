from fastapi import FastAPI
from firebase_admin import firestore
import firebase_admin
import json
from firebase_config import db  # Import db from firebase_config.py

app = FastAPI()

# Path to your imu_data.json file
json_file_path = "D:/Bunny/Endurase/backend/imu_data.json"

@app.post("/add-imu-data/")
async def add_imu_data():
    try:
        # Read data from the imu_data.json file
        with open(json_file_path, 'r') as file:
            imu_data = json.load(file)

        # Debugging: Print loaded JSON data
        print("Loaded JSON Data:", imu_data)

        # Validate if JSON is empty
        if not imu_data:
            return {"error": "JSON file is empty"}

        # Use Firestore batch writing for efficiency
        batch = db.batch()
        imu_collection = db.collection("imu_data")
        document_refs = []

        for entry in imu_data:
            if isinstance(entry, dict):  # Ensure valid dictionary format
                doc_ref = imu_collection.document()  # Auto-generate document ID
                batch.set(doc_ref, entry)
                document_refs.append(doc_ref.id)
            else:
                print("Skipping invalid entry:", entry)  # Debug invalid data

        batch.commit()  # Execute batch write

        # Return added document IDs
        return {"ids": document_refs}

    except Exception as e:
        return {"error": str(e)}

# To retrieve the added IMU data by ID
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
