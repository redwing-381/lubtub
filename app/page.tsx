"use client"

import { useState } from "react"
import { Mic, Phone, MessageCircle, Heart, Shield, Zap, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import LanguageModal from "@/components/language-modal"
import AccessibilityPanel from "@/components/accessibility-panel"

export default function HomePage() {
  const [showLanguageModal, setShowLanguageModal] = useState(false)
  const [showAccessibility, setShowAccessibility] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50">
      {/* Accessibility Quick Access */}
      <div className="fixed top-4 right-4 z-50">
        <Button
          onClick={() => setShowAccessibility(true)}
          className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg"
          aria-label="Accessibility Options"
        >
          ♿
        </Button>
      </div>

      {/* Header */}
      <header className="px-6 py-8 text-center">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div className="absolute inset-0 animate-ping">
              <div className="w-12 h-12 bg-blue-400 rounded-full opacity-20"></div>
            </div>
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 tracking-tight">Lifeline AI</h1>
            <p className="text-lg text-slate-600 font-medium">Your Emergency Conversation Partner</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-4 max-w-lg mx-auto">
        {/* Primary Message */}
        <div className="text-center mb-8 p-8 bg-white/80 backdrop-blur-sm rounded-3xl border-2 border-blue-100 shadow-xl">
          <MessageCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-800 mb-3">I'm here to help you through this emergency</h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Just talk to me like you would a friend. I'll guide you step by step until help arrives.
          </p>
        </div>

        {/* Primary CTA - Conversational */}
        <div className="mb-6">
          <Link href="/chat">
            <Button
              size="lg"
              className="w-full h-20 text-xl font-bold bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-200 border-0"
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Mic className="w-8 h-8" />
                  <div className="absolute inset-0 animate-pulse">
                    <Mic className="w-8 h-8 opacity-30" />
                  </div>
                </div>
                <div className="text-left">
                  <div>🚨 Start Emergency Chat</div>
                  <div className="text-sm opacity-90 font-normal">Tap and speak or type</div>
                </div>
              </div>
            </Button>
          </Link>
        </div>

        {/* Quick Emergency Actions */}
        <div className="mb-8 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-red-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4 text-center">Quick Emergency Actions</h3>
          <div className="space-y-3">
            <Button
              size="lg"
              className="w-full h-16 bg-red-600 hover:bg-red-700 text-white rounded-2xl text-lg font-semibold"
              onClick={() => window.open("tel:911")}
            >
              <Phone className="w-6 h-6 mr-3" />
              Call 911 Now
            </Button>
            <div className="grid grid-cols-2 gap-3">
              <Link href="/chat?emergency=cpr">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full h-14 border-2 border-blue-300 hover:bg-blue-50 rounded-xl bg-white/80 text-slate-700 font-medium"
                >
                  💓 CPR Help
                </Button>
              </Link>
              <Link href="/chat?emergency=choking">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full h-14 border-2 border-blue-300 hover:bg-blue-50 rounded-xl bg-white/80 text-slate-700 font-medium"
                >
                  🫁 Choking Help
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Secondary Actions */}
        <div className="space-y-4">
          <Button
            variant="outline"
            size="lg"
            className="w-full h-14 text-slate-700 border-2 border-blue-200 hover:bg-blue-50 rounded-2xl bg-white/80 text-lg"
            onClick={() => setShowLanguageModal(true)}
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center">
                <span className="text-2xl mr-3">🌐</span>
                Choose Language
              </div>
              <ChevronRight className="w-5 h-5" />
            </div>
          </Button>

          <Link href="/how-it-works">
            <Button
              variant="outline"
              size="lg"
              className="w-full h-14 text-slate-700 border-2 border-blue-200 hover:bg-blue-50 rounded-2xl bg-white/80 text-lg"
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">ℹ️</span>
                  How This Works
                </div>
                <ChevronRight className="w-5 h-5" />
              </div>
            </Button>
          </Link>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 grid grid-cols-3 gap-6 text-center">
          <div className="p-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-sm text-slate-600 font-semibold">Medically Reviewed</p>
          </div>
          <div className="p-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Zap className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-sm text-slate-600 font-semibold">Real-Time Voice</p>
          </div>
          <div className="p-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Heart className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-sm text-slate-600 font-semibold">24/7 Available</p>
          </div>
        </div>
      </main>

      <LanguageModal isOpen={showLanguageModal} onClose={() => setShowLanguageModal(false)} />
      <AccessibilityPanel isOpen={showAccessibility} onClose={() => setShowAccessibility(false)} />
    </div>
  )
}
