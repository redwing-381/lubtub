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
      <DialogContent className="w-[95vw] max-w-md mx-auto bg-white shadow-2xl border-4 border-blue-400 rounded-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-6 bg-blue-50 -m-6 mb-0 p-6 rounded-t-3xl border-b-2 border-blue-200">
          <DialogTitle className="text-2xl md:text-3xl font-bold text-gray-900 text-center flex flex-col md:flex-row items-center justify-center gap-3">
            <span className="text-3xl md:text-4xl">♿</span>
            <span className="text-blue-800">Accessibility Options</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 px-2 py-4">
          {/* Font Size */}
          <div className="space-y-4 bg-gray-50 p-4 rounded-2xl border border-gray-200">
            <div className="flex items-center gap-3">
              <Type className="w-6 h-6 text-blue-700 flex-shrink-0" />
              <label className="text-lg font-bold text-gray-900">Text Size</label>
            </div>
            <div className="px-4">
              <Slider value={fontSize} onValueChange={setFontSize} max={28} min={14} step={2} className="w-full" />
              <div className="flex justify-between text-sm font-semibold text-gray-700 mt-2">
                <span>Small</span>
                <span className="text-blue-600 text-base">{fontSize[0]}px</span>
                <span>Large</span>
              </div>
            </div>
          </div>

          {/* High Contrast */}
          <div className="flex items-center justify-between p-4 bg-white rounded-2xl border-2 border-gray-300 shadow-sm">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <Contrast className="w-6 h-6 text-blue-700 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-lg font-bold text-gray-900">High Contrast</p>
                <p className="text-sm font-medium text-gray-700">Better visibility for low vision</p>
              </div>
            </div>
            <Switch checked={highContrast} onCheckedChange={setHighContrast} className="flex-shrink-0 ml-2 scale-125" />
          </div>

          {/* Reduce Motion */}
          <div className="flex items-center justify-between p-4 bg-white rounded-2xl border-2 border-gray-300 shadow-sm">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <Eye className="w-6 h-6 text-blue-700 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-lg font-bold text-gray-900">Reduce Motion</p>
                <p className="text-sm font-medium text-gray-700">Minimize animations</p>
              </div>
            </div>
            <Switch checked={reduceMotion} onCheckedChange={setReduceMotion} className="flex-shrink-0 ml-2 scale-125" />
          </div>

          {/* Large Touch Targets */}
          <div className="flex items-center justify-between p-4 bg-white rounded-2xl border-2 border-gray-300 shadow-sm">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <Hand className="w-6 h-6 text-blue-700 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-lg font-bold text-gray-900">Large Touch Targets</p>
                <p className="text-sm font-medium text-gray-700">Easier to tap when stressed</p>
              </div>
            </div>
            <Switch checked={largeButtons} onCheckedChange={setLargeButtons} className="flex-shrink-0 ml-2 scale-125" />
          </div>

          {/* Voice-First Mode */}
          <div className="flex items-center justify-between p-4 bg-blue-100 rounded-2xl border-2 border-blue-400 shadow-sm">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <Mic className="w-6 h-6 text-blue-700 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-lg font-bold text-gray-900">Voice-First Mode</p>
                <p className="text-sm font-medium text-gray-700">Prioritize audio interaction</p>
              </div>
            </div>
            <Switch checked={voiceOnly} onCheckedChange={setVoiceOnly} className="flex-shrink-0 ml-2 scale-125" />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t-2 border-gray-200">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 h-14 text-lg font-semibold border-3 border-gray-400 hover:bg-gray-100 rounded-2xl bg-white text-gray-800"
            >
              Cancel
            </Button>
            <Button
              onClick={applySettings}
              className="flex-1 h-14 text-lg font-semibold bg-blue-600 hover:bg-blue-700 rounded-2xl text-white shadow-lg"
            >
              Apply Settings
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
