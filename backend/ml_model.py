import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import IsolationForest
import math

scaler = StandardScaler()
model = IsolationForest(contamination=0.1, random_state=42)  
global_training_data = []

def process_imu_data(imu_data_list):
    """Processes IMU data, computes resultant acceleration & velocity, and applies ML."""
    
    global global_training_data  
    data_matrix = []

    for data in imu_data_list:
        try:
            resultant_acc = math.sqrt(data.get("accX", 0.0)**2 + data.get("accY", 0.0)**2 + data.get("accZ", 0.0)**2)
            resultant_velocity = math.sqrt(data.get("velocityX", 0.0)**2 + data.get("velocityY", 0.0)**2 + data.get("velocityZ", 0.0)**2)

            data["resultant_acc"] = resultant_acc
            data["resultant_velocity"] = resultant_velocity

            row = [data.get("angleX", 0.0), data.get("angleY", 0.0), data.get("angleZ", 0.0), resultant_acc, resultant_velocity]
            data_matrix.append(row)
        except Exception as e:
            print(f"❌ Error processing IMU data: {e}")

    if not data_matrix:
        print("⚠️ No valid data for ML processing.")
        return []

    X = np.array(data_matrix)

    # Ensure past data is used for scaling
    if len(global_training_data) > 10:
        scaler.fit(global_training_data)  
        X_scaled = scaler.transform(X)
    else:
        X_scaled = scaler.fit_transform(X)  

    global_training_data.extend(X_scaled.tolist())

    if len(global_training_data) > 10:
        model.fit(global_training_data)  

    predictions = model.predict(X_scaled)

    for i, data in enumerate(imu_data_list):
        data["anomaly"] = int(predictions[i])  

    return imu_data_list