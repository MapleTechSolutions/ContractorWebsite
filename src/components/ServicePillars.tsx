"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

const LANDSCAPE_SLIDES = [
  "/images/yard-work-0.jpg",
  "/images/yard-work-1.jpg",
  "/images/yard-work-2.jpg",
  "/images/yard-work-3.jpg",
  "/images/yard-work-4.jpg",
  "/images/yard-work-5.jpg",
  "/images/yard-work-6.jpg",
];

export default function ServicePillars() {
  const [slide, setSlide] = useState(0);
  const [fading, setFading] = useState(false);

  const next = useCallback(() => {
    setFading(true);
    setTimeout(() => {
      setSlide((s) => (s + 1) % LANDSCAPE_SLIDES.length);
      setFading(false);
    }, 400);
  }, []);

  useEffect(() => {
    const t = setInterval(next, 2000);
    return () => clearInterval(t);
  }, [next]);

  return (
    <section className="section-padding bg-[#0f1f2d]">
      <div className="container-custom">
        {/* Section header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 bg-white/10 text-[#F5A623] px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Our Services
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Built for <span className="text-[#F5A623]">Commercial Scale</span>
          </h2>
        </div>

        {/* Pillars grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Pillar: Excavation */}
          <div className="relative rounded-2xl overflow-hidden min-h-[420px] md:min-h-[560px]">
            <Image
              src="/images/excavation-pillar.jpg"
              alt="Commercial excavation services"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f1f2d]/95 via-[#0f1f2d]/50 to-[#0f1f2d]/20" />
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
              <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-3">
                Excavation &amp; Site Work
              </h3>
              <ul className="space-y-1.5 mb-5">
                {[
                  "Site Clearing & Grading",
                  "Utility Trenching",
                  "Rough & Fine Grading",
                  "Demolition & Removal",
                  "Foundation Excavation",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-white/80 text-sm">
                    <span className="text-[#F5A623] font-bold flex-shrink-0">—</span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/services" className="btn-primary w-fit text-sm">
                Learn More
              </Link>
            </div>
          </div>

          {/* Pillar: Snow Removal */}
          <div className="relative rounded-2xl overflow-hidden min-h-[420px] md:min-h-[560px]">
            <Image
              src="/images/snow-pillar.jpg"
              alt="Commercial snow removal services"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f1f2d]/95 via-[#0f1f2d]/50 to-[#0f1f2d]/20" />
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
              <div className="inline-flex items-center gap-2 bg-[#F5A623] text-[#0f1f2d] px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-3 w-fit">
                24/7 Storm Response
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-3">
                Snow &amp; Ice Removal
              </h3>
              <ul className="space-y-1.5 mb-5">
                {[
                  "Commercial Lot Clearing",
                  "Sidewalk & Pathway Clearing",
                  "Salting & Sanding",
                  "Snow Hauling & Relocation",
                  "Seasonal Contracts",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-white/80 text-sm">
                    <span className="text-[#F5A623] font-bold flex-shrink-0">—</span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/services" className="btn-primary w-fit text-sm">
                Learn More
              </Link>
            </div>
          </div>

          {/* Pillar: Landscaping & Construction — auto-changing slideshow */}
          <div className="relative rounded-2xl overflow-hidden min-h-[420px] md:min-h-[560px] md:col-span-2 lg:col-span-1">
            {/* Stacked images — crossfade */}
            {LANDSCAPE_SLIDES.map((src, i) => (
              <div
                key={src}
                className="absolute inset-0 transition-opacity duration-500 ease-in-out"
                style={{ opacity: i === slide ? 1 : 0, zIndex: i === slide ? 1 : 0 }}
              >
                <Image
                  src={src}
                  alt="Landscaping and construction work"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 100vw, 100vw"
                  priority={i === 0}
                />
              </div>
            ))}

            {/* Dot indicator — top right */}
            <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5">
              {LANDSCAPE_SLIDES.map((_, i) => (
                <span
                  key={i}
                  className="block rounded-full transition-all duration-300"
                  style={{
                    width: i === slide ? "1.5rem" : "0.4rem",
                    height: "0.4rem",
                    background: i === slide ? "#F5A623" : "rgba(255,255,255,0.4)",
                  }}
                />
              ))}
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-[#0f1f2d]/95 via-[#0f1f2d]/50 to-[#0f1f2d]/20 z-10" />
            <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 md:p-8">
              {/* Category label — fades with slide */}
              <div
                className="mb-3 transition-all duration-400"
                style={{ opacity: fading ? 0 : 1, transform: fading ? "translateY(4px)" : "translateY(0)" }}
              >
                <span className="inline-block bg-[#F5A623] text-[#0f1f2d] text-[10px] font-black px-2.5 py-1 uppercase tracking-widest rounded-sm mb-3">
                  {[
                    "Excavation & Lot Prep",
                    "Grading & Topsoil",
                    "Lawn Installation",
                    "Softscaping",
                    "Topsoil & Seeding",
                    "Commercial",
                    "Drainage & Lawn",
                  ][slide]}
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-3">
                Landscaping &amp; Construction
              </h3>
              <ul className="space-y-1.5 mb-5">
                {[
                  "Lawn Installation & Sodding",
                  "Retaining Walls",
                  "Interlocking Patios & Driveways",
                  "Drainage Solutions",
                  "Landscape Grading",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-white/80 text-sm">
                    <span className="text-[#F5A623] font-bold flex-shrink-0">—</span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/landscape-construction" className="btn-primary w-fit text-sm">
                See Our Work
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
