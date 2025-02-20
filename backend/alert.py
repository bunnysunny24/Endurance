from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from twilio.rest import Client

app = FastAPI()

# Enable CORS to allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this to specific domains in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Twilio credentials (Replace with your actual credentials)
ACCOUNT_SID = "AC41488871e60cda9f21b4e2512f45b396"
AUTH_TOKEN = "f9a461c7ba445cde78f6aa740e22e432"
TWILIO_NUMBER = "+19035224919"

client = Client(ACCOUNT_SID, AUTH_TOKEN)

@app.post("/send-sms/")
async def send_sms(data: dict):
    try:
        print(f"📨 Sending SMS to {data['to']}: {data['body']}")  # Debug log
        message = client.messages.create(
            to=data["to"],
            from_=TWILIO_NUMBER,
            body=data["body"]
        )
        return {"sid": message.sid}
    except Exception as e:
        print("🚨 Twilio Error:", str(e))
        raise HTTPException(status_code=500, detail=str(e))
