"use client"

import { useState } from "react"
import { Play, Pause, ChevronLeft, ChevronRight, Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface Step {
  id: number
  instruction: string
  audioUrl: string
  type: "reassurance" | "action" | "assessment" | "critical"
}

interface InstructionCardProps {
  step: Step
  onNext: () => void
  onPrevious: () => void
  isFirst: boolean
  isLast: boolean
}

export default function InstructionCard({ step, onNext, onPrevious, isFirst, isLast }: InstructionCardProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  const getCardStyle = () => {
    switch (step.type) {
      case "critical":
        return "border-red-200 bg-red-50/50"
      case "action":
        return "border-blue-200 bg-blue-50/50"
      case "assessment":
        return "border-yellow-200 bg-yellow-50/50"
      default:
        return "border-green-200 bg-green-50/50"
    }
  }

  const getTypeLabel = () => {
    switch (step.type) {
      case "critical":
        return { text: "Critical", color: "bg-red-100 text-red-700" }
      case "action":
        return { text: "Action Required", color: "bg-blue-100 text-blue-700" }
      case "assessment":
        return { text: "Assessment", color: "bg-yellow-100 text-yellow-700" }
      default:
        return { text: "Guidance", color: "bg-green-100 text-green-700" }
    }
  }

  const typeLabel = getTypeLabel()

  const handlePlayAudio = () => {
    setIsPlaying(!isPlaying)
    // In a real app, this would control actual audio playback
    setTimeout(() => setIsPlaying(false), 3000) // Simulate audio duration
  }

  return (
    <Card className={`p-6 ${getCardStyle()} backdrop-blur-sm shadow-lg`}>
      {/* Step Type Badge */}
      <div className="mb-4">
        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${typeLabel.color}`}>
          {typeLabel.text}
        </span>
      </div>

      {/* Instruction Text */}
      <div className="mb-6">
        <p className="text-xl leading-relaxed text-slate-800 font-medium">{step.instruction}</p>
      </div>

      {/* Audio Controls */}
      <div className="mb-6">
        <div className="flex items-center gap-4 p-4 bg-white/70 rounded-xl border border-slate-200">
          <Button
            size="lg"
            onClick={handlePlayAudio}
            className={`w-12 h-12 rounded-full ${isPlaying ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"}`}
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </Button>
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-700">
              {isPlaying ? "Playing voice guidance..." : "Tap to hear voice guidance"}
            </p>
            <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
              <div
                className={`bg-blue-500 h-2 rounded-full transition-all duration-300 ${isPlaying ? "w-1/3" : "w-0"}`}
              />
            </div>
          </div>
          <Volume2 className="w-5 h-5 text-slate-500" />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={isFirst}
          className="flex items-center gap-2 disabled:opacity-50 bg-transparent"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Button>

        <div className="text-sm text-slate-500">Step {step.id}</div>

        <Button
          onClick={onNext}
          disabled={isLast}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  )
}
