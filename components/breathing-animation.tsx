"use client"

import { useEffect, useState } from "react"

export default function BreathingAnimation() {
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale">("inhale")
  const [count, setCount] = useState(4)

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev === 1) {
          setPhase((current) => {
            if (current === "inhale") return "hold"
            if (current === "hold") return "exhale"
            return "inhale"
          })
          return phase === "hold" ? 2 : 4
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [phase])

  const getPhaseText = () => {
    switch (phase) {
      case "inhale":
        return "Breathe In"
      case "hold":
        return "Hold"
      case "exhale":
        return "Breathe Out"
    }
  }

  const getCircleScale = () => {
    switch (phase) {
      case "inhale":
        return "scale-110"
      case "hold":
        return "scale-110"
      case "exhale":
        return "scale-90"
    }
  }

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-32 mb-4">
        <div
          className={`absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-blue-500 transition-transform duration-1000 ease-in-out ${getCircleScale()}`}
          style={{
            boxShadow: "0 0 30px rgba(59, 130, 246, 0.3)",
          }}
        />
        <div className="absolute inset-4 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
          <span className="text-2xl font-bold text-white">{count}</span>
        </div>
      </div>
      <p className="text-lg font-medium text-slate-700">{getPhaseText()}</p>
      <p className="text-sm text-slate-500 mt-1">Follow the rhythm to stay calm</p>
    </div>
  )
}
