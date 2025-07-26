"use client";


import { useState } from "react";
import { fetchVoice } from "../../utils/murf";

export default function Assistant() {
  const [text, setText] = useState("");

  const handlePlay = async () => {
    const blob = await fetchVoice(text);
    console.log("Audio blob:", blob);
    console.log("Type:", blob.type); // Should be audio/mpeg

    if (blob.type !== "audio/mpeg") {
      alert("Error: Did not receive an audio file. Check backend logs and Murf API key.");
      return;
    }

    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    audio.play();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">🗣️ Emergency Voice Assistant Test</h1>
      <textarea
        rows={3}
        className="w-full border p-2 mb-4"
        placeholder="Enter text to convert to voice"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handlePlay}
      >
        ▶️ Play Voice
      </button>
    </div>
  );
} 