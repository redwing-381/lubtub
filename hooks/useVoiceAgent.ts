import { useEffect, useRef, useState } from "react";

interface Message {
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
  audio?: string; // Base64 encoded audio data
}

export const useVoiceAgent = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const ws = useRef<WebSocket | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);
  const sessionId = useRef<string>(`session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);

  const sendMessage = (content: string) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      const message = {
        mime_type: "text/plain",
        data: content,
        role: "user"
      };
      
      ws.current.send(JSON.stringify(message));
      
      // Add user message to local state
      setMessages(prev => [...prev, {
        role: 'user',
        content,
        timestamp: new Date()
      }]);
      
      setIsLoading(true);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });
      
      audioChunks.current = [];
      
      mediaRecorder.current.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };
      
      mediaRecorder.current.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/webm' });
        sendAudioMessage(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorder.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error starting recording:", error);
      setConnectionError("Failed to access microphone. Please check permissions.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && isRecording) {
      mediaRecorder.current.stop();
      setIsRecording(false);
    }
  };

  const sendAudioMessage = (audioBlob: Blob) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Audio = reader.result as string;
        const audioData = base64Audio.split(',')[1]; // Remove data URL prefix
        
        const message = {
          mime_type: "audio/pcm",
          data: audioData,
          role: "user"
        };
        
        ws.current!.send(JSON.stringify(message));
        setIsLoading(true);
      };
      reader.readAsDataURL(audioBlob);
    }
  };

  const playAudio = (audioData: string) => {
    const audio = new Audio(`data:audio/wav;base64,${audioData}`);
    audio.play().catch(error => {
      console.error("Error playing audio:", error);
    });
  };

  useEffect(() => {
    // Connect to the new ADK agent WebSocket with voice enabled
    const wsUrl = `wss://lubtub.onrender.com/ws/${sessionId.current}?is_audio=true`;
    console.log("Attempting to connect to:", wsUrl);
    
    try {
      ws.current = new WebSocket(wsUrl);

      ws.current.onopen = () => {
        console.log("✅ Connected to ADK Voice Agent with voice support");
        setIsConnected(true);
        setConnectionError(null);
      };

      ws.current.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log("Received message:", data);
          
          if (data.mime_type === "text/plain" && data.role === "model") {
            setMessages(prev => [...prev, {
              role: 'model',
              content: data.data,
              timestamp: new Date()
            }]);
            setIsLoading(false);
          } else if (data.mime_type === "audio/pcm" && data.role === "model") {
            // Play the received audio
            playAudio(data.data);
            setIsLoading(false);
          } else if (data.turn_complete) {
            setIsLoading(false);
          }
        } catch (error) {
          console.error("Error parsing WebSocket message:", error);
        }
      };

      ws.current.onclose = (event) => {
        console.log("WebSocket closed:", event.code, event.reason);
        setIsConnected(false);
        if (event.code !== 1000) {
          setConnectionError(`Connection closed: ${event.reason || 'Unknown error'}`);
        }
      };

      ws.current.onerror = (error) => {
        console.error("WebSocket error:", error);
        setIsConnected(false);
        setConnectionError("Failed to connect to backend. Please check if the backend server is running.");
      };

    } catch (error) {
      console.error("Error creating WebSocket:", error);
      setConnectionError("Failed to create WebSocket connection");
    }

    return () => {
      if (ws.current) {
        ws.current.close();
      }
      if (mediaRecorder.current && isRecording) {
        mediaRecorder.current.stop();
      }
    };
  }, []);

  return { 
    messages, 
    sendMessage, 
    isConnected, 
    isLoading,
    isRecording,
    connectionError,
    startRecording,
    stopRecording
  };
};
