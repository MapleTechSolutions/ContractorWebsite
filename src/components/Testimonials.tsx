"use client";

import { useState, useEffect, useCallback } from "react";

const testimonials = [
  {
    id: 1,
    name: "Dave K.",
    location: "Saskatoon Commercial Properties",
    rating: 5,
    text: "Big Country handled our full site clearing and rough grading over three phases. A professional crew — showed up when they said they would, zero surprises on the invoice, and the site was ready for our contractor two days early.",
    service: "Excavation",
  },
  {
    id: 2,
    name: "Rob M.",
    location: "Prairie Build Ltd.",
    rating: 5,
    text: "We've used Big Country for snow removal across four of our commercial properties for the past two winters. Our lots are always clear before 6 AM. That reliability is everything when tenants are counting on us.",
    service: "Snow Removal",
  },
  {
    id: 3,
    name: "Carla B.",
    location: "Midtown Plaza, Saskatoon",
    rating: 5,
    text: "After our previous contractor bailed mid-season we called Big Country. They had equipment on-site the next morning. The work was clean, the team was professional, and they've had our contract ever since.",
    service: "Snow Removal",
  },
  {
    id: 4,
    name: "Tyler J.",
    location: "Prairie Land Corp, SK",
    rating: 5,
    text: "Big Country did the utility trenching and backfill on a tight residential development timeline. They coordinated with SK First Call, kept the site tidy, and I never had to chase them for updates. Exactly what you want on a fast-moving project.",
    service: "Excavation",
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goToNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const goToPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(goToNext, 6000);
    return () => clearInterval(interval);
  }, [isPaused, goToNext]);

  return (
    <section id="testimonials" className="section-padding bg-[#0f1f2d]">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-white/10 text-[#F5A623] px-4 py-2 rounded-full text-sm font-semibold mb-4 md:mb-6">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            Reviews
          </div>
          <h2 className="text-[clamp(1.5rem,5vw,3rem)] font-black tracking-tight text-white mb-4 md:mb-5">
            What Commercial
            <span className="text-[#F5A623]"> Clients Say</span>
          </h2>
          <p className="text-base md:text-lg text-white/60 max-w-2xl mx-auto">
            Don&apos;t just take our word for it. Here&apos;s what our commercial clients across Saskatoon and surrounding areas have to say.
          </p>
        </div>

        {/* Testimonials Slider */}
        <div className="max-w-4xl mx-auto">
          <div
            className="relative bg-white/5 rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12 border border-white/10 shadow-xl shadow-black/30"
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Quote decoration */}
            <div className="absolute -top-4 md:-top-6 left-6 md:left-8 w-10 h-10 md:w-12 md:h-12 bg-[#F5A623] rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg shadow-[#F5A623]/25">
              <svg className="w-5 h-5 md:w-6 md:h-6 text-[#0f1f2d]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
              </svg>
            </div>

            {/* Testimonial content */}
            <div className="pt-4 md:pt-4">
              {/* Stars */}
              <div className="flex gap-1 mb-4 md:mb-6">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 md:w-6 md:h-6 text-[#F5A623]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Text with animation */}
              <div className="relative min-h-[100px] md:min-h-[120px] mb-6 md:mb-8">
                {testimonials.map((testimonial, index) => (
                  <p
                    key={testimonial.id}
                    className={`text-[clamp(1rem,2.5vw,1.5rem)] text-white/80 leading-relaxed transition-all duration-500 ${index === activeIndex
                        ? "opacity-100 translate-y-0 relative"
                        : "opacity-0 absolute top-0 left-0 right-0 translate-y-4 pointer-events-none"
                      }`}
                  >
                    &ldquo;{testimonial.text}&rdquo;
                  </p>
                ))}
              </div>

              {/* Author info */}
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#0f1f2d] flex items-center justify-center">
                    <svg className="w-6 h-6 md:w-7 md:h-7 text-[#F5A623]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-white text-base md:text-lg">
                      {testimonials[activeIndex].name}
                    </div>
                    <div className="text-white/50 text-sm md:text-base">
                      {testimonials[activeIndex].location}
                    </div>
                  </div>
                </div>
                <div className="px-3 py-1.5 md:px-4 md:py-2 bg-[#0f1f2d] text-[#F5A623] rounded-full text-xs md:text-sm font-semibold">
                  {testimonials[activeIndex].service}
                </div>
              </div>
            </div>

            {/* Mobile Navigation Arrows */}
            <div className="flex items-center justify-between mt-6 md:hidden">
              <button
                onClick={goToPrev}
                className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shadow-sm active:bg-white/20 touch-manipulation"
                aria-label="Previous testimonial"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`transition-all duration-300 rounded-full touch-manipulation ${index === activeIndex
                        ? "w-8 h-3 bg-[#F5A623]"
                        : "w-3 h-3 bg-white/20"
                      }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={goToNext}
                className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shadow-sm active:bg-white/20 touch-manipulation"
                aria-label="Next testimonial"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Desktop Navigation dots */}
            <div className="hidden md:flex justify-center gap-3 mt-10">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`transition-all duration-300 rounded-full ${index === activeIndex
                      ? "w-8 h-3 bg-[#F5A623]"
                      : "w-3 h-3 bg-white/20 hover:bg-white/40"
                    }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Reviews Badge */}
        <div className="mt-8 md:mt-12 flex justify-center">
          <div className="inline-flex items-center gap-3 md:gap-4 bg-white/5 border border-white/10 px-4 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl">
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 md:w-5 md:h-5 text-[#F5A623]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="font-bold text-white text-base md:text-lg">5.0</span>
            </div>
            <div className="h-5 md:h-6 w-px bg-white/20" />
            <span className="text-white/60 text-sm md:text-base">Based on <span className="font-semibold text-white">100+</span> reviews</span>
          </div>
        </div>
      </div>
    </section>
  );
}
