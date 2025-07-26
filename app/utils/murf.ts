export async function fetchVoice(text: string): Promise<Blob> {
    const res = await fetch("http://localhost:8000/generate-voice/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });
  
    if (!res.ok) {
      const errorText = await res.text();
      console.error("Murf API error:", errorText);
      throw new Error("Failed to get voice audio");
    }
  
    return await res.blob(); // Make sure it returns a valid Blob
  }
  