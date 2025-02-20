from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from firebase_config import db
import math
import matplotlib.pyplot as plt
import io
import base64
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse


app = FastAPI()  # ✅ Initialize app first

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow requests from any frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
    accelerationX: float  # ✅ Added acceleration fields
    accelerationY: float
    accelerationZ: float
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

@app.get("/get-imu-data/")
async def get_imu_data():
    """Fetch all IMU data and compute resultant acceleration."""
    try:
        imu_collection = db.collection(IMU_COLLECTION_NAME)
        docs = imu_collection.stream()
        
        imu_data = []
        resultants = []
        timestamps = []

        for doc in docs:
            data = doc.to_dict()
            resultant_acceleration = math.sqrt(
                data["accelerationX"]**2 + data["accelerationY"]**2 + data["accelerationZ"]**2
            )
            imu_data.append(data)
            resultants.append(resultant_acceleration)
            timestamps.append(data["timestamp"])

        return {"data": imu_data, "resultants": resultants, "timestamps": timestamps}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/plot-acceleration/")
async def plot_resultant_acceleration():
    """Fetch IMU data, compute resultant acceleration dynamically, and return a graph."""
    try:
        # Fetch data from Firestore
        imu_collection = db.collection(IMU_COLLECTION_NAME)
        docs = imu_collection.stream()
        
        imu_data = []
        timestamps = []
        resultants = []

        for doc in docs:
            data = doc.to_dict()

            # Ensure required fields are present
            if all(k in data for k in ["accelerationX", "accelerationY", "accelerationZ", "timestamp"]):
                resultant_acceleration = math.sqrt(
                    data["accelerationX"]**2 + data["accelerationY"]**2 + data["accelerationZ"]**2
                )
                imu_data.append(data)
                timestamps.append(data["timestamp"])
                resultants.append(resultant_acceleration)

        if not imu_data:
            raise HTTPException(status_code=400, detail="No valid IMU acceleration data found.")

        # Sort data by timestamp to maintain order
        sorted_data = sorted(zip(timestamps, resultants), key=lambda x: x[0])
        sorted_timestamps, sorted_resultants = zip(*sorted_data) if sorted_data else ([], [])

        # Plot the data dynamically
        plt.figure(figsize=(8, 5))
        plt.plot(sorted_timestamps, sorted_resultants, marker="o", linestyle="-", color="blue")
        plt.title("Dynamic Resultant Acceleration Over Time")
        plt.xlabel("Timestamp")
        plt.ylabel("Acceleration (m/s²)")
        plt.xticks(rotation=45)
        plt.grid(True)

        # Convert plot to base64 image
        buf = io.BytesIO()
        plt.savefig(buf, format="png")
        buf.seek(0)
        img_base64 = base64.b64encode(buf.getvalue()).decode("utf-8")

        return JSONResponse(content={"graph": f"data:image/png;base64,{img_base64}"})

    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})


@app.get("/")
async def root():
    return {"message": "IMU Data API Running!"}
