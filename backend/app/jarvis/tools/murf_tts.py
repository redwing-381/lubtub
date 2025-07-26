import os
import requests

def murf_text_to_speech(text: str, voice: str = None, language: str = None) -> bytes:
    """
    Convert text to speech using Murf API. Returns audio bytes (MP3).
    Args:
        text: The text to convert to speech.
        voice: Optional Murf voice ID (default voice if None).
        language: Optional language code.
    Returns:
        Audio bytes (MP3)
    Raises:
        Exception if Murf API call fails.
    """
    api_key = os.getenv("MURF_API_KEY")
    if not api_key:
        raise Exception("MURF_API_KEY not set in environment variables.")

    url = "https://api.murf.ai/v1/speech/generate"
    headers = {
        "accept": "application/json",
        "Content-Type": "application/json",
        "apikey": api_key,
    }
    payload = {
        "text": text,
        # Use default voice if not specified
        **({"voice": voice} if voice else {}),
        **({"language": language} if language else {}),
        "format": "mp3"
    }
    response = requests.post(url, json=payload, headers=headers)
    if response.status_code != 200:
        raise Exception(f"Murf API error: {response.status_code} {response.text}")
    data = response.json()
    audio_url = data.get("audio_url")
    if not audio_url:
        raise Exception("No audio_url in Murf API response.")
    # Download the audio file
    audio_response = requests.get(audio_url)
    if audio_response.status_code != 200:
        raise Exception("Failed to download audio from Murf.")
    return audio_response.content 