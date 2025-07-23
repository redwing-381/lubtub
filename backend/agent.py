# backend/agent.py

import requests
import os

MURF_API_KEY = os.getenv("MURF_API_KEY")  # Store in .env or shell
MURF_API_URL = "https://api.murf.ai/v1/speech"  # Hypothetical

def generate_voice(text: str) -> str:
    headers = {
        "Authorization": f"Bearer {MURF_API_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
        "voice": "en-US-William",  # Replace with Murf voice ID
        "text": text,
        "format": "mp3"
    }

    response = requests.post(MURF_API_URL, json=payload, headers=headers)
    if response.status_code == 200:
        data = response.json()
        return data["audio_url"]  # URL to the generated voice
    else:
        print("Murf API error:", response.status_code, response.text)
        return "Error generating voice."
    

async def start_session(websocket):
    async for message in websocket.iter_text():
        # Placeholder: replace with NLP or rule-based logic
        if "cpr" in message.lower():
            reply = "Begin chest compressions. Push hard and fast in the center of the chest."
        elif "bleeding" in message.lower():
            reply = "Apply pressure to the wound with a clean cloth."
        else:
            reply = "Stay calm. Help is on the way."

        voice_url = generate_voice(reply)
        await websocket.send_json({
            "text": reply,
            "audio": voice_url
        })
