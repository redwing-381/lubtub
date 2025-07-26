import os
import httpx
from fastapi import FastAPI, WebSocket, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from dotenv import load_dotenv

load_dotenv()
MURF_API_KEY = os.getenv("MURF_API_KEY")

app = FastAPI()

# Allow communication from frontend (especially in dev)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, restrict to your domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Backend is working"}

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = await websocket.receive_text()
        print(f"Received from client: {data}")
        await websocket.send_text(f"You said: {data}")

@app.post("/generate-voice/")
async def generate_voice(request: Request):
    data = await request.json()
    text = data.get("text", "")

    headers = {
        "Authorization": f"Bearer {MURF_API_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
        "text": text,
        "voice": "english-male-1",  # Replace with a voice ID you have access to
        "format": "mp3"
    }

    async with httpx.AsyncClient() as client:
        murf_response = await client.post("https://api.murf.ai/synthesize", json=payload, headers=headers)

        if murf_response.status_code == 200:
            return StreamingResponse(
                iter([murf_response.content]),
                media_type="audio/mpeg"
            )
        else:
            return {"error": "Failed to synthesize voice", "detail": murf_response.text}
