"use client"

import { useState } from "react"
import { Play, Check, Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface LanguageModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function LanguageModal({ isOpen, onClose }: LanguageModalProps) {
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const [playingPreview, setPlayingPreview] = useState<string | null>(null)

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸", sample: "I'm here to help you through this emergency." },
    { code: "es", name: "Español", flag: "🇪🇸", sample: "Estoy aquí para ayudarte en esta emergencia." },
    { code: "fr", name: "Français", flag: "🇫🇷", sample: "Je suis là pour vous aider dans cette urgence." },
    { code: "de", name: "Deutsch", flag: "🇩🇪", sample: "Ich bin hier, um Ihnen in diesem Notfall zu helfen." },
    { code: "it", name: "Italiano", flag: "🇮🇹", sample: "Sono qui per aiutarti in questa emergenza." },
    { code: "pt", name: "Português", flag: "🇵🇹", sample: "Estou aqui para ajudá-lo nesta emergência." },
    { code: "ru", name: "Русский", flag: "🇷🇺", sample: "Я здесь, чтобы помочь вам в этой чрезвычайной ситуации." },
    { code: "zh", name: "中文", flag: "🇨🇳", sample: "我在这里帮助您处理这个紧急情况。" },
    { code: "ja", name: "日本語", flag: "🇯🇵", sample: "この緊急事態でお手伝いします。" },
    { code: "ko", name: "한국어", flag: "🇰🇷", sample: "이 응급 상황에서 도와드리겠습니다." },
  ]

  const playPreview = (langCode: string) => {
    setPlayingPreview(langCode)
    setTimeout(() => setPlayingPreview(null), 3000)
  }

  const handleSave = () => {
    localStorage.setItem("lifeline-language", selectedLanguage)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-lg mx-auto bg-white shadow-2xl border-4 border-blue-400 rounded-3xl max-h-[90vh] overflow-hidden">
        <DialogHeader className="pb-6 bg-blue-50 -m-6 mb-0 p-6 rounded-t-3xl border-b-2 border-blue-200">
          <DialogTitle className="text-2xl md:text-3xl font-bold text-gray-900 text-center flex flex-col md:flex-row items-center justify-center gap-3">
            <span className="text-3xl md:text-4xl">🌐</span>
            <span className="text-blue-800">Choose Your Language</span>
          </DialogTitle>
        </DialogHeader>

        <div className="px-4 py-4">
          <p className="text-lg font-semibold text-gray-800 text-center mb-6 bg-blue-50 p-3 rounded-xl border border-blue-200">
            Select your preferred language for emergency voice guidance
          </p>

          <div className="max-h-[50vh] md:max-h-96 overflow-y-auto space-y-3 px-1">
            {languages.map((lang) => (
              <div
                key={lang.code}
                className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all shadow-sm ${
                  selectedLanguage === lang.code
                    ? "border-blue-600 bg-blue-100 shadow-md"
                    : "border-gray-300 hover:border-blue-400 hover:bg-blue-50 bg-white"
                }`}
                onClick={() => setSelectedLanguage(lang.code)}
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <span className="text-3xl flex-shrink-0">{lang.flag}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-lg font-bold text-gray-900">{lang.name}</p>
                    <p className="text-sm font-medium text-gray-700 italic leading-tight">{lang.sample}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0 ml-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation()
                      playPreview(lang.code)
                    }}
                    className="w-10 h-10 rounded-full hover:bg-blue-200 border-2 border-blue-300 bg-blue-50"
                    aria-label={`Preview ${lang.name} voice`}
                  >
                    {playingPreview === lang.code ? (
                      <Volume2 className="w-4 h-4 text-blue-700 animate-pulse" />
                    ) : (
                      <Play className="w-4 h-4 text-blue-700" />
                    )}
                  </Button>

                  {selectedLanguage === lang.code && (
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                      <Check className="w-5 h-5 text-white font-bold" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t-2 border-gray-200">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 h-14 text-lg font-semibold border-3 border-gray-400 hover:bg-gray-100 rounded-2xl bg-white text-gray-800"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="flex-1 h-14 text-lg font-semibold bg-blue-600 hover:bg-blue-700 rounded-2xl text-white shadow-lg"
            >
              Save Language
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
