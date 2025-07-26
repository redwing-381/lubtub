import { useState, useRef } from "react";

export default function AudioRecorder({ onTranscribe }: { onTranscribe: (text: string) => void }) {
  const [recording, setRecording] = useState(false);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder.current = new MediaRecorder(stream);
    mediaRecorder.current.start();
    setRecording(true);

    mediaRecorder.current.ondataavailable = (e) => {
      chunks.current.push(e.data);
    };

    mediaRecorder.current.onstop = async () => {
      const blob = new Blob(chunks.current, { type: "audio/webm" });
      console.log("Audio blob size:", blob.size, "bytes");
      
      const formData = new FormData();
      formData.append("file", blob, "voice.webm");

      console.log("Sending audio to transcribe endpoint...");
      const res = await fetch("http://localhost:8000/transcribe/", {
        method: "POST",
        body: formData,
      });

      console.log("Transcribe response status:", res.status);
      const result = await res.json();
      console.log("Transcribe result:", result);
      
      if (result.transcript) {
        onTranscribe(result.transcript);
      } else {
        console.error("No transcript received:", result);
      }
      chunks.current = [];
    };
  };

  const stopRecording = () => {
    mediaRecorder.current?.stop();
    setRecording(false);
  };

  return (
    <div>
      <button
        className={`px-4 py-2 ${recording ? "bg-red-500" : "bg-blue-500"} text-white rounded`}
        onClick={recording ? stopRecording : startRecording}
      >
        {recording ? "Stop Recording" : "Start Recording"}
      </button>
    </div>
  );
}
