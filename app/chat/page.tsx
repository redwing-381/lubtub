"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Mic, Send, ArrowLeft, Phone, AlertTriangle, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import Link from "next/link"

interface Message {
  id: string
  type: "user" | "ai"
  content: string
  timestamp: Date
  urgency?: "low" | "medium" | "high" | "critical"
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content:
        "Hi, I'm your Lifeline AI assistant. I'm here to help you through this emergency. Take a deep breath - you're doing the right thing by reaching out. Can you tell me what's happening?",
      timestamp: new Date(),
      urgency: "low",
    },
  ])
  const [inputText, setInputText] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [audioEnabled, setAudioEnabled] = useState(true)
  const [elapsedTime, setElapsedTime] = useState(0)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime((prev) => prev + 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const sendMessage = (content: string) => {
    if (!content.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: content.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputText("")

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(content)
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: aiResponse.content,
        timestamp: new Date(),
        urgency: aiResponse.urgency,
      }
      setMessages((prev) => [...prev, aiMessage])

      // Auto-play audio if enabled
      if (audioEnabled) {
        setIsSpeaking(true)
        setTimeout(() => setIsSpeaking(false), 3000)
      }
    }, 1000)
  }

  const generateAIResponse = (
    userInput: string,
  ): { content: string; urgency: "low" | "medium" | "high" | "critical" } => {
    const input = userInput.toLowerCase()

    if (input.includes("not breathing") || input.includes("unconscious")) {
      return {
        content:
          "This is critical. First, check if they're responsive by tapping their shoulders firmly and shouting 'Are you okay?' If no response, call 911 immediately. Are you able to call 911 right now?",
        urgency: "critical",
      }
    }

    if (input.includes("choking")) {
      return {
        content:
          "I understand someone is choking. Are they able to cough or make any sounds? If they can cough, encourage them to keep coughing. If they can't cough or breathe, we need to act quickly.",
        urgency: "high",
      }
    }

    if (input.includes("chest pain") || input.includes("heart")) {
      return {
        content:
          "Chest pain can be serious. Have them sit down and rest. If they have prescribed heart medication like nitroglycerin, help them take it. Call 911 if the pain is severe or doesn't improve. How severe is the pain on a scale of 1-10?",
        urgency: "high",
      }
    }

    return {
      content:
        "I understand. Can you give me more details about what you're seeing? The more information you can provide, the better I can help guide you through this situation.",
      urgency: "medium",
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage(inputText)
    }
  }

  const toggleVoiceInput = () => {
    setIsListening(!isListening)
  }

  const getUrgencyStyle = (urgency?: string) => {
    switch (urgency) {
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

  const getUrgencyIcon = (urgency?: string) => {
    switch (urgency) {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50 flex flex-col">
      {/* Emergency Header */}
      <header className="bg-white/95 backdrop-blur-sm border-b-2 border-red-200 sticky top-0 z-50 shadow-sm">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <Link href="/">
              <Button variant="ghost" size="lg" className="text-slate-600 hover:bg-slate-100 rounded-xl px-4 py-2">
                <ArrowLeft className="w-5 h-5 mr-2" />
                <span className="text-lg">Back</span>
              </Button>
            </Link>

            <div className="text-center">
              <div className="flex items-center gap-2 justify-center mb-1">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-lg font-bold text-red-600">EMERGENCY ACTIVE</span>
              </div>
              <div className="text-2xl font-bold text-slate-800">{formatTime(elapsedTime)}</div>
            </div>

            <Button
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white rounded-xl px-4 py-2 shadow-lg"
              onClick={() => window.open("tel:911")}
            >
              <Phone className="w-5 h-5 mr-2" />
              <span className="text-lg font-semibold">911</span>
            </Button>
          </div>

          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0" />
              <div>
                <p className="text-red-800 font-semibold text-lg">Emergency Conversation Active</p>
                <p className="text-red-700 text-sm">Stay calm. I'm here to guide you through this situation.</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Messages */}
      <main className="flex-1 overflow-y-auto px-4 py-4">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[85%] lg:max-w-[70%] ${message.type === "user" ? "max-w-[80%]" : ""}`}>
                {message.type === "user" ? (
                  <Card className="p-4 bg-blue-500 text-white border-0 rounded-3xl rounded-br-lg shadow-lg">
                    <p className="text-lg leading-relaxed">{message.content}</p>
                    <div className="flex items-center justify-end gap-2 mt-2 opacity-80">
                      <span className="text-xs">
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                  </Card>
                ) : (
                  <Card
                    className={`p-6 border-2 ${getUrgencyStyle(message.urgency)} backdrop-blur-sm shadow-lg rounded-3xl rounded-bl-lg`}
                  >
                    {message.urgency && (
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-lg">{getUrgencyIcon(message.urgency)}</span>
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
                    <p className="text-lg leading-relaxed text-slate-800 mb-4">{message.content}</p>
                    <div className="flex items-center gap-2 mt-3 opacity-60">
                      <span className="text-xs text-slate-600">
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                  </Card>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Voice Controls */}
      <div className="bg-white/95 backdrop-blur-sm border-t-2 border-blue-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center items-center gap-4 mb-4">
            <Button
              size="lg"
              variant="outline"
              onClick={() => setAudioEnabled(!audioEnabled)}
              className={`w-14 h-14 rounded-full border-2 ${audioEnabled ? "border-blue-300 bg-blue-50 hover:bg-blue-100" : "border-slate-300 bg-slate-50 hover:bg-slate-100"}`}
            >
              {audioEnabled ? (
                <Volume2 className="w-6 h-6 text-blue-600" />
              ) : (
                <VolumeX className="w-6 h-6 text-slate-500" />
              )}
            </Button>

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

            <Button
              size="lg"
              onClick={() => window.open("tel:911")}
              className="w-14 h-14 rounded-full bg-red-600 hover:bg-red-700 border-0 shadow-lg"
            >
              <Phone className="w-6 h-6" />
            </Button>
          </div>

          {!isListening && !isSpeaking && (
            <div className="text-center mb-4">
              <p className="text-slate-600 text-lg">
                💬 Type your message below or use voice input for hands-free help
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white/90 backdrop-blur-sm border-t-2 border-blue-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-3 items-end">
            <div className="flex-1">
              <Textarea
                ref={textareaRef}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={isListening ? "Listening..." : "Type your message or tap the mic to speak..."}
                className="min-h-[60px] max-h-32 text-lg p-4 rounded-2xl border-2 border-blue-200 focus:border-blue-500 resize-none bg-white"
                disabled={isListening}
              />
            </div>

            <div className="flex gap-2">
              <Button
                size="lg"
                onClick={toggleVoiceInput}
                className={`w-14 h-14 rounded-full ${isListening ? "bg-red-500 hover:bg-red-600 animate-pulse" : "bg-blue-500 hover:bg-blue-600"}`}
              >
                <Mic className="w-6 h-6" />
              </Button>

              <Button
                size="lg"
                onClick={() => sendMessage(inputText)}
                disabled={!inputText.trim() || isListening}
                className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 disabled:opacity-50"
              >
                <Send className="w-6 h-6" />
              </Button>
            </div>
          </div>

          {/* Quick Response Buttons */}
          <div className="mt-4 flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => sendMessage("Yes")}
              className="bg-white/80 border-blue-200 hover:bg-blue-50 text-lg px-6 py-2 rounded-full"
            >
              ✅ Yes
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => sendMessage("No")}
              className="bg-white/80 border-blue-200 hover:bg-blue-50 text-lg px-6 py-2 rounded-full"
            >
              ❌ No
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => sendMessage("I need help")}
              className="bg-white/80 border-blue-200 hover:bg-blue-50 text-lg px-6 py-2 rounded-full"
            >
              🆘 I need help
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => sendMessage("What should I do next?")}
              className="bg-white/80 border-blue-200 hover:bg-blue-50 text-lg px-6 py-2 rounded-full"
            >
              ❓ What next?
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
