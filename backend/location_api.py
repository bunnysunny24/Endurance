from fastapi import FastAPI
import requests

app = FastAPI()

@app.get("/")
def root():
    return {"message": "FastAPI Location Service Running!"}

@app.get("/get-location")
def get_location():
    try:
        response = requests.get("http://ip-api.com/json/")
        if response.status_code == 200:
            data = response.json()
            return {
                "latitude": data.get("lat"),
                "longitude": data.get("lon"),
                "city": data.get("city"),
                "region": data.get("regionName"),
                "country": data.get("country"),
                "ISP": data.get("isp"),
                "timezone": data.get("timezone"),
                "altitude": "Not available (IP-based location does not provide altitude)"
            }
        else:
            return {"error": "Failed to fetch location data"}
    except Exception as e:
        return {"error": str(e)}

# Run using: uvicorn location_api:app --host 0.0.0.0 --port 8000 --reload
