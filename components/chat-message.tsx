"use client"

import { useState } from "react"
import { Play, Pause, Volume2, RotateCcw, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface Message {
  id: string
  type: "user" | "ai"
  content: string
  timestamp: Date
  audioUrl?: string
  isPlaying?: boolean
  urgency?: "low" | "medium" | "high" | "critical"
}

interface ChatMessageProps {
  message: Message
  audioEnabled: boolean
  isSpeaking: boolean
}

export default function ChatMessage({ message, audioEnabled, isSpeaking }: ChatMessageProps) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)

  const getUrgencyStyle = () => {
    switch (message.urgency) {
      case "critical":
        return "border-red-300 bg-red-50/80"
      case "high":
        return "border-orange-300 bg-orange-50/80"
      case "medium":
        return "border-blue-300 bg-blue-50/80"
      default:
        return "border-green-300 bg-green-50/80"
    }
  }

  const getUrgencyIcon = () => {
    switch (message.urgency) {
      case "critical":
        return "🚨"
      case "high":
        return "⚠️"
      case "medium":
        return "ℹ️"
      default:
        return "💬"
    }
  }

  const playAudio = () => {
    setIsPlayingAudio(!isPlayingAudio)
    // Simulate audio playback
    setTimeout(() => setIsPlayingAudio(false), 4000)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  if (message.type === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[80%] lg:max-w-[60%]">
          <Card className="p-4 bg-blue-500 text-white border-0 rounded-3xl rounded-br-lg shadow-lg">
            <p className="text-lg leading-relaxed">{message.content}</p>
            <div className="flex items-center justify-end gap-2 mt-2 opacity-80">
              <Clock className="w-3 h-3" />
              <span className="text-xs">{formatTime(message.timestamp)}</span>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-start">
      <div className="max-w-[85%] lg:max-w-[70%]">
        <Card className={`p-6 border-2 ${getUrgencyStyle()} backdrop-blur-sm shadow-lg rounded-3xl rounded-bl-lg`}>
          {/* Urgency Indicator */}
          {message.urgency && (
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">{getUrgencyIcon()}</span>
              <span className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
                {message.urgency === "critical"
                  ? "Critical"
                  : message.urgency === "high"
                    ? "Important"
                    : message.urgency === "medium"
                      ? "Guidance"
                      : "Info"}
              </span>
            </div>
          )}

          {/* Message Content */}
          <p className="text-lg leading-relaxed text-slate-800 mb-4">{message.content}</p>

          {/* Audio Controls */}
          {message.audioUrl && (
            <div className="flex items-center gap-3 p-3 bg-white/70 rounded-2xl border border-slate-200">
              <Button
                size="sm"
                onClick={playAudio}
                className={`w-10 h-10 rounded-full ${
                  isPlayingAudio || isSpeaking ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"
                }`}
                aria-label={isPlayingAudio ? "Pause audio" : "Play audio"}
              >
                {isPlayingAudio || isSpeaking ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </Button>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-slate-700">
                    {isPlayingAudio || isSpeaking ? "Playing..." : "Tap to hear voice guidance"}
                  </span>
                  <Volume2 className="w-4 h-4 text-slate-500" />
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className={`bg-blue-500 h-2 rounded-full transition-all duration-300 ${
                      isPlayingAudio || isSpeaking ? "w-1/3" : "w-0"
                    }`}
                  />
                </div>
              </div>

              <Button
                size="sm"
                variant="ghost"
                onClick={playAudio}
                className="w-8 h-8 rounded-full hover:bg-slate-100"
                aria-label="Replay audio"
              >
                <RotateCcw className="w-3 h-3" />
              </Button>
            </div>
          )}

          {/* Timestamp */}
          <div className="flex items-center gap-2 mt-3 opacity-60">
            <Clock className="w-3 h-3" />
            <span className="text-xs text-slate-600">{formatTime(message.timestamp)}</span>
          </div>
        </Card>
      </div>
    </div>
  )
}
