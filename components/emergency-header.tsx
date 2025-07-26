"use client"

import { ArrowLeft, Phone, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface EmergencyHeaderProps {
  elapsedTime: number
}

export default function EmergencyHeader({ elapsedTime }: EmergencyHeaderProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b-2 border-red-200 sticky top-0 z-50 shadow-sm">
      <div className="px-4 py-4">
        <div className="flex items-center justify-between mb-3">
          <Link href="/">
            <Button
              variant="ghost"
              size="lg"
              className="text-slate-600 hover:bg-slate-100 rounded-xl px-4 py-2"
              aria-label="Go back to home"
            >
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
            onClick={() => window.open("tel:108")}
            aria-label="Call 108 emergency services"
          >
            <Phone className="w-5 h-5 mr-2" />
            <span className="text-lg font-semibold">108</span>
          </Button>
        </div>

        {/* Emergency Notice */}
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
  )
}
