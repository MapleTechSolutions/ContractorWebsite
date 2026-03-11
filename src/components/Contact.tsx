"use client";

import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: "", email: "", phone: "", service: "", message: "" });
  };

  return (
    <section id="contact-form" className="section-padding bg-[#f7f4ef]">
      <div className="container-custom">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-16">
          {/* Left - Info */}
          <div className="lg:col-span-2">
            <div className="inline-flex items-center gap-2 bg-[#F5A623]/10 text-[#0f1f2d] px-4 py-2 rounded-full text-sm font-semibold mb-4 md:mb-6">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              Contact Us
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[#0f1f2d] mb-5 md:mb-6 leading-tight">
              Request a
              <span className="text-[#F5A623]"> Site Estimate</span>
            </h2>

            <p className="text-base md:text-lg text-gray-600 mb-8 md:mb-10">
              Ready to start? Request a free site estimate for excavation or commercial snow removal. We respond within one business day.
            </p>

            {/* Contact info cards */}
            <div className="space-y-3 md:space-y-4">
              <a href="tel:+15875551234" className="flex items-center gap-3 md:gap-4 p-4 md:p-5 bg-white rounded-xl md:rounded-2xl border border-gray-100 shadow-sm active:bg-gray-50 transition-all group touch-manipulation">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-[#F5A623] flex items-center justify-center shadow-lg shadow-[#F5A623]/25 group-active:scale-95 transition-transform">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-[#0f1f2d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs md:text-sm text-gray-500 mb-0.5 md:mb-1">Call us anytime</div>
                  <div className="text-lg md:text-xl font-bold text-[#0f1f2d]">(587) 555-1234</div>
                </div>
              </a>

              <a href="mailto:info@bigcountrylandscaping.ca" className="flex items-center gap-3 md:gap-4 p-4 md:p-5 bg-white rounded-xl md:rounded-2xl border border-gray-100 shadow-sm active:bg-gray-50 transition-all group touch-manipulation">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-[#0f1f2d] flex items-center justify-center shadow-lg group-active:scale-95 transition-transform">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-[#F5A623]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs md:text-sm text-gray-500 mb-0.5 md:mb-1">Email us</div>
                  <div className="text-base md:text-lg font-semibold text-[#0f1f2d]">info@bigcountrylandscaping.ca</div>
                </div>
              </a>

              <div className="flex items-center gap-3 md:gap-4 p-4 md:p-5 bg-white rounded-xl md:rounded-2xl border border-gray-100 shadow-sm">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-[#0f1f2d] flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-[#F5A623]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs md:text-sm text-gray-500 mb-0.5 md:mb-1">Business hours</div>
                  <div className="text-[#0f1f2d] font-medium text-sm md:text-base">Mon-Fri: 7AM-6PM • On-Call for Snow</div>
                  <div className="text-[#F5A623] font-bold text-xs md:text-sm">Free Site Estimates</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 p-6 md:p-8 lg:p-10">
              {isSubmitted ? (
                <div className="text-center py-8 md:py-12">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-[#0f1f2d] rounded-full flex items-center justify-center mx-auto mb-5 md:mb-6 shadow-lg shadow-[#0f1f2d]/25">
                    <svg className="w-8 h-8 md:w-10 md:h-10 text-[#F5A623]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-[#0f1f2d] mb-2 md:mb-3">Request Received</h3>
                  <p className="text-gray-600 mb-5 md:mb-6 text-sm md:text-base">We&apos;ll be in touch within one business day to discuss your project.</p>
                  <button onClick={() => setIsSubmitted(false)} className="text-[#F5A623] font-semibold active:text-[#d4921f] transition-colors touch-manipulation">
                    Submit another request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                  <div className="text-center mb-6 md:mb-8">
                    <h3 className="text-xl md:text-2xl font-bold text-[#0f1f2d] mb-2">Request a Site Estimate</h3>
                    <p className="text-gray-600 text-sm md:text-base">Fill out the form below and we&apos;ll get back to you shortly.</p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 md:gap-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-[#0f1f2d] mb-2">Full Name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3.5 bg-[#f7f4ef] border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F5A623]/20 focus:border-[#F5A623] outline-none transition-all text-base"
                        placeholder="John Smith"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-[#0f1f2d] mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3.5 bg-[#f7f4ef] border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F5A623]/20 focus:border-[#F5A623] outline-none transition-all text-base"
                        placeholder="(587) 555-1234"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-[#0f1f2d] mb-2">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3.5 bg-[#f7f4ef] border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F5A623]/20 focus:border-[#F5A623] outline-none transition-all text-base"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="service" className="block text-sm font-semibold text-[#0f1f2d] mb-2">Service Needed *</label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3.5 bg-[#f7f4ef] border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F5A623]/20 focus:border-[#F5A623] outline-none transition-all appearance-none cursor-pointer text-base"
                    >
                      <option value="">Select a service...</option>
                      <option value="excavation">Excavation</option>
                      <option value="snow-removal">Snow Removal</option>
                      <option value="site-prep">Site Prep</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-[#0f1f2d] mb-2">Project Details <span className="text-gray-400 font-normal">(optional)</span></label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3.5 bg-[#f7f4ef] border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F5A623]/20 focus:border-[#F5A623] outline-none transition-all resize-none text-base"
                      placeholder="Tell us about your project..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary py-4 text-base md:text-lg disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <>
                        Send Request
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </>
                    )}
                  </button>

                  <p className="text-xs md:text-sm text-gray-500 text-center">
                    We respect your privacy. No spam, ever.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
