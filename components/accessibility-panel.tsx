"use client"

import { useState } from "react"
import { Type, Contrast, Mic, Eye, Hand } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"

interface AccessibilityPanelProps {
  isOpen: boolean
  onClose: () => void
}

export default function AccessibilityPanel({ isOpen, onClose }: AccessibilityPanelProps) {
  const [fontSize, setFontSize] = useState([18])
  const [highContrast, setHighContrast] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)
  const [voiceOnly, setVoiceOnly] = useState(false)
  const [largeButtons, setLargeButtons] = useState(false)

  const applySettings = () => {
    document.documentElement.style.fontSize = `${fontSize[0]}px`

    if (highContrast) {
      document.documentElement.classList.add("high-contrast")
    } else {
      document.documentElement.classList.remove("high-contrast")
    }

    if (reduceMotion) {
      document.documentElement.classList.add("reduce-motion")
    } else {
      document.documentElement.classList.remove("reduce-motion")
    }

    if (largeButtons) {
      document.documentElement.classList.add("large-buttons")
    } else {
      document.documentElement.classList.remove("large-buttons")
    }

    localStorage.setItem(
      "accessibility-settings",
      JSON.stringify({
        fontSize: fontSize[0],
        highContrast,
        reduceMotion,
        voiceOnly,
        largeButtons,
      }),
    )

    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-md mx-auto bg-white/98 backdrop-blur-sm border-2 border-blue-200 rounded-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-xl md:text-2xl font-bold text-slate-800 text-center flex flex-col md:flex-row items-center justify-center gap-2 md:gap-3">
            <span className="text-2xl md:text-3xl">♿</span>
            <span>Accessibility Options</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 md:space-y-6 px-2">
          {/* Font Size */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Type className="w-5 h-5 md:w-6 md:h-6 text-blue-600 flex-shrink-0" />
              <label className="text-base md:text-lg font-semibold text-slate-800">Text Size</label>
            </div>
            <div className="px-2 md:px-4">
              <Slider value={fontSize} onValueChange={setFontSize} max={28} min={14} step={2} className="w-full" />
              <div className="flex justify-between text-xs md:text-sm text-slate-600 mt-1">
                <span>Small</span>
                <span className="font-semibold">{fontSize[0]}px</span>
                <span>Large</span>
              </div>
            </div>
          </div>

          {/* High Contrast */}
          <div className="flex items-center justify-between p-3 md:p-4 bg-slate-50 rounded-2xl">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <Contrast className="w-5 h-5 md:w-6 md:h-6 text-blue-600 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-base md:text-lg font-semibold text-slate-800 truncate">High Contrast</p>
                <p className="text-xs md:text-sm text-slate-600">Better visibility for low vision</p>
              </div>
            </div>
            <Switch checked={highContrast} onCheckedChange={setHighContrast} className="flex-shrink-0 ml-2" />
          </div>

          {/* Reduce Motion */}
          <div className="flex items-center justify-between p-3 md:p-4 bg-slate-50 rounded-2xl">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <Eye className="w-5 h-5 md:w-6 md:h-6 text-blue-600 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-base md:text-lg font-semibold text-slate-800 truncate">Reduce Motion</p>
                <p className="text-xs md:text-sm text-slate-600">Minimize animations</p>
              </div>
            </div>
            <Switch checked={reduceMotion} onCheckedChange={setReduceMotion} className="flex-shrink-0 ml-2" />
          </div>

          {/* Large Touch Targets */}
          <div className="flex items-center justify-between p-3 md:p-4 bg-slate-50 rounded-2xl">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <Hand className="w-5 h-5 md:w-6 md:h-6 text-blue-600 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-base md:text-lg font-semibold text-slate-800 truncate">Large Touch Targets</p>
                <p className="text-xs md:text-sm text-slate-600">Easier to tap when stressed</p>
              </div>
            </div>
            <Switch checked={largeButtons} onCheckedChange={setLargeButtons} className="flex-shrink-0 ml-2" />
          </div>

          {/* Voice-First Mode */}
          <div className="flex items-center justify-between p-3 md:p-4 bg-blue-50 rounded-2xl border-2 border-blue-200">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <Mic className="w-5 h-5 md:w-6 md:h-6 text-blue-600 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-base md:text-lg font-semibold text-slate-800 truncate">Voice-First Mode</p>
                <p className="text-xs md:text-sm text-slate-600">Prioritize audio interaction</p>
              </div>
            </div>
            <Switch checked={voiceOnly} onCheckedChange={setVoiceOnly} className="flex-shrink-0 ml-2" />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-200">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 h-12 md:h-14 text-base md:text-lg border-2 border-slate-300 hover:bg-slate-50 rounded-2xl bg-transparent"
            >
              Cancel
            </Button>
            <Button
              onClick={applySettings}
              className="flex-1 h-12 md:h-14 text-base md:text-lg bg-blue-600 hover:bg-blue-700 rounded-2xl"
            >
              Apply Settings
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
