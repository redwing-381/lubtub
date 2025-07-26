"use client"

import { useState } from "react"
import { AlertTriangle, Globe, Settings, Play, Heart, Phone, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import LanguageModal from "@/components/language-modal"
import AccessibilityPanel from "@/components/accessibility-panel"
import EmergencyContacts from "@/components/emergency-contacts"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import VoiceAssistant from '@/components/VoiceAssistant';


export default function HomePage() {
  const [showLanguageModal, setShowLanguageModal] = useState(false)
  const [showAccessibilityPanel, setShowAccessibilityPanel] = useState(false)
  const [showEmergencyContacts, setShowEmergencyContacts] = useState(false)

  const call108 = () => {
    try {
      // For mobile devices, use tel: protocol
      if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)) {
        window.location.href = "tel:108"
      } else {
        // For desktop, show confirmation
        const confirmed = confirm("This will open your phone app to call 108. Continue?")
        if (confirmed) {
          window.open("tel:108", "_self")
        }
      }
    } catch (error) {
      // Fallback alert with phone number
      alert("Please dial 108 immediately for emergency services.")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <img src="/circle_logo.png" alt="LubTub Logo" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover bg-blue-600" />
              <div className="text-center sm:text-left">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800">LubTub</h1>
                <p className="text-sm sm:text-base text-slate-600">Real-Time First Aid Assistant</p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowLanguageModal(true)}
                className="h-12 sm:h-14 px-4 sm:px-6 rounded-xl border-2 border-blue-300 hover:bg-blue-50 bg-white shadow-md font-medium text-blue-700 hover:text-blue-800"
              >
                <Globe className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                <span className="text-sm sm:text-base">Language</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAccessibilityPanel(true)}
                className="h-12 sm:h-14 px-4 sm:px-6 rounded-xl border-2 border-blue-300 hover:bg-blue-50 bg-white shadow-md font-medium text-blue-700 hover:text-blue-800"
              >
                <Settings className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                <span className="text-sm sm:text-base">Accessibility</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-4xl mx-auto">
          {/* Main CTA Card */}
          <Card className="p-6 sm:p-8 lg:p-12 bg-white/80 backdrop-blur-sm border-2 border-blue-200 shadow-xl rounded-3xl mb-8">
            <div className="text-center">
              <div className="mb-6 sm:mb-8">
                <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <AlertTriangle className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-red-600" />
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mb-3 sm:mb-4">
                  Emergency Assistance
                </h2>
                <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Real help. Real-time. Right when you need it most.
                </p>
              </div>

                            <Button
                size="lg"
                onClick={() => window.open('http://localhost:8000', '_blank')}
                className="w-full sm:w-auto h-14 sm:h-16 lg:h-18 px-8 sm:px-12 lg:px-16 text-lg sm:text-xl lg:text-2xl font-semibold bg-red-600 hover:bg-red-700 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 mr-3" />
                Start Emergency Aid
              </Button>

              <p className="text-xs sm:text-sm text-slate-500 mt-4 sm:mt-6">
                Available 24/7 • Voice-guided assistance • Multiple languages
              </p>
            </div>
          </Card>

          {/* Quick Emergency Actions */}
          <Card className="p-6 bg-white/70 backdrop-blur-sm border-2 border-red-200 shadow-xl rounded-3xl mb-8">
            <h3 className="text-xl font-bold text-slate-800 text-center mb-6">Quick Emergency Actions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button 
                size="lg" 
                className="h-16 bg-red-600 hover:bg-red-700 text-white rounded-2xl shadow-lg font-bold text-lg"
                onClick={call108}
              >
                <Phone className="w-6 h-6 mr-3" />
                Call 108 Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-16 border-2 border-blue-300 hover:bg-blue-50 rounded-2xl bg-white shadow-lg font-bold text-lg text-blue-700"
                onClick={() => setShowEmergencyContacts(true)}
              >
                <Users className="w-6 h-6 mr-3" />
                Emergency Contacts
              </Button>
            </div>
          </Card>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8">
            <Card className="p-4 sm:p-6 bg-white/70 backdrop-blur-sm border-blue-100 rounded-2xl transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="text-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Play className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-slate-800 mb-2">Voice Guidance</h3>
                <p className="text-sm sm:text-base text-slate-600">
                  Clear, calm voice instructions to guide you through emergency procedures
                </p>
              </div>
            </Card>

            <Card className="p-4 sm:p-6 bg-white/70 backdrop-blur-sm border-blue-100 rounded-2xl transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="text-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Globe className="w-6 h-6 sm:w-7 sm:h-7 text-green-600" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-slate-800 mb-2">Multi-Language</h3>
                <p className="text-sm sm:text-base text-slate-600">
                  Support for 10+ languages with native voice assistance
                </p>
              </div>
            </Card>

            <Card className="p-4 sm:p-6 bg-white/70 backdrop-blur-sm border-blue-100 rounded-2xl transition-transform duration-300 hover:scale-105 hover:shadow-2xl sm:col-span-2 lg:col-span-1">
              <div className="text-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Settings className="w-6 h-6 sm:w-7 sm:h-7 text-purple-600" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-slate-800 mb-2">Accessible</h3>
                <p className="text-sm sm:text-base text-slate-600">
                  Designed for all users with comprehensive accessibility features
                </p>
              </div>
            </Card>
          </div>

          {/* Secondary Actions */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link href="/how-it-works">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg border-2 border-blue-200 hover:bg-blue-50 rounded-xl bg-transparent"
              >
                How It Works
              </Button>
            </Link>
           
          </div>
        </div>
      </main>

      {/* Modals */}
      <LanguageModal isOpen={showLanguageModal} onClose={() => setShowLanguageModal(false)} />
      <AccessibilityPanel isOpen={showAccessibilityPanel} onClose={() => setShowAccessibilityPanel(false)} />
      
      {/* Emergency Contacts Modal */}
      <Dialog open={showEmergencyContacts} onOpenChange={setShowEmergencyContacts}>
        <DialogContent className="w-[95vw] max-w-2xl mx-auto bg-white shadow-2xl border-4 border-blue-400 rounded-3xl max-h-[90vh] overflow-hidden">
          <DialogHeader className="pb-6 bg-blue-50 -m-6 mb-0 p-6 rounded-t-3xl border-b-2 border-blue-200">
            <DialogTitle className="text-2xl md:text-3xl font-bold text-gray-900 text-center flex flex-col md:flex-row items-center justify-center gap-3">
              <Users className="w-8 h-8 text-blue-700" />
              <span className="text-blue-800">Emergency Contacts</span>
            </DialogTitle>
          </DialogHeader>
          <div className="p-6">
            <EmergencyContacts />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}