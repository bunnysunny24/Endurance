from firebase_config import db  # Import Firestore setup

try:
    print("Testing Firestore connection...")
    imu_collection = db.collection("imu_records")
    docs = imu_collection.stream()
    data = [{**doc.to_dict(), "id": doc.id} for doc in docs]
    print(f"Retrieved {len(data)} records.")
except Exception as e:
    print(f"Firestore Error: {e}")

