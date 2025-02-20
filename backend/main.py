import time
import threading
import numpy as np
import matplotlib.pyplot as plt
import matplotlib
from fastapi import FastAPI
from pydantic import BaseModel
from firebase_config import db  # Ensure firebase_config.py correctly sets up Firestore
from sklearn.ensemble import IsolationForest

# Use non-GUI Matplotlib backend
matplotlib.use("Agg")

app = FastAPI()
IMU_COLLECTION_NAME = "imu_records"

# Define IMU Data Model
class IMUData(BaseModel):
    sensor: str
    timestamp: int
    velocityX: float
    velocityY: float
    velocityZ: float
    accelerationX: float
    accelerationY: float
    accelerationZ: float

# ML Model for Anomaly Detection
anomaly_model = IsolationForest(contamination=0.05)

# Store processed data
timestamps = []
resultant_velocity = []
resultant_acceleration = []
anomaly_timestamps = []

def calculate_resultant(vx, vy, vz):
    """Calculate resultant magnitude from 3 components."""
    return np.sqrt(vx**2 + vy**2 + vz**2)

def fetch_and_process_imu_data():
    """Fetch IMU data, process resultant velocity and acceleration, detect anomalies, and save graphs."""
    global timestamps, resultant_velocity, resultant_acceleration, anomaly_timestamps

    while True:
        try:
            imu_collection = db.collection(IMU_COLLECTION_NAME)
            docs = imu_collection.order_by("timestamp").stream()

            timestamp_data = []
            velocity_data = []
            acceleration_data = []

            for doc in docs:
                data = doc.to_dict()
                timestamp_data.append(data["timestamp"])
                
                # Compute resultant velocity
                res_velocity = calculate_resultant(
                    data.get("velocityX", 0), 
                    data.get("velocityY", 0), 
                    data.get("velocityZ", 0)
                )
                velocity_data.append(res_velocity)

                # Compute resultant acceleration (handling missing data)
                res_acceleration = calculate_resultant(
                    data.get("accelerationX", 0) or 0, 
                    data.get("accelerationY", 0) or 0, 
                    data.get("accelerationZ", 0) or 0
                )
                acceleration_data.append(res_acceleration)

            # Store data for visualization
            timestamps = timestamp_data
            resultant_velocity = velocity_data
            resultant_acceleration = acceleration_data

            # Print some values for debugging
            print(f"First 5 timestamps: {timestamps[:5]}")
            print(f"First 5 resultant velocities: {resultant_velocity[:5]}")
            print(f"First 5 resultant accelerations: {resultant_acceleration[:5]}")

            # Run anomaly detection if enough samples exist
            anomaly_timestamps = []
            if len(velocity_data) > 10:
                anomalies = anomaly_model.fit_predict(np.array(velocity_data).reshape(-1, 1))
                anomaly_timestamps = [timestamps[i] for i in range(len(anomalies)) if anomalies[i] == -1]
                print(f"Anomalies detected at timestamps: {anomaly_timestamps}")

            # Save updated graphs
            save_velocity_graph()
            save_acceleration_graph()

        except Exception as e:
            print(f"Error fetching or processing IMU data: {e}")

        time.sleep(5)  # Fetch data every 5 seconds

def save_velocity_graph():
    """Save the resultant velocity graph as an image."""
    plt.figure(figsize=(10, 5))
    plt.plot(timestamps, resultant_velocity, label="Resultant Velocity", color="blue")

    if anomaly_timestamps:
        plt.scatter(anomaly_timestamps, [resultant_velocity[timestamps.index(t)] for t in anomaly_timestamps], 
                    color="red", marker="x", label="Anomaly")

    plt.xlabel("Timestamp")
    plt.ylabel("Velocity Magnitude")
    plt.title("Resultant Velocity Over Time")
    plt.legend()

    velocity_graph_path = os.path.join(GRAPH_DIR, "imu_resultant_velocity.png")
    plt.savefig(velocity_graph_path)
    plt.close()

def save_acceleration_graph():
    """Save the resultant acceleration graph as an image."""
    plt.figure(figsize=(10, 5))
    plt.plot(timestamps, resultant_acceleration, label="Resultant Acceleration", color="green")

    plt.xlabel("Timestamp")
    plt.ylabel("Acceleration Magnitude")
    plt.title("Resultant Acceleration Over Time")
    plt.legend()

    acceleration_graph_path = os.path.join(GRAPH_DIR, "imu_resultant_acceleration.png")
    plt.savefig(acceleration_graph_path)
    plt.close()


# Start background thread for continuous data fetching & processing
threading.Thread(target=fetch_and_process_imu_data, daemon=True).start()

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

@app.get("/velocity-graph")
async def get_velocity_graph():
    """Endpoint to get the latest resultant velocity graph."""
    return {"velocity_graph_path": "imu_resultant_velocity.png"}

@app.get("/acceleration-graph")
async def get_acceleration_graph():
    """Endpoint to get the latest resultant acceleration graph."""
    return {"acceleration_graph_path": "imu_resultant_acceleration.png"}

@app.get("/anomalies")
async def get_anomalies():
    """Endpoint to get detected anomalies."""
    return {"anomaly_timestamps": anomaly_timestamps}
utf-8")

        return JSONResponse(content={"graph": f"data:image/png;base64,{img_base64}"})

    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})
