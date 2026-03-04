"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function MobileStickyCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero section (about 50% of viewport)
      setIsVisible(window.scrollY > window.innerHeight * 0.5);

      // Hide when near footer
      const footer = document.querySelector('footer');
      if (footer) {
        const footerTop = footer.getBoundingClientRect().top;
        setIsAtBottom(footerTop < window.innerHeight + 100);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Only show on mobile and when scrolled
  if (!isVisible || isAtBottom) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] safe-area-bottom">
      <div className="flex items-center gap-2 p-3">
        <a
          href="tel:+15875551234"
          className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-[#0f1f2d] bg-gray-100 active:bg-gray-200 transition-colors touch-manipulation"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <span className="text-sm">Call Now</span>
        </a>
        <Link
          href="/contact"
          className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-[#0f1f2d] bg-[#F5A623] active:bg-[#d4921f] transition-colors shadow-lg shadow-[#F5A623]/25 touch-manipulation"
        >
          <span className="text-sm">Get a Quote</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
