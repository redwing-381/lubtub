import { useEffect, useRef, useState } from "react";

export const useVoiceAgent = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const ws = useRef<WebSocket | null>(null);

  const sendMessage = (msg: string) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(msg);
    }
  };

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:8000/ws/voice");

    ws.current.onmessage = (event) => {
      setMessages((prev) => [...prev, `Agent: ${event.data}`]);
    };

    ws.current.onclose = () => console.log("WebSocket closed");

    return () => {
      ws.current?.close();
    };
  }, []);

  return { messages, sendMessage };
};
