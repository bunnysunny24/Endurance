import os

cred_path = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")
if cred_path:
    print("Path is set correctly:", cred_path)
else:
    print("Environment variable not found.")
