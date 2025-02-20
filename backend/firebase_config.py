import firebase_admin
from firebase_admin import credentials, firestore
import json

# Path to your service account JSON file
cred_path = r"D:\Bunny\Endurase\backend\endurverse-firebase-adminsdk-fbsvc-0dfe30353d.json"
# Load the credentials from the JSON file
with open(cred_path, 'r') as f:
    cred_data = json.load(f)

# Initialize Firebase app with the credentials data
if not firebase_admin._apps:  # Check if Firebase is already initialized
    cred = credentials.Certificate(cred_data)
    firebase_admin.initialize_app(cred)

# Get Firestore client
db = firestore.client()

# Test Firestore connection
def test_firestore():
    try:
        docs = db.collection('test_collection').stream()
        for doc in docs:
            print(f"{doc.id} => {doc.to_dict()}")
    except Exception as e:
        print("Firestore error:", e)

# Run the test function
if __name__ == "__main__":
    test_firestore()
in__":
    test_firestore()
