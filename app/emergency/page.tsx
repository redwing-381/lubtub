"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Mic, Phone, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import EmotionalSupport from "@/components/emotional-support"
import InstructionCard from "@/components/instruction-card"
import EmergencyContacts from "@/components/emergency-contacts"

export default function EmergencyPage() {
  const [elapsedTime, setElapsedTime] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [isListening, setIsListening] = useState(false)

  const emergencySteps = [
    {
      id: 1,
      instruction: "Take a deep breath. You're doing the right thing by seeking help.",
      audioUrl: "/audio/step1.mp3",
      type: "reassurance",
    },
    {
      id: 2,
      instruction: "Check if the person is conscious. Gently tap their shoulders and shout 'Are you okay?'",
      audioUrl: "/audio/step2.mp3",
      type: "action",
    },
    {
      id: 3,
      instruction: "Look for signs of breathing. Watch their chest for 10 seconds.",
      audioUrl: "/audio/step3.mp3",
      type: "assessment",
    },
    {
      id: 4,
      instruction: "If they're not breathing normally, call emergency services immediately.",
      audioUrl: "/audio/step4.mp3",
      type: "critical",
    },
  ]

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

  const call911 = () => {
    try {
      // For mobile devices, use tel: protocol
      if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)) {
        window.location.href = "tel:911"
      } else {
        // For desktop, show confirmation
        const confirmed = confirm("This will open your phone app to call 911. Continue?")
        if (confirmed) {
          window.open("tel:911", "_self")
        }
      }
    } catch (error) {
      // Fallback alert with phone number
      alert("Please dial 911 immediately for emergency services.")
    }
  }

  const restartGuide = () => {
    setCurrentStep(0)
    setElapsedTime(0)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50">
      {/* Emergency Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-red-200 sticky top-0 z-50">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-slate-600">
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back
              </Button>
            </Link>
            <div className="text-right">
              <div className="text-sm font-medium text-slate-600">Emergency Active</div>
              <div className="text-lg font-bold text-red-600">{formatTime(elapsedTime)}</div>
            </div>
          </div>

          {/* Status Bar */}
          <div className="w-full bg-red-100 rounded-full h-2">
            <div
              className="bg-red-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentStep + 1) / emergencySteps.length) * 100}%` }}
            />
          </div>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-120px)]">
        {/* Main Instruction Area */}
        <main className="flex-1 p-4">
          <div className="max-w-2xl mx-auto">
            <InstructionCard
              step={emergencySteps[currentStep]}
              onNext={() => setCurrentStep((prev) => Math.min(prev + 1, emergencySteps.length - 1))}
              onPrevious={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
              isFirst={currentStep === 0}
              isLast={currentStep === emergencySteps.length - 1}
            />

            {/* Voice Input */}
            <Card className="mt-6 p-6 bg-white/70 backdrop-blur-sm border-blue-100">
              <div className="text-center">
                <p className="text-slate-600 mb-4">Tap to speak your response or ask questions</p>
                <Button
                  size="lg"
                  variant={isListening ? "destructive" : "default"}
                  className={`w-20 h-20 rounded-full ${isListening ? "animate-pulse" : ""}`}
                  onClick={() => setIsListening(!isListening)}
                >
                  <Mic className="w-8 h-8" />
                </Button>
                {isListening && <p className="text-sm text-blue-600 mt-2 animate-pulse">Listening...</p>}
              </div>
            </Card>

            {/* Emergency Actions */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button 
                size="lg" 
                className="h-14 bg-red-600 hover:bg-red-700 text-white rounded-xl"
                onClick={call911}
              >
                <Phone className="w-5 h-5 mr-2" />
                Call 911
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-14 border-blue-200 hover:bg-blue-50 rounded-xl bg-transparent"
                onClick={restartGuide}
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Restart Guide
              </Button>
            </div>

            {/* Emergency Contacts */}
            <Card className="mt-6 p-6 bg-white/70 backdrop-blur-sm border-blue-100">
              <EmergencyContacts />
            </Card>
          </div>
        </main>

        {/* Emotional Support Sidebar */}
        <aside className="lg:w-80 lg:border-l lg:border-blue-100">
          <EmotionalSupport />
        </aside>
      </div>
    </div>
  )
}
