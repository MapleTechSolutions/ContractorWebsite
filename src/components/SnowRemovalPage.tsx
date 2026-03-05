"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

// ─── DATA ─────────────────────────────────────────────────────────────────────

const SLIDES = [
  { src: "/images/snow1.jpg",        type: "image" as const, cat: "Commercial Lot Clearing",  title: "Night Shift — Parking Lot Storm Clear",    loc: "Saskatoon, SK" },
  { src: "/images/snow-video.mp4",   type: "video" as const, cat: "Equipment in Action",      title: "24/7 Storm Response — Track Loader",       loc: "Saskatoon, SK" },
];

const SERVICES = [
  {
    slug: "lot-clearing",
    label: "Commercial Lot Clearing",
    sub: "24/7. Every storm. No excuses.",
    desc: "Commercial parking lots cleared before opening hours. We run through the night so your business opens on time.",
    tags: ["Parking Lots", "24/7 Response", "Storm Contracts", "Commercial Scale"],
    photo: "/images/snow1.jpg",
  },
  {
    slug: "sidewalk",
    label: "Sidewalk & Pathway Clearing",
    sub: "Safe access. Zero liability.",
    desc: "Walkways, entries, and accessible pathways cleared and treated — protecting your staff, customers, and liability exposure.",
    tags: ["Walkways", "Entry Paths", "ADA Access", "Liability Protection"],
    photo: "/images/snow1.jpg",
  },
  {
    slug: "salting",
    label: "Salting & Sanding",
    sub: "Ice prevention. Not reaction.",
    desc: "Pre-treatment before storms and post-treatment after. Bulk salt and sand applied with calibrated spreaders.",
    tags: ["Bulk Salt", "Sand Application", "Pre-Treatment", "Post-Treatment"],
    photo: "/images/snow1.jpg",
  },
  {
    slug: "hauling",
    label: "Snow Hauling & Relocation",
    sub: "When there's nowhere left to push.",
    desc: "High-accumulation sites need snow removed entirely. We haul and relocate so your lot doesn't shrink all winter.",
    tags: ["Load & Haul", "Off-Site Removal", "High Accumulation", "Dump Trucks"],
    photo: "/images/snow1.jpg",
  },
  {
    slug: "seasonal",
    label: "Seasonal Contracts",
    sub: "One call. All winter. Done.",
    desc: "Full-season contracts lock in your price and guarantee priority response. We monitor forecasts so you don't have to.",
    tags: ["Fixed Pricing", "Priority Response", "Forecast Monitoring", "Season-Long"],
    photo: "/images/snow1.jpg",
  },
  {
    slug: "emergency",
    label: "Emergency Response",
    sub: "3am. Blizzard. We answer.",
    desc: "Unexpected storms, late-night calls, weekend emergencies — our crew is staged and ready when conditions hit hard.",
    tags: ["24/7 On-Call", "Storm Alerts", "Weekend Coverage", "Rapid Deploy"],
    photo: "/images/snow1.jpg",
  },
];

const MARQUEE_ITEMS = [
  "COMMERCIAL LOT CLEARING", "SIDEWALK CLEARING", "SALTING & SANDING",
  "SNOW HAULING", "SEASONAL CONTRACTS", "24/7 STORM RESPONSE",
  "ICE PREVENTION", "EMERGENCY RESPONSE", "PARKING LOT CLEARING", "WINTER MANAGEMENT",
];

// ─── COMPONENT ────────────────────────────────────────────────────────────────

export default function SnowRemovalPage() {
  const [slide, setSlide] = useState(0);
  const [fading, setFading] = useState(false);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hovered, setHovered] = useState<string | null>(null);
  const [formState, setFormState] = useState<"idle" | "sending" | "sent">("idle");

  const go = useCallback((dir: 1 | -1) => {
    setFading(true);
    setTimeout(() => {
      setSlide((s) => (s + dir + SLIDES.length) % SLIDES.length);
      setFading(false);
      setProgress(0);
    }, 350);
  }, []);

  useEffect(() => {
    if (paused) return;
    let elapsed = 0;
    const DURATION = 2000;
    const TICK = 40;
    const t = setInterval(() => {
      elapsed += TICK;
      setProgress(elapsed / DURATION);
      if (elapsed >= DURATION) { elapsed = 0; go(1); }
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

      {/* ════════════════════════════════════════════════════
          HERO
          ════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col bg-[#07121b] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "radial-gradient(circle, rgba(245,166,35,0.05) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }} />

        <div className="relative z-10 flex-1 grid lg:grid-cols-[1fr_1fr]" style={{ minHeight: "calc(100vh - 80px)" }}>
          {/* Left */}
          <div className="flex flex-col justify-center px-6 sm:px-10 md:px-16 lg:px-20 py-32 lg:py-20">
            <div className="flex items-center gap-3 mb-8">
              <span className="block w-10 h-[2px] bg-[#F5A623]" />
              <span className="text-[#F5A623] text-[10px] font-black tracking-[0.4em] uppercase">Snow & Ice Removal</span>
            </div>
            <h1 className="font-black tracking-tight leading-[0.9] mb-8 text-white">
              <span className="block text-[clamp(3rem,8vw,5.5rem)]">CLEARED.</span>
              <span className="block text-[clamp(3rem,8vw,5.5rem)] text-[#F5A623] italic">TREATED.</span>
              <span className="block text-[clamp(3rem,8vw,5.5rem)]">OPEN.</span>
            </h1>
            <div className="w-14 h-[3px] bg-[#F5A623] mb-8" />
            <p className="text-white/55 text-base md:text-lg leading-relaxed max-w-sm mb-10">
              Commercial snow and ice management across Alberta. 24/7 storm response, seasonal contracts,
              and the equipment to handle any accumulation — so your property opens on time, every time.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-[#F5A623] text-[#07121b] font-black px-8 py-4 text-xs tracking-[0.2em] uppercase hover:bg-[#d4921f] transition-colors duration-200 min-h-[52px]">
                Get a Seasonal Quote
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
              <a href="tel:+15875551234" className="inline-flex items-center justify-center gap-2 border border-white/15 text-white font-semibold px-8 py-4 text-xs tracking-[0.2em] uppercase hover:border-[#F5A623] hover:text-[#F5A623] transition-all duration-200 min-h-[52px]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                24/7 — (587) 555-1234
              </a>
            </div>
          </div>

          {/* Right: photo + video mosaic */}
          <div className="hidden lg:grid grid-cols-2 gap-3 p-8" style={{ gridTemplateRows: "1fr 1fr" }}>
            <div className="relative row-span-2 overflow-hidden">
              <Image src="/images/snow1.jpg" alt="Snow clearing equipment" fill sizes="30vw" className="object-cover" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07121b]/70 to-[#07121b]/30" />
            </div>
            <div className="relative overflow-hidden">
              <video src="/images/snow-video.mp4" autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07121b]/70 to-[#07121b]/30" />
              <div className="absolute bottom-3 left-3">
                <span className="text-[10px] font-black text-[#F5A623] bg-[#07121b]/80 px-2 py-1 uppercase tracking-widest">Commercial</span>
              </div>
            </div>
            <div className="relative overflow-hidden">
              <Image src="/images/snow1.jpg" alt="Snow removal crew" fill sizes="20vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07121b]/70 to-[#07121b]/30" />
              <div className="absolute bottom-3 left-3">
                <span className="text-[10px] font-black text-[#F5A623] bg-[#07121b]/80 px-2 py-1 uppercase tracking-widest">24/7 Ready</span>
              </div>
            </div>
          </div>

          <div className="absolute inset-0 lg:hidden">
            <Image src="/images/snow1.jpg" alt="" fill sizes="100vw" className="object-cover opacity-15" />
          </div>
        </div>

        {/* Trust metrics */}
        <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 border-t border-white/5">
          {[
            { value: "24/7",  label: "Storm Response" },
            { value: "100+",  label: "Commercial Sites" },
            { value: "WCB",   label: "Alberta Compliant" },
            { value: "Oct–Apr", label: "Full Season Coverage" },
          ].map((m, i) => (
            <div key={i} className={`px-6 py-5 flex items-center gap-4 ${i < 3 ? "border-r border-white/5" : ""} ${i >= 2 ? "border-t md:border-t-0 border-white/5" : ""}`}>
              <div className="text-[#F5A623] font-black text-2xl leading-none tabular-nums">{m.value}</div>
              <div className="text-white/35 text-xs font-semibold uppercase tracking-widest leading-tight">{m.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          MARQUEE
          ════════════════════════════════════════════════════ */}
      <div className="bg-[#F5A623] overflow-hidden py-3" aria-hidden="true">
        <div className="animate-marquee">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="inline-flex items-center text-[#07121b] font-black text-xs tracking-[0.25em] px-6">
              {item}<span className="ml-6 w-1 h-1 rounded-full bg-[#07121b]/40 inline-block" />
            </span>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════════════════
          SERVICES GRID
          ════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-32" style={{ background: "#f7f4ef" }}>
        <div className="container-custom">
          <div className="flex items-end justify-between mb-12 md:mb-16">
            <div>
              <div className="text-[#F5A623] text-[10px] font-black tracking-[0.4em] uppercase mb-3">What We Do</div>
              <h2 className="font-black leading-none tracking-tight" style={{ color: "#07121b", fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
                Snow & Ice<br /><span style={{ color: "#F5A623" }}>Services</span>
              </h2>
            </div>
            <Link href="/contact" className="hidden md:inline-flex items-center gap-2 font-black text-xs tracking-[0.2em] uppercase pb-1 border-b-2 border-[#F5A623] hover:text-[#F5A623] transition-colors duration-200" style={{ color: "#07121b" }}>
              Get Seasonal Quote
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>

          {/* Mobile */}
          <div className="lg:hidden space-y-4">
            {SERVICES.map((svc) => (
              <div key={svc.slug} className="relative overflow-hidden" style={{ minHeight: "260px" }}>
                <Image src={svc.photo} alt={svc.label} fill sizes="100vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07121b] via-[#07121b]/50 to-[#07121b]/20" />
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <div className="text-[#F5A623] text-[10px] font-black tracking-widest uppercase mb-1">{svc.sub}</div>
                  <h3 className="text-white font-black text-xl leading-tight mb-2">{svc.label}</h3>
                  <p className="text-white/65 text-sm leading-relaxed mb-4">{svc.desc}</p>
                  <Link href="/contact" className="inline-flex items-center gap-2 bg-[#F5A623] text-[#07121b] font-black text-xs px-5 py-3 tracking-wider uppercase w-fit hover:bg-[#d4921f] transition-colors duration-200">
                    Get Quote <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop grid */}
          <div className="hidden lg:grid gap-3" style={{ gridTemplateColumns: "repeat(3, 1fr)", gridTemplateRows: "320px 320px" }}>
            {/* Large featured */}
            <div className="relative overflow-hidden group cursor-pointer" style={{ gridColumn: "1", gridRow: "1 / 3" }}
              onMouseEnter={() => setHovered("lot-clearing")} onMouseLeave={() => setHovered(null)}>
              <Image src="/images/snow1.jpg" alt="Commercial Lot Clearing" fill sizes="33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07121b] via-[#07121b]/40 to-[#07121b]/10" />
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <div className="inline-flex items-center gap-2 bg-[#F5A623] text-[#07121b] px-3 py-1 text-[10px] font-black uppercase tracking-widest w-fit mb-3">24/7 Storm Response</div>
                <h3 className="text-white font-black leading-tight mb-3" style={{ fontSize: "1.75rem" }}>Commercial<br />Lot Clearing</h3>
                <p className="text-white/65 text-sm leading-relaxed mb-4 transition-all duration-500 max-w-[260px]"
                  style={{ maxHeight: hovered === "lot-clearing" ? "80px" : "0px", overflow: "hidden", opacity: hovered === "lot-clearing" ? 1 : 0 }}>
                  Parking lots cleared before opening hours. We run through the night so your business is ready at 7am.
                </p>
                <div className="flex flex-wrap gap-2 mb-5 transition-all duration-500"
                  style={{ maxHeight: hovered === "lot-clearing" ? "60px" : "0px", overflow: "hidden", opacity: hovered === "lot-clearing" ? 1 : 0 }}>
                  {["Parking Lots", "24/7 Response", "Storm Contracts", "Commercial Scale"].map((t) => (
                    <span key={t} className="bg-white/10 border border-white/10 text-white/80 text-[10px] px-3 py-1 font-semibold uppercase tracking-wider">{t}</span>
                  ))}
                </div>
                <Link href="/contact" className="inline-flex items-center gap-2 bg-[#F5A623] text-[#07121b] font-black text-xs px-6 py-3 tracking-wider uppercase w-fit hover:bg-[#d4921f] transition-colors duration-200">
                  Get Seasonal Quote <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
              </div>
            </div>

            {SERVICES.slice(1, 5).map((svc, i) => (
              <div key={svc.slug} className="relative overflow-hidden group cursor-pointer"
                style={{ gridColumn: i % 2 === 0 ? "2" : "3", gridRow: i < 2 ? "1" : "2" }}
                onMouseEnter={() => setHovered(svc.slug)} onMouseLeave={() => setHovered(null)}>
                <Image src={svc.photo} alt={svc.label} fill sizes="33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07121b] via-[#07121b]/30 to-[#07121b]/10" />
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <h3 className="text-white font-black text-lg leading-tight mb-1">{svc.label}</h3>
                  <p className="text-white/60 text-xs leading-relaxed transition-all duration-400"
                    style={{ maxHeight: hovered === svc.slug ? "60px" : "0px", overflow: "hidden", opacity: hovered === svc.slug ? 1 : 0 }}>{svc.desc}</p>
                  <div className="mt-3 transition-all duration-400" style={{ opacity: hovered === svc.slug ? 1 : 0, transform: hovered === svc.slug ? "translateY(0)" : "translateY(6px)" }}>
                    <Link href="/contact" className="inline-flex items-center gap-1 text-[#F5A623] text-xs font-black uppercase tracking-wider">
                      Get Quote <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="hidden lg:grid grid-cols-2 gap-3 mt-3">
            {SERVICES.slice(4).map((svc) => (
              <div key={svc.slug + "-b"} className="relative overflow-hidden group cursor-pointer" style={{ minHeight: "200px" }}
                onMouseEnter={() => setHovered(svc.slug + "-b")} onMouseLeave={() => setHovered(null)}>
                <Image src={svc.photo} alt={svc.label} fill sizes="50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07121b] via-[#07121b]/30 to-[#07121b]/10" />
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <h3 className="text-white font-black text-lg leading-tight mb-1">{svc.label}</h3>
                  <p className="text-white/60 text-xs leading-relaxed transition-all duration-400"
                    style={{ maxHeight: hovered === svc.slug + "-b" ? "50px" : "0px", overflow: "hidden", opacity: hovered === svc.slug + "-b" ? 1 : 0 }}>{svc.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          DARK BAND
          ════════════════════════════════════════════════════ */}
      <div className="bg-[#07121b] py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(245,166,35,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(245,166,35,0.03) 1px, transparent 1px)", backgroundSize: "64px 64px" }} />
        <div className="container-custom relative z-10 text-center">
          <p className="text-white/25 font-semibold text-xs uppercase tracking-[0.5em] mb-5">Now Booking for Winter 2026–2027</p>
          <h2 className="font-black text-white leading-tight tracking-tight max-w-4xl mx-auto mb-10" style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}>
            Don&apos;t wait for the first storm.<br /><span style={{ color: "#F5A623" }}>Lock in your contract now.</span>
          </h2>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-[#F5A623] text-[#07121b] font-black px-10 py-4 text-xs tracking-[0.25em] uppercase hover:bg-[#d4921f] transition-colors duration-200">
            Get a Seasonal Quote
          </Link>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════
          PROJECT SHOWCASE
          ════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28" style={{ background: "#0a1821" }}>
        <div className="container-custom">
          <div className="flex items-end justify-between mb-10 md:mb-12">
            <div>
              <div className="text-[#F5A623] text-[10px] font-black tracking-[0.4em] uppercase mb-3">Portfolio</div>
              <h2 className="text-white font-black leading-none tracking-tight" style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)" }}>Our Sites</h2>
            </div>
            <div className="font-black tabular-nums" style={{ color: "rgba(255,255,255,0.08)", fontSize: "clamp(3rem, 7vw, 5rem)", lineHeight: 1 }}>
              {String(slide + 1).padStart(2, "0")}<span style={{ color: "rgba(255,255,255,0.04)", fontSize: "60%" }}>/{String(SLIDES.length).padStart(2, "0")}</span>
            </div>
          </div>

          <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
            <div className="grid lg:grid-cols-[1fr_280px] gap-3">
              <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
                {SLIDES.map((s, i) => (
                  <div key={s.src + i} className="absolute inset-0 transition-opacity duration-500" style={{ opacity: i === slide ? 1 : 0, zIndex: i === slide ? 1 : 0 }}>
                    {s.type === "video" ? (
                      <video src={s.src} autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" />
                    ) : (
                      <Image src={s.src} alt={s.title} fill sizes="(max-width: 1024px) 100vw, 70vw" className="object-cover" priority={i === 0} />
                    )}
                  </div>
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1821]/90 via-transparent to-transparent z-10" />
                <div className="absolute bottom-0 left-0 right-0 z-20 p-5 md:p-8">
                  <div className="transition-all duration-400" style={{ opacity: fading ? 0 : 1, transform: fading ? "translateY(6px)" : "translateY(0)" }}>
                    <span className="inline-block bg-[#F5A623] text-[#07121b] text-[10px] font-black px-3 py-1 uppercase tracking-widest mb-3">{SLIDES[slide].cat}</span>
                    <h3 className="text-white font-black leading-tight mb-1" style={{ fontSize: "clamp(1.1rem, 3vw, 1.75rem)" }}>{SLIDES[slide].title}</h3>
                    <p className="text-white/40 text-sm font-semibold">{SLIDES[slide].loc}</p>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/10 z-20">
                  <div className="h-full bg-[#F5A623]" style={{ width: `${progress * 100}%`, transition: "width 40ms linear" }} />
                </div>
                <button onClick={() => go(-1)} aria-label="Previous" className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center border border-white/10 bg-black/40 text-white hover:bg-[#F5A623] hover:text-[#07121b] hover:border-[#F5A623] transition-all duration-200">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button onClick={() => go(1)} aria-label="Next" className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center border border-white/10 bg-black/40 text-white hover:bg-[#F5A623] hover:text-[#07121b] hover:border-[#F5A623] transition-all duration-200">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>

              <div className="hidden lg:flex flex-col gap-2">
                {SLIDES.map((s, i) => (
                  <button key={s.src + i} onClick={() => { setSlide(i); setProgress(0); }} className="relative flex-1 overflow-hidden transition-all duration-300"
                    style={{ outline: i === slide ? "2px solid #F5A623" : "2px solid transparent", opacity: i === slide ? 1 : 0.38 }}
                    onMouseEnter={(e) => { if (i !== slide) (e.currentTarget as HTMLElement).style.opacity = "0.65"; }}
                    onMouseLeave={(e) => { if (i !== slide) (e.currentTarget as HTMLElement).style.opacity = "0.38"; }}
                    aria-label={`View ${s.title}`}>
                    {s.type === "video" ? (
                      <>
                        <video src={s.src} muted playsInline className="absolute inset-0 w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-[#07121b]/50 flex items-center justify-center">
                          <svg className="w-8 h-8 text-white/80" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                        </div>
                      </>
                    ) : (
                      <Image src={s.src} alt={s.title} fill sizes="280px" className="object-cover" />
                    )}
                    {i === slide && (
                      <div className="absolute inset-0 bg-gradient-to-t from-[#07121b]/70 to-transparent flex items-end p-2">
                        <span className="text-[10px] font-black text-[#07121b] bg-[#F5A623] px-2 py-0.5 uppercase tracking-wider truncate max-w-full">{s.cat}</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 pt-4 lg:hidden">
              {SLIDES.map((_, i) => (
                <button key={i} onClick={() => { setSlide(i); setProgress(0); }} aria-label={`Slide ${i + 1}`}
                  className="rounded-full transition-all duration-300"
                  style={{ width: i === slide ? "2rem" : "0.625rem", height: "0.625rem", background: i === slide ? "#F5A623" : "rgba(255,255,255,0.2)" }} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          WHY BIG COUNTRY
          ════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-32" style={{ background: "#f7f4ef" }}>
        <div className="container-custom">
          <div className="text-center mb-14 md:mb-16">
            <div className="text-[#F5A623] text-[10px] font-black tracking-[0.4em] uppercase mb-3">Why Choose Us</div>
            <h2 className="font-black leading-none tracking-tight" style={{ color: "#07121b", fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}>
              Why Commercial Properties<br /><em>Trust Big Country</em>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="relative overflow-hidden group" style={{ minHeight: "300px" }}>
              <Image src="/images/excavation-pillar.jpg" alt="Commercial snow fleet" fill sizes="50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07121b]/85 via-[#07121b]/40 to-[#07121b]/15" />
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <h3 className="text-white font-black text-xl leading-tight mb-3">Your Property Opens on Time.<br />Every Single Morning.</h3>
                <p className="text-white/65 text-sm leading-relaxed">We monitor forecasts overnight and stage equipment before storms arrive. Your lot is clear before your first employee clocks in.</p>
              </div>
            </div>
            <div className="relative overflow-hidden group" style={{ minHeight: "300px" }}>
              <Image src="/images/snow-pillar.jpg" alt="Snow clearing site" fill sizes="50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07121b]/85 via-[#07121b]/40 to-[#07121b]/15" />
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <h3 className="text-white font-black text-xl leading-tight mb-3">Seasonal Contracts Mean<br />Fixed Costs. Zero Surprises.</h3>
                <p className="text-white/65 text-sm leading-relaxed">Lock in your seasonal rate before October. No per-storm billing surprises — one number, all winter, fully covered.</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-[#e2ddd7]">
            {[
              { n: "01", h: "24/7 Storm Response",      b: "We answer the phone at 3am. Equipment staged, crew ready — response measured in minutes, not hours." },
              { n: "02", h: "Seasonal Contracts",       b: "One rate. All winter. Priority service. No scrambling to find a crew when the blizzard hits." },
              { n: "03", h: "Commercial Scale Fleet",   b: "Skid steers, loaders, and dump trucks for haul-away. We handle volume that overwhelms smaller operators." },
              { n: "04", h: "Alberta Winter Experts",   b: "We know Alberta chinooks, ice fog, and overnight re-freezing. Our treatments are calibrated for local conditions." },
            ].map((r, i) => (
              <div key={i} className="p-8 border-b sm:border-b-0 border-[#e2ddd7]" style={{ borderRight: i < 3 ? "1px solid #e2ddd7" : "none" }}>
                <div className="font-black mb-4" style={{ color: "#F5A623", fontSize: "3rem", lineHeight: 1, opacity: 0.25 }}>{r.n}</div>
                <h4 className="font-black text-sm leading-tight mb-3" style={{ color: "#07121b" }}>{r.h}</h4>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(7,18,27,0.55)" }}>{r.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          PROCESS
          ════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-[#07121b] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-[0.025]" style={{ backgroundImage: "radial-gradient(circle, #F5A623 1px, transparent 1px)", backgroundSize: "36px 36px" }} />
        <div className="container-custom relative z-10">
          <div className="text-center mb-14">
            <div className="text-[#F5A623] text-[10px] font-black tracking-[0.4em] uppercase mb-3">How It Works</div>
            <h2 className="text-white font-black leading-none tracking-tight" style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}>
              From Contract<br /><span style={{ color: "#F5A623" }}>to Clear Lot</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { n: "01", h: "Property Assessment",   b: "We walk your site, measure access points, and identify problem areas before writing your contract.",       emoji: "📍" },
              { n: "02", h: "Seasonal Contract",     b: "Fixed-price agreement covering the full season. Priority response guaranteed, no per-event surprises.",     emoji: "📋" },
              { n: "03", h: "Storm Monitoring",      b: "We track forecasts overnight. Equipment pre-positioned before accumulation hits your property.",            emoji: "🌨️" },
              { n: "04", h: "Clear & Treated",       b: "Snow removed, salt or sand applied, and a confirmation sent. Your property is ready before you arrive.",    emoji: "✅" },
            ].map((step, i) => (
              <div key={i} className="relative p-8 transition-colors duration-300"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(245,166,35,0.3)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)")}>
                <div className="absolute top-4 right-4 font-black" style={{ color: "rgba(255,255,255,0.04)", fontSize: "4rem", lineHeight: 1 }}>{step.n}</div>
                <div className="text-3xl mb-6">{step.emoji}</div>
                <div className="text-[#F5A623] text-[10px] font-black tracking-widest uppercase mb-2">{step.n}</div>
                <h3 className="text-white font-black text-lg leading-tight mb-3">{step.h}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{step.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          SPLIT CTA
          ════════════════════════════════════════════════════ */}
      <section className="grid lg:grid-cols-2" style={{ minHeight: "580px" }}>
        <div className="bg-[#07121b] flex flex-col justify-center px-8 md:px-16 py-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[120px]" style={{ background: "rgba(245,166,35,0.06)" }} />
          <div className="relative z-10">
            <div className="text-[#F5A623] text-[10px] font-black tracking-[0.4em] uppercase mb-6">Book Before October</div>
            <h2 className="text-white font-black leading-tight tracking-tight mb-6" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
              Lock In Your<br />Winter Contract<br /><span style={{ color: "#F5A623" }}>Before Spots Fill.</span>
            </h2>
            <p className="text-sm leading-relaxed mb-8 max-w-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
              Seasonal contracts sell out before the first snowfall. Get your property on the schedule now.
            </p>
            <div className="space-y-3">
              {["Free property walk-through", "Fixed seasonal pricing", "24/7 storm response guaranteed", "Serving Saskatoon & surrounding SK"].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-4 h-4 flex items-center justify-center flex-shrink-0" style={{ background: "#F5A623" }}>
                    <svg className="w-2.5 h-2.5" style={{ color: "#07121b" }} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  </div>
                  <span className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.6)" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-white flex flex-col justify-center px-8 md:px-16 py-20">
          {formState === "sent" ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 flex items-center justify-center mx-auto mb-6" style={{ background: "#F5A623" }}>
                <svg className="w-8 h-8" style={{ color: "#07121b" }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
              </div>
              <h3 className="font-black text-2xl mb-3" style={{ color: "#07121b" }}>Request Received</h3>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(7,18,27,0.55)" }}>We&apos;ll contact you within one business day to walk your property and build your seasonal quote.</p>
            </div>
          ) : (
            <>
              <h3 className="font-black text-2xl mb-8" style={{ color: "#07121b" }}>Get a Seasonal Quote</h3>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  {["First Name", "Last Name"].map((label) => (
                    <div key={label}>
                      <label className="block text-[10px] font-black uppercase tracking-wider mb-2" style={{ color: "#07121b" }}>{label}</label>
                      <input type="text" required placeholder={label === "First Name" ? "John" : "Smith"} className="w-full px-4 py-3 text-sm font-semibold focus:outline-none transition-colors duration-200" style={{ border: "1px solid #e2ddd7", color: "#07121b" }}
                        onFocus={(e) => (e.target.style.borderColor = "#F5A623")} onBlur={(e) => (e.target.style.borderColor = "#e2ddd7")} />
                    </div>
                  ))}
                </div>
                {[{ label: "Phone Number", type: "tel", placeholder: "(587) 000-0000" }, { label: "Email Address", type: "email", placeholder: "john@email.com" }, { label: "Company (if applicable)", type: "text", placeholder: "ACME Properties Ltd." }].map(({ label, type, placeholder }) => (
                  <div key={label}>
                    <label className="block text-[10px] font-black uppercase tracking-wider mb-2" style={{ color: "#07121b" }}>{label}</label>
                    <input type={type} placeholder={placeholder} className="w-full px-4 py-3 text-sm font-semibold focus:outline-none transition-colors duration-200" style={{ border: "1px solid #e2ddd7", color: "#07121b" }}
                      onFocus={(e) => (e.target.style.borderColor = "#F5A623")} onBlur={(e) => (e.target.style.borderColor = "#e2ddd7")} />
                  </div>
                ))}
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider mb-2" style={{ color: "#07121b" }}>Property Details</label>
                  <textarea rows={3} placeholder="Parking lot size, number of sites, any special requirements..." className="w-full px-4 py-3 text-sm font-semibold focus:outline-none transition-colors duration-200 resize-none" style={{ border: "1px solid #e2ddd7", color: "#07121b" }}
                    onFocus={(e) => (e.target.style.borderColor = "#F5A623")} onBlur={(e) => (e.target.style.borderColor = "#e2ddd7")} />
                </div>
                <button type="submit" disabled={formState === "sending"} className="w-full py-4 text-xs font-black uppercase tracking-[0.25em] transition-colors duration-200 disabled:opacity-70" style={{ background: "#F5A623", color: "#07121b" }}
                  onMouseEnter={(e) => { if (formState !== "sending") (e.currentTarget as HTMLElement).style.background = "#d4921f"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#F5A623"; }}>
                  {formState === "sending" ? "Sending…" : "Get My Seasonal Quote"}
                </button>
              </form>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
