export async function fetchVoice(text: string): Promise<Blob> {
    const res = await fetch("http://localhost:8000/generate-voice/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text }),
    });
  
    const audioBlob = await res.blob();
    return audioBlob;
  }
  