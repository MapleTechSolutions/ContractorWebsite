"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { seasonalMessage } from "@/data/seasonal"

const DISMISS_KEY = "seasonal-bar-dismissed"

export default function SeasonalBar() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!seasonalMessage.active) return
    const dismissed = sessionStorage.getItem(DISMISS_KEY)
    if (!dismissed) {
      setVisible(true)
    }
  }, [])

  function handleDismiss() {
    sessionStorage.setItem(DISMISS_KEY, "true")
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="sticky top-0 z-[60] bg-[#F5A623] text-[#0f1f2d]">
      <div className="container-custom py-2 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <span className="text-sm font-semibold truncate">
            {seasonalMessage.text}
          </span>
          <Link
            href={seasonalMessage.ctaHref}
            className="flex-shrink-0 text-xs font-bold uppercase tracking-wider bg-[#0f1f2d] text-[#F5A623] px-3 py-1 rounded-full hover:bg-[#2d4f64] transition-colors"
          >
            {seasonalMessage.ctaText}
          </Link>
        </div>
        <button
          onClick={handleDismiss}
          aria-label="Dismiss announcement"
          className="flex-shrink-0 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full hover:bg-[#0f1f2d]/10 active:bg-[#0f1f2d]/20 transition-colors touch-manipulation"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}
