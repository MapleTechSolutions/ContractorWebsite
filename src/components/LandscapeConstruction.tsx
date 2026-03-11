"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

// ─── DATA ─────────────────────────────────────────────────────────────────────

const SLIDES = [
  { src: "/images/yard-work-0.jpg", cat: "Excavation & Lot Prep",    title: "Residential Front Yard Renovation",  loc: "Saskatoon, SK" },
  { src: "/images/yard-work-1.jpg", cat: "Grading & Topsoil",        title: "New Construction Backyard",          loc: "Warman, SK" },
  { src: "/images/yard-work-2.jpg", cat: "Lawn Installation",         title: "Acreage Lawn & Rock Border",         loc: "Rural Saskatchewan" },
  { src: "/images/yard-work-3.jpg", cat: "Softscaping",               title: "Front Yard Makeover",                loc: "Saskatoon, SK" },
  { src: "/images/yard-work-4.jpg", cat: "Topsoil & Seeding",         title: "Residential Topsoil",                loc: "Martensville, SK" },
  { src: "/images/yard-work-5.jpg", cat: "Commercial Landscaping",    title: "Aria Building Softscape",            loc: "Saskatoon, SK" },
  { src: "/images/yard-work-6.jpg", cat: "Drainage & Lawn",           title: "Rock Drainage Install",              loc: "Rural Saskatchewan" },
];

const SERVICES = [
  {
    slug: "excavation",
    label: "Excavation & Grading",
    sub: "We move earth. Precisely.",
    desc: "Lot grading, topsoil supply, and full excavation using commercial-grade equipment. Built for Saskatchewan freeze-thaw cycles.",
    tags: ["Lot Grading", "French Drains", "Topsoil Supply", "Storm Water"],
    photo: "/images/yard-work-0.jpg",
  },
  {
    slug: "new-build",
    label: "New Construction",
    sub: "Post-build. Sod-ready.",
    desc: "Final grade and topsoil for new builds — ready for seed or sod the day keys are handed over.",
    tags: ["Final Grade", "Construction Cleanup", "Seed & Sod Prep"],
    photo: "/images/yard-work-1.jpg",
  },
  {
    slug: "lawn",
    label: "Lawn Installation",
    sub: "Sod, seed, rock borders.",
    desc: "Large-scale lawn establishment with natural rock borders and integrated drainage.",
    tags: ["Sod Installation", "Hydroseeding", "Rock Borders"],
    photo: "/images/yard-work-2.jpg",
  },
  {
    slug: "softscape",
    label: "Softscaping",
    sub: "Beds, borders, planting.",
    desc: "Raised bed borders, topsoil spreading, plant selection — full front-to-back residential makeovers.",
    tags: ["Raised Beds", "Plant Install", "Mulch & Rock"],
    photo: "/images/yard-work-3.jpg",
  },
  {
    slug: "commercial",
    label: "Commercial",
    sub: "High-traffic. High-impact.",
    desc: "Boulder features, ornamental grasses, decorative mulch — commercial properties that make an impression.",
    tags: ["Boulder Features", "Ornamental Grasses", "Commercial Scale"],
    photo: "/images/yard-work-5.jpg",
  },
  {
    slug: "drainage",
    label: "Drainage Solutions",
    sub: "Water moves away.",
    desc: "Rock channels, french drains, and engineered grading built for Alberta spring runoff.",
    tags: ["Rock Channels", "French Drains", "Swale Design"],
    photo: "/images/yard-work-6.jpg",
  },
];

const MARQUEE_ITEMS = [
  "EXCAVATION", "GRADING", "SOD INSTALLATION", "DRAINAGE SYSTEMS",
  "SOFTSCAPING", "HARDSCAPING", "NEW CONSTRUCTION", "COMMERCIAL LANDSCAPING",
  "SEASONAL CLEANUP", "TOPSOIL SUPPLY",
];

// ─── COMPONENT ────────────────────────────────────────────────────────────────

export default function LandscapeConstruction() {
  const [slide, setSlide] = useState(0);
  const [fading, setFading] = useState(false);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hovered, setHovered] = useState<string | null>(null);
  const [formState, setFormState] = useState<"idle" | "sending" | "sent">("idle");

  const go = useCallback(
    (dir: 1 | -1) => {
      setFading(true);
      setTimeout(() => {
        setSlide((s) => (s + dir + SLIDES.length) % SLIDES.length);
        setFading(false);
        setProgress(0);
      }, 350);
    },
    []
  );

  useEffect(() => {
    if (paused) return;
    let elapsed = 0;
    const DURATION = 2000;
    const TICK = 40;
    const t = setInterval(() => {
      elapsed += TICK;
      setProgress(elapsed / DURATION);
      if (elapsed >= DURATION) {
        elapsed = 0;
        go(1);
      }
    }, TICK);
    return () => clearInterval(t);
  }, [paused, go, slide]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormState("sending");
    setTimeout(() => setFormState("sent"), 1800);
  }

  return (
    <div className="overflow-x-hidden" style={{ background: "#07121b", color: "#fff", fontFamily: "var(--font-montserrat)" }}>

      {/* ════════════════════════════════════════════════════════════════════
          HERO — split: dark editorial left + photo mosaic right
          ════════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col bg-[#07121b] overflow-hidden">
        {/* Subtle dot grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(245,166,35,0.06) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Main hero grid */}
        <div className="relative z-10 flex-1 grid lg:grid-cols-[1fr_1fr]" style={{ minHeight: "calc(100vh - 80px)" }}>

          {/* ── Left: headline ── */}
          <div className="flex flex-col justify-center px-6 sm:px-10 md:px-16 lg:px-20 py-32 lg:py-20">
            <div className="flex items-center gap-3 mb-8">
              <span className="block w-10 h-[2px] bg-[#F5A623]" />
              <span className="text-[#F5A623] text-[10px] font-black tracking-[0.4em] uppercase">
                Landscape Construction Services
              </span>
            </div>

            <h1 className="font-black tracking-tight leading-[0.9] mb-8 text-white">
              <span className="block text-[clamp(3rem,8vw,5.5rem)]">LAND&shy;SCAPE</span>
              <span className="block text-[clamp(3rem,8vw,5.5rem)] text-[#F5A623] italic">THAT</span>
              <span className="block text-[clamp(3rem,8vw,5.5rem)]">PERFORMS</span>
            </h1>

            <div className="w-14 h-[3px] bg-[#F5A623] mb-8" />

            <p className="text-white/55 text-base md:text-lg leading-relaxed max-w-sm mb-10">
              Full-service landscape construction for residential and commercial
              properties across Alberta. Designed well. Built to last.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-[#F5A623] text-[#07121b] font-black px-8 py-4 text-xs tracking-[0.2em] uppercase hover:bg-[#d4921f] transition-colors duration-200 min-h-[52px]"
              >
                Schedule Consultation
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <a
                href="tel:+15875551234"
                className="inline-flex items-center justify-center gap-2 border border-white/15 text-white font-semibold px-8 py-4 text-xs tracking-[0.2em] uppercase hover:border-[#F5A623] hover:text-[#F5A623] transition-all duration-200 min-h-[52px]"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call Now
              </a>
            </div>
          </div>

          {/* ── Right: photo mosaic ── */}
          <div className="hidden lg:grid grid-cols-2 gap-3 p-8" style={{ gridTemplateRows: "1fr 1fr" }}>
            {/* Large photo — spans 2 rows */}
            <div className="relative row-span-2 overflow-hidden">
              <Image
                src="/images/yard-work-2.jpg"
                alt="Lush lawn installation"
                fill
                sizes="30vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07121b]/60 to-transparent" />
            </div>
            {/* Top right */}
            <div className="relative overflow-hidden">
              <Image src="/images/yard-work-5.jpg" alt="Commercial landscaping" fill sizes="20vw" className="object-cover" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07121b]/70 to-transparent" />
              <div className="absolute bottom-3 left-3">
                <span className="text-[10px] font-black text-[#F5A623] bg-[#07121b]/80 px-2 py-1 uppercase tracking-widest">
                  Commercial
                </span>
              </div>
            </div>
            {/* Bottom right */}
            <div className="relative overflow-hidden">
              <Image src="/images/yard-work-0.jpg" alt="Excavation work" fill sizes="20vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07121b]/70 to-transparent" />
              <div className="absolute bottom-3 left-3">
                <span className="text-[10px] font-black text-[#F5A623] bg-[#07121b]/80 px-2 py-1 uppercase tracking-widest">
                  Excavation
                </span>
              </div>
            </div>
          </div>

          {/* Mobile background image */}
          <div className="absolute inset-0 lg:hidden">
            <Image src="/images/yard-work-2.jpg" alt="" fill sizes="100vw" className="object-cover opacity-10" />
          </div>
        </div>

        {/* ── Trust metrics strip ── */}
        <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 border-t border-white/5">
          {[
            { value: "15+",  label: "Years Operating" },
            { value: "500+", label: "Projects Completed" },
            { value: "WCB",  label: "Alberta Compliant" },
            { value: "24/7", label: "Emergency Ready" },
          ].map((m, i) => (
            <div
              key={i}
              className={`px-6 py-5 flex items-center gap-4 ${i < 3 ? "border-r border-white/5" : ""} ${i >= 2 ? "border-t md:border-t-0 border-white/5" : ""}`}
            >
              <div className="text-[#F5A623] font-black text-2xl leading-none tabular-nums">{m.value}</div>
              <div className="text-white/35 text-xs font-semibold uppercase tracking-widest leading-tight">{m.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          MARQUEE — amber strip with scrolling service names
          ════════════════════════════════════════════════════════════════════ */}
      <div className="bg-[#F5A623] overflow-hidden py-3" aria-hidden="true">
        <div className="animate-marquee">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="inline-flex items-center text-[#07121b] font-black text-xs tracking-[0.25em] px-6">
              {item}
              <span className="ml-6 w-1 h-1 rounded-full bg-[#07121b]/40 inline-block" />
            </span>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          SERVICES GRID — Alchemy-inspired editorial photo cards
          ════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-32" style={{ background: "#f7f4ef" }}>
        <div className="container-custom">
          {/* Header row */}
          <div className="flex items-end justify-between mb-12 md:mb-16">
            <div>
              <div className="text-[#F5A623] text-[10px] font-black tracking-[0.4em] uppercase mb-3">What We Build</div>
              <h2
                className="font-black leading-none tracking-tight"
                style={{ color: "#07121b", fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
              >
                Our Core<br />
                <span style={{ color: "#F5A623" }}>Services</span>
              </h2>
            </div>
            <Link
              href="/contact"
              className="hidden md:inline-flex items-center gap-2 font-black text-xs tracking-[0.2em] uppercase pb-1 border-b-2 border-[#F5A623] hover:text-[#F5A623] transition-colors duration-200"
              style={{ color: "#07121b" }}
            >
              Get Free Quote
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* ── Mobile: stacked cards ── */}
          <div className="lg:hidden space-y-4">
            {SERVICES.map((svc) => (
              <div
                key={svc.slug}
                className="relative overflow-hidden"
                style={{ minHeight: "260px" }}
                onMouseEnter={() => setHovered(svc.slug)}
                onMouseLeave={() => setHovered(null)}
              >
                <Image src={svc.photo} alt={svc.label} fill sizes="100vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07121b] via-[#07121b]/40 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <div className="text-[#F5A623] text-[10px] font-black tracking-widest uppercase mb-1">{svc.sub}</div>
                  <h3 className="text-white font-black text-xl leading-tight mb-2">{svc.label}</h3>
                  <p className="text-white/65 text-sm leading-relaxed mb-4">{svc.desc}</p>
                  <Link href="/contact" className="inline-flex items-center gap-2 bg-[#F5A623] text-[#07121b] font-black text-xs px-5 py-3 tracking-wider uppercase w-fit hover:bg-[#d4921f] transition-colors duration-200">
                    Get Quote
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* ── Desktop: editorial grid — large (col-span-2 + row-span-2) + 4 right + 2 bottom ── */}
          <div
            className="hidden lg:grid gap-3"
            style={{
              gridTemplateColumns: "repeat(3, 1fr)",
              gridTemplateRows: "320px 320px",
            }}
          >
            {/* LARGE featured — excavation */}
            <div
              className="relative overflow-hidden group cursor-pointer"
              style={{ gridColumn: "1", gridRow: "1 / 3" }}
              onMouseEnter={() => setHovered("excavation")}
              onMouseLeave={() => setHovered(null)}
            >
              <Image src="/images/yard-work-0.jpg" alt="Excavation & Grading" fill sizes="33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07121b] via-[#07121b]/30 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <div className="text-[#F5A623] text-[10px] font-black tracking-[0.35em] uppercase mb-2">Featured Service</div>
                <h3 className="text-white font-black leading-tight mb-3" style={{ fontSize: "1.75rem" }}>
                  Excavation<br />& Grading
                </h3>
                <p
                  className="text-white/65 text-sm leading-relaxed mb-4 transition-all duration-500 max-w-[260px]"
                  style={{
                    maxHeight: hovered === "excavation" ? "80px" : "0px",
                    overflow: "hidden",
                    opacity: hovered === "excavation" ? 1 : 0,
                  }}
                >
                  Precision lot grading, topsoil supply, and full excavation. Commercial-grade equipment, residential-grade care.
                </p>
                <div
                  className="flex flex-wrap gap-2 mb-5 transition-all duration-500"
                  style={{
                    maxHeight: hovered === "excavation" ? "60px" : "0px",
                    overflow: "hidden",
                    opacity: hovered === "excavation" ? 1 : 0,
                  }}
                >
                  {SERVICES[0].tags.map((t) => (
                    <span key={t} className="bg-white/10 border border-white/10 text-white/80 text-[10px] px-3 py-1 font-semibold uppercase tracking-wider">
                      {t}
                    </span>
                  ))}
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-[#F5A623] text-[#07121b] font-black text-xs px-6 py-3 tracking-wider uppercase w-fit hover:bg-[#d4921f] transition-colors duration-200"
                >
                  Get Free Quote
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* 4 right-column cards */}
            {SERVICES.slice(1, 5).map((svc, i) => (
              <div
                key={svc.slug}
                className="relative overflow-hidden group cursor-pointer"
                style={{
                  gridColumn: i % 2 === 0 ? "2" : "3",
                  gridRow: i < 2 ? "1" : "2",
                }}
                onMouseEnter={() => setHovered(svc.slug)}
                onMouseLeave={() => setHovered(null)}
              >
                <Image src={svc.photo} alt={svc.label} fill sizes="33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07121b] via-[#07121b]/20 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <h3 className="text-white font-black text-lg leading-tight mb-1">{svc.label}</h3>
                  <p
                    className="text-white/60 text-xs leading-relaxed transition-all duration-400"
                    style={{
                      maxHeight: hovered === svc.slug ? "60px" : "0px",
                      overflow: "hidden",
                      opacity: hovered === svc.slug ? 1 : 0,
                    }}
                  >
                    {svc.desc}
                  </p>
                  <div
                    className="mt-3 transition-all duration-400"
                    style={{
                      opacity: hovered === svc.slug ? 1 : 0,
                      transform: hovered === svc.slug ? "translateY(0)" : "translateY(6px)",
                    }}
                  >
                    <Link href="/contact" className="inline-flex items-center gap-1 text-[#F5A623] text-xs font-black uppercase tracking-wider">
                      Get Quote
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 5th + 6th service cards — bottom row on desktop */}
          <div className="hidden lg:grid grid-cols-2 gap-3 mt-3">
            {SERVICES.slice(4).map((svc) => (
              <div
                key={svc.slug}
                className="relative overflow-hidden group cursor-pointer"
                style={{ minHeight: "200px" }}
                onMouseEnter={() => setHovered(svc.slug + "-b")}
                onMouseLeave={() => setHovered(null)}
              >
                <Image src={svc.photo} alt={svc.label} fill sizes="50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07121b] via-[#07121b]/20 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <h3 className="text-white font-black text-lg leading-tight mb-1">{svc.label}</h3>
                  <p
                    className="text-white/60 text-xs leading-relaxed transition-all duration-400"
                    style={{
                      maxHeight: hovered === svc.slug + "-b" ? "50px" : "0px",
                      overflow: "hidden",
                      opacity: hovered === svc.slug + "-b" ? 1 : 0,
                    }}
                  >
                    {svc.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          DARK STATEMENT BAND — "Let us transform your property"
          ════════════════════════════════════════════════════════════════════ */}
      <div className="bg-[#07121b] py-20 md:py-28 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(rgba(245,166,35,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(245,166,35,0.03) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <div className="container-custom relative z-10 text-center">
          <p className="text-white/25 font-semibold text-xs uppercase tracking-[0.5em] mb-5">
            Built in Alberta for Alberta
          </p>
          <h2
            className="font-black text-white leading-tight tracking-tight max-w-4xl mx-auto mb-10"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
          >
            Let us transform your property<br />
            <span style={{ color: "#F5A623" }}>into something you&apos;re proud of.</span>
          </h2>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#F5A623] text-[#07121b] font-black px-10 py-4 text-xs tracking-[0.25em] uppercase hover:bg-[#d4921f] transition-colors duration-200"
          >
            Schedule a Consultation
          </Link>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          PROJECT SHOWCASE — auto-advancing with sidebar thumbnails
          ════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28" style={{ background: "#0a1821" }}>
        <div className="container-custom">
          {/* Header */}
          <div className="flex items-end justify-between mb-10 md:mb-12">
            <div>
              <div className="text-[#F5A623] text-[10px] font-black tracking-[0.4em] uppercase mb-3">Portfolio</div>
              <h2 className="text-white font-black leading-none tracking-tight" style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)" }}>
                Our Work
              </h2>
            </div>
            <div className="font-black tabular-nums" style={{ color: "rgba(255,255,255,0.08)", fontSize: "clamp(3rem, 7vw, 5rem)", lineHeight: 1 }}>
              {String(slide + 1).padStart(2, "0")}
              <span style={{ color: "rgba(255,255,255,0.04)", fontSize: "60%" }}>
                /{String(SLIDES.length).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* Slideshow layout */}
          <div
            className="grid gap-3"
            style={{ gridTemplateColumns: "1fr" }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="grid lg:grid-cols-[1fr_280px] gap-3">
              {/* ── Main photo ── */}
              <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
                {SLIDES.map((s, i) => (
                  <div
                    key={s.src}
                    className="absolute inset-0 transition-opacity duration-500"
                    style={{ opacity: i === slide ? 1 : 0, zIndex: i === slide ? 1 : 0 }}
                  >
                    <Image src={s.src} alt={s.title} fill sizes="(max-width: 1024px) 100vw, 70vw" className="object-cover" priority={i === 0} />
                  </div>
                ))}

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1821]/90 via-transparent to-transparent z-10" />

                {/* Bottom info */}
                <div className="absolute bottom-0 left-0 right-0 z-20 p-5 md:p-8">
                  <div
                    className="transition-all duration-400"
                    style={{
                      opacity: fading ? 0 : 1,
                      transform: fading ? "translateY(6px)" : "translateY(0)",
                    }}
                  >
                    <span className="inline-block bg-[#F5A623] text-[#07121b] text-[10px] font-black px-3 py-1 uppercase tracking-widest mb-3">
                      {SLIDES[slide].cat}
                    </span>
                    <h3 className="text-white font-black leading-tight mb-1" style={{ fontSize: "clamp(1.1rem, 3vw, 1.75rem)" }}>
                      {SLIDES[slide].title}
                    </h3>
                    <p className="text-white/40 text-sm font-semibold">{SLIDES[slide].loc}</p>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/10 z-20">
                  <div
                    className="h-full bg-[#F5A623]"
                    style={{ width: `${progress * 100}%`, transition: "width 40ms linear" }}
                  />
                </div>

                {/* Arrows */}
                <button
                  onClick={() => go(-1)}
                  aria-label="Previous"
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center border border-white/10 bg-black/40 text-white hover:bg-[#F5A623] hover:text-[#07121b] hover:border-[#F5A623] transition-all duration-200"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => go(1)}
                  aria-label="Next"
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center border border-white/10 bg-black/40 text-white hover:bg-[#F5A623] hover:text-[#07121b] hover:border-[#F5A623] transition-all duration-200"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* ── Right sidebar thumbnails ── */}
              <div className="hidden lg:flex flex-col gap-2">
                {SLIDES.map((s, i) => (
                  <button
                    key={s.src}
                    onClick={() => { setSlide(i); setProgress(0); }}
                    className="relative flex-1 overflow-hidden transition-all duration-300 cursor-pointer"
                    style={{
                      outline: i === slide ? "2px solid #F5A623" : "2px solid transparent",
                      opacity: i === slide ? 1 : 0.38,
                    }}
                    onMouseEnter={(e) => { if (i !== slide) (e.currentTarget as HTMLElement).style.opacity = "0.65"; }}
                    onMouseLeave={(e) => { if (i !== slide) (e.currentTarget as HTMLElement).style.opacity = "0.38"; }}
                    aria-label={`View ${s.title}`}
                  >
                    <Image src={s.src} alt={s.title} fill sizes="280px" className="object-cover" />
                    {i === slide && (
                      <div className="absolute inset-0 bg-gradient-to-t from-[#07121b]/70 to-transparent flex items-end p-2">
                        <span className="text-[10px] font-black text-[#07121b] bg-[#F5A623] px-2 py-0.5 uppercase tracking-wider truncate max-w-full">
                          {s.cat}
                        </span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile dots */}
            <div className="flex items-center justify-center gap-2 pt-4 lg:hidden">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setSlide(i); setProgress(0); }}
                  aria-label={`Slide ${i + 1}`}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === slide ? "2rem" : "0.625rem",
                    height: "0.625rem",
                    background: i === slide ? "#F5A623" : "rgba(255,255,255,0.2)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          WHY BIG COUNTRY — 2 photo cards + 4 numbered reasons
          ════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-32" style={{ background: "#f7f4ef" }}>
        <div className="container-custom">
          {/* Section heading */}
          <div className="text-center mb-14 md:mb-16">
            <div className="text-[#F5A623] text-[10px] font-black tracking-[0.4em] uppercase mb-3">Why Choose Us</div>
            <h2
              className="font-black leading-none tracking-tight"
              style={{ color: "#07121b", fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
            >
              Why Professional<br />
              <em>Landscape Construction</em><br />
              Is the Smart Choice
            </h2>
          </div>

          {/* 2-col photo cards (like Alchemy's commitment cards) */}
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="relative overflow-hidden group" style={{ minHeight: "300px" }}>
              <Image src="/images/yard-work-4.jpg" alt="Quality workmanship" fill sizes="50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07121b]/85 via-[#07121b]/30 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <h3 className="text-white font-black text-xl leading-tight mb-3">
                  Unwavering Commitment to Quality<br />and Customer Satisfaction
                </h3>
                <p className="text-white/65 text-sm leading-relaxed">
                  We use commercial-grade materials and meticulous craftsmanship on every project.
                  Your satisfaction isn&apos;t a goal — it&apos;s the minimum standard.
                </p>
              </div>
            </div>
            <div className="relative overflow-hidden group" style={{ minHeight: "300px" }}>
              <Image src="/images/yard-work-5.jpg" alt="Equipment and expertise" fill sizes="50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07121b]/85 via-[#07121b]/30 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <h3 className="text-white font-black text-xl leading-tight mb-3">
                  Expertise You Can Trust, Your Partner<br />in Outdoor Design & Construction
                </h3>
                <p className="text-white/65 text-sm leading-relaxed">
                  From residential lots to commercial properties — the right equipment and the right
                  expertise on every job, every time.
                </p>
              </div>
            </div>
          </div>

          {/* 4-reason grid (numbered, editorial) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-[#e2ddd7]">
            {[
              { n: "01", h: "Maximize Your Space",         b: "We optimize even the most challenging properties — grade, drainage, and soil composition all considered from day one." },
              { n: "02", h: "Potential You Don't See Yet", b: "Untrained eyes miss what we notice immediately: drainage risks, grade problems, hidden opportunities." },
              { n: "03", h: "Stress-Free Construction",    b: "Building your outdoor space should be exciting, not stressful. We carry the entire burden for you." },
              { n: "04", h: "Built For Alberta",           b: "Freeze-thaw, gumbo soil, spring runoff — we engineer for Alberta conditions, not a temperate climate." },
            ].map((r, i) => (
              <div
                key={i}
                className="p-8 border-b sm:border-b-0 border-[#e2ddd7]"
                style={{ borderRight: i < 3 ? "1px solid #e2ddd7" : "none" }}
              >
                <div className="font-black mb-4" style={{ color: "#F5A623", fontSize: "3rem", lineHeight: 1, opacity: 0.25 }}>
                  {r.n}
                </div>
                <h4 className="font-black text-sm leading-tight mb-3" style={{ color: "#07121b" }}>{r.h}</h4>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(7,18,27,0.55)" }}>{r.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          PROCESS — "What Does Working With Us Involve?"
          ════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-[#07121b] relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage: "radial-gradient(circle, #F5A623 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />
        <div className="container-custom relative z-10">
          <div className="text-center mb-14">
            <div className="text-[#F5A623] text-[10px] font-black tracking-[0.4em] uppercase mb-3">The Process</div>
            <h2
              className="text-white font-black leading-none tracking-tight"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
            >
              What Does Working<br />
              With Us <span style={{ color: "#F5A623" }}>Involve?</span>
            </h2>
            <p className="text-white/35 text-sm mt-4 max-w-md mx-auto leading-relaxed">
              Creating your ideal outdoor space is collaborative — here&apos;s exactly what to expect.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { n: "01", h: "Free Site Visit",        b: "We come to you, walk the property, listen to your goals. No obligation, no pressure.",           emoji: "🏠" },
              { n: "02", h: "Design & Quote",          b: "Detailed construction plan with fully transparent pricing. No surprises, no hidden costs.",       emoji: "📋" },
              { n: "03", h: "Professional Build",      b: "Our crews handle every phase with precision — from ground prep to final finishing details.",      emoji: "🚜" },
              { n: "04", h: "Final Walkthrough",       b: "We walk the completed project with you. Everything meets expectations or we fix it.",             emoji: "✅" },
            ].map((step, i) => (
              <div
                key={i}
                className="relative p-8 group transition-colors duration-300"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(245,166,35,0.3)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)")}
              >
                <div className="absolute top-4 right-4 font-black" style={{ color: "rgba(255,255,255,0.04)", fontSize: "4rem", lineHeight: 1 }}>
                  {step.n}
                </div>
                <div className="text-3xl mb-6">{step.emoji}</div>
                <div className="text-[#F5A623] text-[10px] font-black tracking-widest uppercase mb-2">{step.n}</div>
                <h3 className="text-white font-black text-lg leading-tight mb-3">{step.h}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{step.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          TESTIMONIALS — "Hear What Our Clients Have To Say"
          ════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28" style={{ background: "#f7f4ef" }}>
        <div className="container-custom">
          <div className="text-center mb-12">
            <div className="text-[#F5A623] text-[10px] font-black tracking-[0.4em] uppercase mb-3">Client Reviews</div>
            <h2
              className="font-black leading-none tracking-tight"
              style={{ color: "#07121b", fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
            >
              Hear What Our<br />
              <span style={{ color: "#F5A623" }}>Clients Have To Say</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                name: "Jason M.",
                loc: "Saskatoon, SK",
                text: "Big Country turned our construction site mess into a finished backyard in two days. The grading is perfect — not a single puddle after the spring melt.",
              },
              {
                name: "Trisha K.",
                loc: "Warman, SK",
                text: "Professional from start to finish. The crew showed up on time, communicated everything, and the lawn looks incredible. Would not hesitate to hire again.",
              },
              {
                name: "Rob & Linda F.",
                loc: "Rural Saskatchewan",
                text: "We had serious drainage issues for years. Big Country diagnosed it in 20 minutes and had it fixed in a day. Absolutely worth every penny.",
              },
            ].map((t, i) => (
              <div key={i} className="bg-white p-8" style={{ border: "1px solid #e2ddd7" }}>
                <div className="flex gap-0.5 mb-4">
                  {[1, 2, 3, 4, 5].map((j) => (
                    <svg key={j} className="w-4 h-4" style={{ color: "#F5A623" }} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-6 italic" style={{ color: "rgba(7,18,27,0.65)" }}>
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 flex items-center justify-center font-black text-sm flex-shrink-0"
                    style={{ background: "#07121b", color: "#F5A623" }}
                  >
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="font-black text-sm" style={{ color: "#07121b" }}>{t.name}</div>
                    <div className="text-xs" style={{ color: "rgba(7,18,27,0.4)" }}>{t.loc}</div>
                  </div>
                  <div
                    className="ml-auto flex items-center gap-1 px-2 py-1"
                    style={{ background: "rgba(245,166,35,0.1)" }}
                  >
                    <svg className="w-3 h-3" style={{ color: "#F5A623" }} viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    <span className="text-xs font-semibold" style={{ color: "rgba(7,18,27,0.4)" }}>Google</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center mt-8 text-xs font-black uppercase tracking-[0.3em]" style={{ color: "rgba(7,18,27,0.3)" }}>
            We Deliver What We Promise.
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          CTA — split: dark left content + white right form
          ════════════════════════════════════════════════════════════════════ */}
      <section className="grid lg:grid-cols-2" style={{ minHeight: "580px" }}>
        {/* Left: dark */}
        <div className="bg-[#07121b] flex flex-col justify-center px-8 md:px-16 py-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[120px]" style={{ background: "rgba(245,166,35,0.06)" }} />
          <div className="relative z-10">
            <div className="text-[#F5A623] text-[10px] font-black tracking-[0.4em] uppercase mb-6">Start Today</div>
            <h2
              className="text-white font-black leading-tight tracking-tight mb-6"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              Transform Your<br />
              Outdoor Space<br />
              <span style={{ color: "#F5A623" }}>Today.</span>
            </h2>
            <p className="text-sm leading-relaxed mb-8 max-w-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
              Imagine a property that exceeds expectations. Schedule your consultation
              and let&apos;s get to work.
            </p>
            <div className="space-y-3">
              {[
                "Free site visit — no obligation",
                "Detailed written quote",
                "WCB Alberta compliant crews",
                "Serving Saskatoon & surrounding SK",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 flex items-center justify-center flex-shrink-0"
                    style={{ background: "#F5A623" }}
                  >
                    <svg className="w-2.5 h-2.5" style={{ color: "#07121b" }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.6)" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: form */}
        <div className="bg-white flex flex-col justify-center px-8 md:px-16 py-20">
          {formState === "sent" ? (
            <div className="text-center py-12">
              <div
                className="w-16 h-16 flex items-center justify-center mx-auto mb-6"
                style={{ background: "#F5A623" }}
              >
                <svg className="w-8 h-8" style={{ color: "#07121b" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-black text-2xl mb-3" style={{ color: "#07121b" }}>Request Received</h3>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(7,18,27,0.55)" }}>
                We&apos;ll be in touch within one business day to schedule your free site visit.
              </p>
            </div>
          ) : (
            <>
              <h3 className="font-black text-2xl mb-8" style={{ color: "#07121b" }}>Request a Free Quote</h3>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  {["First Name", "Last Name"].map((label) => (
                    <div key={label}>
                      <label className="block text-[10px] font-black uppercase tracking-wider mb-2" style={{ color: "#07121b" }}>
                        {label}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={label === "First Name" ? "John" : "Smith"}
                        className="w-full px-4 py-3 text-sm font-semibold focus:outline-none transition-colors duration-200"
                        style={{
                          border: "1px solid #e2ddd7",
                          color: "#07121b",
                          background: "#fff",
                        }}
                        onFocus={(e) => (e.target.style.borderColor = "#F5A623")}
                        onBlur={(e) => (e.target.style.borderColor = "#e2ddd7")}
                      />
                    </div>
                  ))}
                </div>
                {[
                  { label: "Phone Number", type: "tel", placeholder: "(587) 000-0000" },
                  { label: "Email Address", type: "email", placeholder: "john@email.com" },
                ].map(({ label, type, placeholder }) => (
                  <div key={label}>
                    <label className="block text-[10px] font-black uppercase tracking-wider mb-2" style={{ color: "#07121b" }}>
                      {label}
                    </label>
                    <input
                      type={type}
                      required
                      placeholder={placeholder}
                      className="w-full px-4 py-3 text-sm font-semibold focus:outline-none transition-colors duration-200"
                      style={{ border: "1px solid #e2ddd7", color: "#07121b", background: "#fff" }}
                      onFocus={(e) => (e.target.style.borderColor = "#F5A623")}
                      onBlur={(e) => (e.target.style.borderColor = "#e2ddd7")}
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider mb-2" style={{ color: "#07121b" }}>
                    Service Inquiry
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your project..."
                    className="w-full px-4 py-3 text-sm font-semibold focus:outline-none transition-colors duration-200 resize-none"
                    style={{ border: "1px solid #e2ddd7", color: "#07121b", background: "#fff" }}
                    onFocus={(e) => (e.target.style.borderColor = "#F5A623")}
                    onBlur={(e) => (e.target.style.borderColor = "#e2ddd7")}
                  />
                </div>
                <button
                  type="submit"
                  disabled={formState === "sending"}
                  className="w-full py-4 text-xs font-black uppercase tracking-[0.25em] transition-colors duration-200 disabled:opacity-70"
                  style={{ background: "#F5A623", color: "#07121b" }}
                  onMouseEnter={(e) => { if (formState !== "sending") (e.currentTarget as HTMLElement).style.background = "#d4921f"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#F5A623"; }}
                >
                  {formState === "sending" ? "Sending…" : "Submit Inquiry"}
                </button>
              </form>
            </>
          )}
        </div>
      </section>

    </div>
  );
}
