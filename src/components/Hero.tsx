"use client";

import Link from "next/link";
import { useState } from "react";

export default function Hero() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success'>('idle')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setFormStatus('loading')
    setTimeout(() => setFormStatus('success'), 800)
  }

  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden bg-[#0f1f2d]">
      {/* Optimized gradient background - reduced blur for mobile performance */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f1f2d] via-[#2d4f64] to-[#0f1f2d]" />
        <div className="absolute top-0 right-0 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-[#F5A623]/15 md:bg-[#F5A623]/20 rounded-full blur-[80px] md:blur-[150px] -translate-y-1/2 translate-x-1/2" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] md:bg-[size:60px_60px]" />

      <div className="container-custom relative z-10 pt-24 pb-16 md:pt-28 md:pb-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 text-[#F5A623] px-4 py-2 md:px-5 md:py-2.5 rounded-full text-xs md:text-sm font-semibold mb-6 md:mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F5A623] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F5A623]"></span>
              </span>
              Now Booking Commercial Contracts
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-[1.1] tracking-tight mb-5 md:mb-6">
              <span className="block">Big Country Work.</span>
              <span className="block text-[#F5A623]">Professional Results.</span>
            </h1>

            <p className="text-base md:text-lg lg:text-xl text-white/70 mb-8 md:mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Commercial excavation and snow removal across Big Country, Alberta. Licensed, insured, and WCB compliant — ready when you need us.
            </p>

            {/* CTA Buttons - Stack on mobile */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start mb-8 md:mb-12">
              <Link href="/contact" className="btn-primary text-base w-full sm:w-auto">
                Get a Quote
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <a href="tel:+15875551234" className="btn-outline-white text-base w-full sm:w-auto">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                (587) 555-1234
              </a>
            </div>

            {/* Trust indicators - Scroll on mobile */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 md:gap-6 text-white/60">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 md:w-5 md:h-5 text-[#F5A623]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-xs md:text-sm font-medium whitespace-nowrap">WCB Alberta Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 md:w-5 md:h-5 text-[#F5A623]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-xs md:text-sm font-medium whitespace-nowrap">Alberta One-Call Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 md:w-5 md:h-5 text-[#F5A623]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-xs md:text-sm font-medium whitespace-nowrap">Free Site Estimates</span>
              </div>
            </div>
          </div>

          {/* Right - Quote Form (Desktop) */}
          <div className="hidden lg:block">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Get Your Free Estimate</h3>
                <p className="text-white/60">We&apos;ll get back to you within one business day.</p>
              </div>

              <form className="space-y-4" onSubmit={handleSubmit}>
                {formStatus === 'success' ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-[#F5A623] rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-[#0f1f2d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Request Received</h3>
                    <p className="text-white/70 text-sm">We&apos;ll be in touch within one business day.</p>
                  </div>
                ) : (
                  <>
                    <div>
                      <input
                        type="text"
                        placeholder="Your Name *"
                        className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:border-[#F5A623] focus:outline-none focus:ring-1 focus:ring-[#F5A623] transition-all text-white placeholder-white/40 font-medium"
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        placeholder="Phone Number *"
                        className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:border-[#F5A623] focus:outline-none focus:ring-1 focus:ring-[#F5A623] transition-all text-white placeholder-white/40 font-medium"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder="Email Address *"
                        className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:border-[#F5A623] focus:outline-none focus:ring-1 focus:ring-[#F5A623] transition-all text-white placeholder-white/40 font-medium"
                      />
                    </div>
                    <div>
                      <select className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:border-[#F5A623] focus:outline-none focus:ring-1 focus:ring-[#F5A623] transition-all text-white/60 font-medium">
                        <option value="" className="bg-[#0f1f2d]">Select a service...</option>
                        <option value="excavation" className="bg-[#0f1f2d]">Excavation</option>
                        <option value="snow-removal" className="bg-[#0f1f2d]">Snow Removal</option>
                        <option value="site-prep" className="bg-[#0f1f2d]">Site Prep</option>
                        <option value="other" className="bg-[#0f1f2d]">Other</option>
                      </select>
                    </div>
                    <div>
                      <textarea
                        placeholder="Tell us about your project..."
                        rows={3}
                        className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:border-[#F5A623] focus:outline-none focus:ring-1 focus:ring-[#F5A623] transition-all text-white placeholder-white/40 font-medium resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={formStatus === 'loading'}
                      className="w-full btn-primary py-4 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {formStatus === 'loading' ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        <>Get a Quote</>
                      )}
                    </button>
                  </>
                )}
              </form>

              <p className="text-center text-sm text-white/40 mt-4">
                We respect your privacy. No spam, ever.
              </p>
            </div>
          </div>

          {/* Mobile Quick Quote Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsFormVisible(!isFormVisible)}
              className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 flex items-center justify-between touch-manipulation"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#F5A623] rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#0f1f2d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="text-white font-bold">Quick Quote Form</p>
                  <p className="text-white/60 text-sm">Tap to fill out the form</p>
                </div>
              </div>
              <svg className={`w-5 h-5 text-[#F5A623] transition-transform duration-300 ${isFormVisible ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Mobile Form - Expandable */}
            <div className={`overflow-hidden transition-all duration-300 ease-out ${isFormVisible ? 'max-h-[700px] opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5">
                <form className="space-y-3" onSubmit={handleSubmit}>
                  {formStatus === 'success' ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-[#F5A623] rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-[#0f1f2d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">Request Received</h3>
                      <p className="text-white/70 text-sm">We&apos;ll be in touch within one business day.</p>
                    </div>
                  ) : (
                    <>
                      <input
                        type="text"
                        placeholder="Your Name *"
                        className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:border-[#F5A623] focus:outline-none text-white placeholder-white/40 font-medium text-base"
                      />
                      <input
                        type="tel"
                        placeholder="Phone Number *"
                        className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:border-[#F5A623] focus:outline-none text-white placeholder-white/40 font-medium text-base"
                      />
                      <input
                        type="email"
                        placeholder="Email Address *"
                        className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:border-[#F5A623] focus:outline-none text-white placeholder-white/40 font-medium text-base"
                      />
                      <select className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:border-[#F5A623] focus:outline-none text-white/60 font-medium text-base">
                        <option value="" className="bg-[#0f1f2d]">Select a service...</option>
                        <option value="excavation" className="bg-[#0f1f2d]">Excavation</option>
                        <option value="snow-removal" className="bg-[#0f1f2d]">Snow Removal</option>
                        <option value="site-prep" className="bg-[#0f1f2d]">Site Prep</option>
                        <option value="other" className="bg-[#0f1f2d]">Other</option>
                      </select>
                      <button
                        type="submit"
                        disabled={formStatus === 'loading'}
                        className="w-full btn-primary py-4 disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {formStatus === 'loading' ? (
                          <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Sending...
                          </span>
                        ) : (
                          <>Get a Quote</>
                        )}
                      </button>
                    </>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Bar - Optimized for mobile */}
        <div className="mt-12 md:mt-20 pt-8 md:pt-12 border-t border-white/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center">
            <div className="group p-3 md:p-0">
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-1 md:mb-2 group-hover:text-[#F5A623] transition-colors">15+</div>
              <div className="text-white/50 font-medium uppercase text-[10px] sm:text-xs tracking-wider">Years Experience</div>
            </div>
            <div className="group p-3 md:p-0">
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-1 md:mb-2 group-hover:text-[#F5A623] transition-colors">Commercial</div>
              <div className="text-white/50 font-medium uppercase text-[10px] sm:text-xs tracking-wider">Contracts</div>
            </div>
            <div className="group p-3 md:p-0">
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-1 md:mb-2 group-hover:text-[#F5A623] transition-colors">24/7</div>
              <div className="text-white/50 font-medium uppercase text-[10px] sm:text-xs tracking-wider">Snow Response</div>
            </div>
            <div className="group p-3 md:p-0">
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-1 md:mb-2 group-hover:text-[#F5A623] transition-colors">Alberta</div>
              <div className="text-white/50 font-medium uppercase text-[10px] sm:text-xs tracking-wider">One-Call</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
