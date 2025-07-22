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
      <DialogContent className="w-[95vw] max-w-lg mx-auto bg-white/98 backdrop-blur-sm border-2 border-blue-200 rounded-3xl max-h-[90vh] overflow-hidden">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-xl md:text-2xl font-bold text-slate-800 text-center flex flex-col md:flex-row items-center justify-center gap-2 md:gap-3">
            <span className="text-2xl md:text-3xl">🌐</span>
            <span>Choose Your Language</span>
          </DialogTitle>
        </DialogHeader>

        <div className="px-2">
          <p className="text-base md:text-lg text-slate-700 text-center mb-4 md:mb-6 font-medium">
            Select your preferred language for emergency voice guidance
          </p>

          <div className="max-h-[50vh] md:max-h-96 overflow-y-auto space-y-3 px-1">
            {languages.map((lang) => (
              <div
                key={lang.code}
                className={`flex items-center justify-between p-3 md:p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  selectedLanguage === lang.code
                    ? "border-blue-500 bg-blue-50 shadow-md"
                    : "border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 bg-white"
                }`}
                onClick={() => setSelectedLanguage(lang.code)}
              >
                <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
                  <span className="text-2xl md:text-3xl flex-shrink-0">{lang.flag}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-base md:text-lg font-semibold text-slate-800 truncate">{lang.name}</p>
                    <p className="text-xs md:text-sm text-slate-700 italic leading-tight">{lang.sample}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 md:gap-3 flex-shrink-0 ml-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation()
                      playPreview(lang.code)
                    }}
                    className="w-8 h-8 md:w-10 md:h-10 rounded-full hover:bg-blue-100 border-2 border-blue-200 bg-white"
                    aria-label={`Preview ${lang.name} voice`}
                  >
                    {playingPreview === lang.code ? (
                      <Volume2 className="w-3 h-3 md:w-4 md:h-4 text-blue-600 animate-pulse" />
                    ) : (
                      <Play className="w-3 h-3 md:w-4 md:h-4 text-blue-600" />
                    )}
                  </Button>

                  {selectedLanguage === lang.code && (
                    <div className="w-6 h-6 md:w-8 md:h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 md:w-5 md:h-5 text-white" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-6 md:mt-8 pt-4 border-t border-slate-200">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 h-12 md:h-14 text-base md:text-lg border-2 border-slate-300 hover:bg-slate-50 rounded-2xl bg-white"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="flex-1 h-12 md:h-14 text-base md:text-lg bg-blue-600 hover:bg-blue-700 rounded-2xl text-white"
            >
              Save Language
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
