"use client"

import { useEffect } from "react"
import "./wave-background.css"

interface WaveBackgroundProps {
  lineColor?: string
  backgroundColor?: string
  waveSpeed?: number
}

export default function WaveBackground({ 
  lineColor = "rgba(255, 255, 255, 0.3)",
  backgroundColor = "#0f172a",
  waveSpeed = 0.01
}: WaveBackgroundProps) {
  useEffect(() => {
    // Add dynamic CSS variables for customization
    const root = document.documentElement
    if (root) {
      root.style.setProperty('--wave-line-color', lineColor)
      root.style.setProperty('--wave-bg-color', backgroundColor)
      root.style.setProperty('--wave-speed', waveSpeed.toString())
      
      // Force a repaint to ensure styles are applied
      ;(root.style as any).display = 'none'
      ;(root.style as any).offsetHeight // Force reflow
      ;(root.style as any).display = ''
    }
  }, [lineColor, backgroundColor, waveSpeed])

  return (
    <div className="wave-background-container">
      <div className="wave-background-layer wave-1"></div>
      <div className="wave-background-layer wave-2"></div>
    </div>
  )
}
