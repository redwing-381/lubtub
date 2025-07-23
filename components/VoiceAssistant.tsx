'use client';
import { useState } from 'react';
import { useVoiceAgent } from '@/hooks/useVoiceAgent';

export default function VoiceAssistant() {
  const [input, setInput] = useState('');
  const { messages, sendMessage } = useVoiceAgent();

  const handleSend = () => {
    sendMessage(input);
    setInput('');
  };

  return (
    <div className="p-4 border rounded-md shadow-md bg-white">
      <h2 className="text-xl font-bold mb-2">Emergency Voice Assistant</h2>
      <div className="h-48 overflow-y-auto mb-2">
        {messages.map((msg, i) => <p key={i}>{msg}</p>)}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="border px-2 py-1 mr-2"
        placeholder="Type a message..."
      />
      <button onClick={handleSend} className="bg-blue-500 text-white px-4 py-1 rounded">Send</button>
    </div>
  );
}
