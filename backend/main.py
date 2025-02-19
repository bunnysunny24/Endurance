import threading
import firebase_admin
from firebase_admin import credentials, firestore
from fastapi import FastAPI, HTTPException, BackgroundTasks
from pydantic import BaseModel
from firebase_config import db  # Firebase Firestore connection
from ml_model import process_imu_data
from graph_generator import generate_and_save_graph

app = FastAPI()

# Firestore collection for IMU data
IMU_COLLECTION_NAME = "imu_records"

# Define IMU Data Model
class IMUData(BaseModel):
    sensor: str
    timestamp: int
    angleX: float
    angleY: float
    angleZ: float
    accX: float
    accY: float
    accZ: float
    velocityX: float
    velocityY: float
    velocityZ: float
    stepCount: int

@app.post("/add-imu-data/")
async def add_imu_data(data: IMUData):
    """Manually adds IMU data to Firestore (for testing)."""
    try:
        print("Received Data:", data.dict())  # Debugging
        imu_collection = db.collection(IMU_COLLECTION_NAME)
        doc_ref = imu_collection.document()
        doc_ref.set(data.dict())

        return {"message": "Data added successfully", "id": doc_ref.id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/get-imu-data/")
async def get_all_imu_data(background_tasks: BackgroundTasks):
    """Fetches all IMU data, triggers ML processing, and updates graphs."""
    try:
        imu_collection = db.collection(IMU_COLLECTION_NAME)
        docs = imu_collection.stream()
        
        imu_data_list = [doc.to_dict() for doc in docs]

        if not imu_data_list:
            raise HTTPException(status_code=404, detail="No IMU data found.")

        # Run ML model and update graph in the background
        background_tasks.add_task(process_and_update_graphs, imu_data_list)

        return {"message": "Data retrieved and ML processing triggered.", "count": len(imu_data_list)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def process_and_update_graphs(imu_data_list):
    """Processes IMU data with ML and updates graphs."""
    try:
        processed_data = process_imu_data(imu_data_list)
        generate_and_save_graph(processed_data)
    except Exception as e:
        print("❌ Error processing IMU data:", e)

# ========================== 🔥 Firestore Real-Time Listener ==========================

def handle_new_data(snapshot, changes, read_time):
    """Triggered when Firestore gets new data."""
    imu_data_list = []

    for change in changes:
        if change.type.name == "ADDED":
            new_data = change.document.to_dict()

            # Validate all required fields exist
            required_fields = ["sensor", "timestamp", "angleX", "angleY", "angleZ", 
                               "accX", "accY", "accZ", "velocityX", "velocityY", "velocityZ", "stepCount"]
            
            if all(field in new_data for field in required_fields):
                imu_data_list.append(new_data)
            else:
                missing_fields = [field for field in required_fields if field not in new_data]
                print(f"⚠️ Skipping document due to missing fields: {missing_fields} → {new_data}")

    if imu_data_list:
        print("🔥 New IMU Data Detected:", imu_data_list)
        try:
            processed_data = process_imu_data(imu_data_list)  # Process with ML
            generate_and_save_graph(processed_data)  # Update graph
        except Exception as e:
            print("❌ Error processing IMU data:", e)


def start_firestore_listener():
    """Attaches a real-time Firestore listener."""
    try:
        imu_collection = db.collection(IMU_COLLECTION_NAME)
        imu_collection.on_snapshot(handle_new_data)  # Start listening for new data
    except Exception as e:
        print("❌ Firestore listener failed to start:", e)

def start_listener_thread():
    """Runs the Firestore listener in a background thread."""
    thread = threading.Thread(target=start_firestore_listener)
    thread.daemon = True  # Ensures the thread exits when the program stops
    thread.start()

@app.on_event("startup")
async def startup_event():
    """Start Firestore real-time listener when FastAPI starts."""
    start_listener_thread()
    print("✅ Firestore Real-Time Listener Started...")

@app.get("/")
async def root():
    return {"message": "IMU Data Processing API is Running in Real-Time!"}
