"use client";

import AudioRecorder from "../../components/AudioRecorder";

export default function MicPage() {
  const handleTranscript = async (text: string) => {
    console.log("User said:", text);

    // 1. Send to /chat (now powered by Gemini)
    const chatRes = await fetch("http://localhost:8000/chat/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: text }),
    });

    const chatJson = await chatRes.json();
    const aiReply = chatJson.reply;
    console.log("Gemini AI replied:", aiReply);

    // 2. Send reply to Murf
    const voiceRes = await fetch("http://localhost:8000/generate-voice/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: aiReply }),
    });

    if (!voiceRes.ok) {
      const errorText = await voiceRes.text();
      console.error("Voice generation failed:", errorText);
      return;
    }

    const blob = await voiceRes.blob();
    console.log("Audio blob type:", blob.type); // Should be "audio/mpeg"

    if (blob.type !== "audio/mpeg") {
      console.error("Not an audio file:", blob.type);
      return;
    }

    const audioUrl = URL.createObjectURL(blob);
    const audio = new Audio(audioUrl);
    audio.play();
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">🎙️ Live Assistant</h1>
      <AudioRecorder onTranscribe={handleTranscript} />
    </div>
  );
}

