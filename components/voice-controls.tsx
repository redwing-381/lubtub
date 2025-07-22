"use client"

import { Volume2, VolumeX, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

interface VoiceControlsProps {
  isListening: boolean
  isSpeaking: boolean
  audioEnabled: boolean
  onToggleListening: () => void
  onToggleAudio: () => void
  onEmergencyCall: () => void
}

export default function VoiceControls({
  isListening,
  isSpeaking,
  audioEnabled,
  onToggleListening,
  onToggleAudio,
  onEmergencyCall,
}: VoiceControlsProps) {
  return (
    <div className="bg-white/95 backdrop-blur-sm border-t-2 border-blue-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-center items-center gap-4">
          {/* Audio Toggle */}
          <Button
            size="lg"
            variant="outline"
            onClick={onToggleAudio}
            className={`w-14 h-14 rounded-full border-2 ${
              audioEnabled
                ? "border-blue-300 bg-blue-50 hover:bg-blue-100"
                : "border-slate-300 bg-slate-50 hover:bg-slate-100"
            }`}
            aria-label={audioEnabled ? "Disable audio" : "Enable audio"}
          >
            {audioEnabled ? (
              <Volume2 className="w-6 h-6 text-blue-600" />
            ) : (
              <VolumeX className="w-6 h-6 text-slate-500" />
            )}
          </Button>

          {/* Voice Input Status */}
          <div className="text-center">
            {isListening && (
              <div className="mb-2">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-red-600 font-semibold text-lg">Listening...</span>
                </div>
                <p className="text-sm text-slate-600">Speak clearly into your device</p>
              </div>
            )}

            {isSpeaking && (
              <div className="mb-2">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-blue-600 font-semibold text-lg">Speaking...</span>
                </div>
                <p className="text-sm text-slate-600">AI is providing guidance</p>
              </div>
            )}
          </div>

          {/* Emergency Call */}
          <Button
            size="lg"
            onClick={onEmergencyCall}
            className="w-14 h-14 rounded-full bg-red-600 hover:bg-red-700 border-0 shadow-lg"
            aria-label="Call emergency services"
          >
            <Phone className="w-6 h-6" />
          </Button>
        </div>

        {/* Voice Input Instructions */}
        {!isListening && !isSpeaking && (
          <div className="mt-4 text-center">
            <p className="text-slate-600 text-lg">💬 Type your message above or use voice input for hands-free help</p>
          </div>
        )}
      </div>
    </div>
  )
}
