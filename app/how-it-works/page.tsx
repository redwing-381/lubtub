import { ArrowLeft, Ear, MessageSquare, Heart, Phone, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"

export default function HowItWorksPage() {
  const steps = [
    {
      icon: Ear,
      title: "Detect Emergency",
      description: "Tell us what's happening. Our AI listens and understands the situation quickly.",
      color: "text-blue-600",
    },
    {
      icon: MessageSquare,
      title: "Speak or Type Symptoms",
      description: "Describe what you see. Voice input is prioritized for hands-free operation.",
      color: "text-green-600",
    },
    {
      icon: Heart,
      title: "Get Voice Guidance",
      description: "Receive step-by-step instructions with clear, calm voice guidance from Murf AI.",
      color: "text-red-600",
    },
    {
      icon: Phone,
      title: "Call Emergency Services",
      description: "We'll help you contact professional help when needed and guide you until they arrive.",
      color: "text-purple-600",
    },
    {
      icon: Shield,
      title: "Stay Calm & Supported",
      description: "Continuous emotional support and breathing exercises to keep you focused.",
      color: "text-indigo-600",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50">
      <header className="px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center gap-4 mb-4 sm:mb-6">
          <Link href="/">
            <Button variant="ghost" size="sm" className="text-slate-600 hover:bg-slate-100 rounded-xl">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back
            </Button>
          </Link>
        </div>
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mb-3 sm:mb-4">
            How Lifeline AI Works
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Professional emergency guidance powered by AI voice technology, designed to keep you calm and informed
            during critical moments.
          </p>
        </div>
      </header>

      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6 sm:space-y-8">
            {steps.map((step, index) => (
              <Card
                key={index}
                className="p-4 sm:p-6 lg:p-8 bg-white/70 backdrop-blur-sm border-blue-100 shadow-lg rounded-2xl sm:rounded-3xl"
              >
                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                  <div className="flex-shrink-0 mx-auto sm:mx-0">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full bg-blue-50 flex items-center justify-center">
                      <step.icon className={`w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 ${step.color}`} />
                    </div>
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3 mb-2 sm:mb-3">
                      <span className="text-xs sm:text-sm font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                        Step {index + 1}
                      </span>
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-slate-800">{step.title}</h3>
                    </div>
                    <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-8 sm:mt-12 text-center">
            <Card className="p-6 sm:p-8 lg:p-12 bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0 rounded-2xl sm:rounded-3xl">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4">Ready to Get Started?</h2>
              <p className="text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 opacity-90 max-w-2xl mx-auto">
                Lifeline AI is here 24/7 to provide professional emergency guidance when you need it most.
              </p>
              <Link href="/chat">
                <Button
                  size="lg"
                  className="w-full sm:w-auto h-12 sm:h-14 lg:h-16 px-6 sm:px-8 lg:px-12 text-base sm:text-lg lg:text-xl bg-white text-blue-600 hover:bg-blue-50 font-semibold rounded-xl sm:rounded-2xl"
                >
                  Start Emergency Aid
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
