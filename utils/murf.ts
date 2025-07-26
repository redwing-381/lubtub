export async function fetchVoice(text: string): Promise<Blob> {
  const response = await fetch('http://localhost:8000/generate-voice/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    throw new Error('Failed to generate voice');
  }

  return response.blob();
} 