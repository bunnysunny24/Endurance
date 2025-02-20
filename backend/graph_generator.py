import matplotlib.pyplot as plt
import os
import datetime

SAVE_DIR = "graphs"
os.makedirs(SAVE_DIR, exist_ok=True)

# Persistent storage for IMU data
global_imu_data = []

# Define fixed axis ranges (Adjust based on expected values)
FIXED_Y_RANGE_ACC = (-15, 15)  # Acceleration range (m/s²)
FIXED_Y_RANGE_VEL = (-500, 500)  # Velocity range (m/s)
MAX_DATA_POINTS = 100  # Limit max points on the graph

def generate_and_save_graph(imu_data_list):
    """Continuously updates and saves graphs while keeping axes consistent."""
    global global_imu_data

    if not imu_data_list:
        print("⚠️ No new data available for graph generation.")
        return

    # Append new data while keeping history
    global_imu_data.extend(imu_data_list)

    # Sort timestamps to maintain chronological order
    global_imu_data.sort(key=lambda x: x["timestamp"])

    # Keep only the last MAX_DATA_POINTS to maintain a moving window
    if len(global_imu_data) > MAX_DATA_POINTS:
        global_imu_data = global_imu_data[-MAX_DATA_POINTS:]

    timestamps = [data["timestamp"] for data in global_imu_data]
    resultant_acc = [data["resultant_acc"] for data in global_imu_data]
    resultant_velocity = [data["resultant_velocity"] for data in global_imu_data]

    plt.figure(figsize=(10, 6))

    # Plot Resultant Acceleration with fixed Y-axis
    plt.subplot(2, 1, 1)
    plt.plot(timestamps, resultant_acc, label="Resultant Acceleration", color="r", marker="o")
    plt.xlabel("Timestamp")
    plt.ylabel("Acceleration (m/s²)")
    plt.title("Resultant Acceleration Over Time")
    plt.legend()
    plt.grid(True)
    plt.ylim(FIXED_Y_RANGE_ACC)  # Fix Y-axis limits

    # Plot Resultant Velocity with fixed Y-axis
    plt.subplot(2, 1, 2)
    plt.plot(timestamps, resultant_velocity, label="Resultant Velocity", color="b", marker="s")
    plt.xlabel("Timestamp")
    plt.ylabel("Velocity (m/s)")
    plt.title("Resultant Velocity Over Time")
    plt.legend()
    plt.grid(True)
    plt.ylim(FIXED_Y_RANGE_VEL)  # Fix Y-axis limits

    # Keep X-axis consistent by setting equal spacing
    plt.xticks(rotation=45)

    # Save the graph (Overwrite the previous one to avoid clutter)
    graph_path = os.path.join(SAVE_DIR, "imu_graph.png")
    plt.savefig(graph_path)
    plt.close()

    print(f"✅ Graph updated and saved at {graph_path}")