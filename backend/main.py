import os
import httpx
from fastapi import FastAPI, WebSocket, Request, File, UploadFile, Body
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse, Response
from dotenv import load_dotenv
from jose import jwt  # <-- use python-jose
import time
import openai
from openai import OpenAI
from gemini_agent import root_agent
import requests

load_dotenv()
MURF_API_KEY = os.getenv("MURF_API_KEY")

LIVEKIT_API_KEY = os.getenv("LIVEKIT_API_KEY")
LIVEKIT_API_SECRET = os.getenv("LIVEKIT_API_SECRET")

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

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

from fastapi.responses import Response

@app.post("/generate-voice/")
async def generate_voice(request: Request):
    try:
        data = await request.json()
        text = data.get("text", "")
        print(f"Received text: {text}")

        if not MURF_API_KEY:
            print("ERROR: MURF_API_KEY is not set")
            return Response(
                content="Error: Murf API key not configured",
                status_code=500
            )

        headers = {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "api-key": MURF_API_KEY,
        }

        payload = {
            "text": text,
            "voiceId": "en-US-natalie",  # Use the correct voice ID format
        }

        print(f"Making request to Murf API with payload: {payload}")

        async with httpx.AsyncClient() as client:
            murf_response = await client.post(
                "https://api.murf.ai/v1/speech/generate",
                json=payload,
                headers=headers
            )

            print(f"Murf API response status: {murf_response.status_code}")
            print(f"Murf API response text: {murf_response.text}")

            if murf_response.status_code == 200:
                response_data = murf_response.json()
                audio_file_url = response_data.get("audioFile")
                
                if audio_file_url:
                    # Download the audio file from the URL
                    audio_response = await client.get(audio_file_url)
                    if audio_response.status_code == 200:
                        return Response(
                            content=audio_response.content,
                            media_type="audio/mpeg"
                        )
                    else:
                        return Response(
                            content=f"Error downloading audio: {audio_response.status_code}",
                            status_code=500
                        )
                else:
                    return Response(
                        content="Error: No audio file URL in response",
                        status_code=500
                    )
            else:
                return Response(
                    content=f"Error: {murf_response.text}",
                    status_code=500
                )
    except Exception as e:
        print(f"Exception in generate_voice: {str(e)}")
        return Response(
            content=f"Internal error: {str(e)}",
            status_code=500
        )

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

@app.post("/transcribe/")
async def transcribe_audio(file: UploadFile = File(...)):
    try:
        print(f"Starting transcription for file: {file.filename}")
        contents = await file.read()
        print(f"Audio file size: {len(contents)} bytes")
        
        if len(contents) == 0:
            return {"error": "Empty audio file received"}
            
        with open("temp_audio.wav", "wb") as f:
            f.write(contents)
        print("Saved audio file to temp_audio.wav")

        audio_file = open("temp_audio.wav", "rb")
        print("Calling OpenAI Whisper...")
        
        transcript = client.audio.transcriptions.create(
            model="whisper-1",
            file=audio_file
        )
        print(f"Whisper transcript: '{transcript.text}'")
        
        if not transcript.text or transcript.text.strip() == "":
            print("WARNING: Whisper returned empty transcript")
            
        return {"transcript": transcript.text}

    except Exception as e:
        print(f"Error in transcribe_audio: {str(e)}")
        return {"error": str(e)}

def create_livekit_token(identity="user123", room="emergency-room"):
    now = int(time.time())
    payload = {
        "iss": LIVEKIT_API_KEY,
        "sub": identity,
        "nbf": now,
        "exp": now + 3600,
        "video": {
            "roomJoin": True,
            "room": room,
            "canPublish": True,
            "canSubscribe": True,
        }
    }
    token = jwt.encode(payload, LIVEKIT_API_SECRET, algorithm="HS256")
    return token

# Usage in FastAPI
@app.get("/get-livekit-token")
def get_token(identity: str = "user123"):
    return {"token": create_livekit_token(identity)}

def gemini_chat(user_input):
    url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent"
    headers = {"Content-Type": "application/json"}
    params = {"key": GEMINI_API_KEY}
    data = {
        "contents": [
            {"parts": [{"text": user_input}]}
        ]
    }
    response = requests.post(url, headers=headers, params=params, json=data)
    return response.json()

@app.post("/chat/")
async def chat_with_gemini(payload: dict = Body(...)):
    user_input = payload.get("message", "")

    try:
        gemini_response = gemini_chat(user_input)
        # Extract the reply from the Gemini response structure
        reply = gemini_response["candidates"][0]["content"]["parts"][0]["text"]
        return {"reply": reply}
    except Exception as e:
        return {"error": str(e)}
