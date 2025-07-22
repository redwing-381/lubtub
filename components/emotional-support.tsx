"use client"

import { useState } from "react"
import { Heart, Play, Pause, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import BreathingAnimation from "./breathing-animation"

export default function EmotionalSupport() {
  const [isPlayingAffirmation, setIsPlayingAffirmation] = useState(false)

  const affirmations = [
    "You're doing great. Stay focused.",
    "Help is on the way. Keep going.",
    "You're being incredibly brave right now.",
    "Every step you take is helping.",
    "Stay calm. You've got this.",
  ]

  const [currentAffirmation, setCurrentAffirmation] = useState(0)

  const playAffirmation = () => {
    setIsPlayingAffirmation(!isPlayingAffirmation)
    // Simulate audio playback
    setTimeout(() => setIsPlayingAffirmation(false), 4000)
  }

  const nextAffirmation = () => {
    setCurrentAffirmation((prev) => (prev + 1) % affirmations.length)
  }

  return (
    <div className="p-4 space-y-6 bg-gradient-to-b from-blue-50/50 to-white/50 min-h-full">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-slate-800 mb-2">Stay Calm</h3>
        <p className="text-sm text-slate-600">Emotional support while you help</p>
      </div>

      {/* Breathing Exercise */}
      <Card className="p-6 bg-white/70 backdrop-blur-sm border-blue-100 text-center">
        <h4 className="font-medium text-slate-800 mb-4">Breathing Exercise</h4>
        <div className="scale-75">
          <BreathingAnimation />
        </div>
      </Card>

      {/* Affirmations */}
      <Card className="p-6 bg-white/70 backdrop-blur-sm border-blue-100">
        <div className="flex items-center gap-2 mb-4">
          <Heart className="w-5 h-5 text-red-500" />
          <h4 className="font-medium text-slate-800">Encouragement</h4>
        </div>

        <div className="mb-4">
          <p className="text-slate-700 text-center italic leading-relaxed">"{affirmations[currentAffirmation]}"</p>
        </div>

        <div className="flex gap-2">
          <Button
            size="sm"
            onClick={playAffirmation}
            className={`flex-1 ${isPlayingAffirmation ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"}`}
          >
            {isPlayingAffirmation ? <Pause className="w-4 h-4 mr-1" /> : <Play className="w-4 h-4 mr-1" />}
            {isPlayingAffirmation ? "Playing" : "Listen"}
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={nextAffirmation}
            className="border-blue-200 hover:bg-blue-50 bg-transparent"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </Card>

      {/* Quick Tips */}
      <Card className="p-4 bg-white/70 backdrop-blur-sm border-blue-100">
        <h4 className="font-medium text-slate-800 mb-3">Remember</h4>
        <ul className="space-y-2 text-sm text-slate-600">
          <li className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
            You're not alone in this
          </li>
          <li className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
            Professional help is coming
          </li>
          <li className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
            Follow the voice guidance
          </li>
        </ul>
      </Card>
    </div>
  )
}
