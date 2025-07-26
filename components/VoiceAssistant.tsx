'use client';
import { useState } from 'react';
import { useVoiceAgent } from '@/hooks/useVoiceAgent';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { AlertTriangle, Send, Wifi, WifiOff, Loader2, AlertCircle, Mic, MicOff, Volume2 } from 'lucide-react';

export default function VoiceAssistant() {
  const [input, setInput] = useState('');
  const { 
    messages, 
    sendMessage, 
    isConnected, 
    isLoading, 
    isRecording,
    connectionError, 
    startRecording, 
    stopRecording 
  } = useVoiceAgent();

  const handleSend = () => {
    if (input.trim() && isConnected) {
      sendMessage(input.trim());
      setInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleVoiceInput = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <div className="max-w-4xl mx-auto min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50 p-4">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Emergency Assistant</h1>
              <p className="text-gray-600">LubTub AI - Real-time emergency guidance with voice</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isConnected ? (
              <div className="flex items-center gap-2 text-green-600">
                <Wifi className="w-4 h-4" />
                <span className="text-sm font-medium">Connected</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-red-600">
                <WifiOff className="w-4 h-4" />
                <span className="text-sm font-medium">Disconnected</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Connection Error Alert */}
      {connectionError && (
        <Card className="mb-6 p-4 bg-red-50 border-2 border-red-200">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <div>
              <h3 className="font-semibold text-red-800">Connection Error</h3>
              <p className="text-sm text-red-700">{connectionError}</p>
              <p className="text-xs text-red-600 mt-1">
                Make sure the backend server is running: <code className="bg-red-100 px-1 rounded">cd backend && uvicorn app.main:app --reload --port 8000</code>
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Messages */}
      <Card className="mb-6 p-6 bg-white/80 backdrop-blur-sm border-2 border-red-200 shadow-xl rounded-2xl">
        <div className="h-96 overflow-y-auto mb-4 space-y-4">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium">
                {isConnected ? "Emergency Assistant Ready" : "Connecting to Assistant..."}
              </p>
              <p className="text-sm">
                {isConnected 
                  ? "Describe your emergency situation to get immediate guidance. Use voice or text input."
                  : "Please wait while we connect to the emergency assistant."
                }
              </p>
            </div>
          ) : (
            messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-4 rounded-2xl ${
                    msg.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  <p className="text-xs opacity-70 mt-2">
                    {msg.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))
          )}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 p-4 rounded-2xl">
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm text-gray-600">Assistant is responding...</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Controls */}
        <div className="flex gap-2">
          {/* Voice Recording Button */}
          <Button
            onClick={handleVoiceInput}
            disabled={!isConnected || isLoading}
            variant={isRecording ? "destructive" : "outline"}
            className={`h-12 w-12 p-0 rounded-xl ${
              isRecording 
                ? 'bg-red-600 hover:bg-red-700 text-white' 
                : 'border-2 border-blue-300 hover:bg-blue-50'
            }`}
          >
            {isRecording ? (
              <MicOff className="w-5 h-5" />
            ) : (
              <Mic className="w-5 h-5" />
            )}
          </Button>

          {/* Text Input */}
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={isConnected ? "Type your emergency situation..." : "Connecting..."}
            className="flex-1 border-2 border-gray-200 focus:border-red-400 rounded-xl"
            disabled={!isConnected}
          />

          {/* Send Button */}
          <Button
            onClick={handleSend}
            disabled={!input.trim() || !isConnected || isLoading}
            className="bg-red-600 hover:bg-red-700 text-white px-6 rounded-xl"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>

        {/* Voice Status */}
        {isRecording && (
          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-2 text-red-700">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Recording... Click microphone to stop</span>
            </div>
          </div>
        )}
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Button
          onClick={() => sendMessage("I need help with a medical emergency")}
          disabled={!isConnected}
          variant="outline"
          className="h-16 border-2 border-red-300 hover:bg-red-50 rounded-xl"
        >
          <AlertTriangle className="w-5 h-5 mr-2" />
          Medical Emergency
        </Button>
        <Button
          onClick={() => sendMessage("I need emotional support")}
          disabled={!isConnected}
          variant="outline"
          className="h-16 border-2 border-blue-300 hover:bg-blue-50 rounded-xl"
        >
          <AlertTriangle className="w-5 h-5 mr-2" />
          Emotional Support
        </Button>
      </div>

      {/* Voice Instructions */}
      <Card className="mt-6 p-4 bg-blue-50 border-2 border-blue-200">
        <div className="flex items-center gap-3">
          <Volume2 className="w-5 h-5 text-blue-600" />
          <div>
            <h3 className="font-semibold text-blue-800">Voice Commands</h3>
            <p className="text-sm text-blue-700">
              Click the microphone button to speak your emergency. The assistant will respond with both text and voice guidance.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
