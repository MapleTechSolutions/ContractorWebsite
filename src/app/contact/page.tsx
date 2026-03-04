import type { Metadata } from "next";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
  title: "Get a Site Estimate | Big Country Landscaping & Maintenance Ltd",
  description: "Request a free site estimate for excavation or commercial snow removal in Big Country, Alberta. Call (587) 555-1234 or fill out our form.",
  keywords: ["excavation estimate Alberta", "snow removal quote", "Big Country contractor", "free site estimate"],
};

export default function ContactPage() {
  return (
    <>
      {/* Page Header */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-[#0f1f2d] via-[#2d4f64] to-[#0f1f2d] relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#F5A623]/20 rounded-full blur-[150px]" />
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 text-[#F5A623] px-4 py-2 rounded-full text-sm font-semibold mb-6">
              Get In Touch
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
              Request a
              <span className="text-[#F5A623]"> Site Estimate</span>
            </h1>
            <p className="text-xl text-white/70 leading-relaxed">
              Ready to start? Contact Big Country Landscaping for excavation or snow removal in the Big Country region of Alberta.
            </p>
          </div>
        </div>
      </section>

      <Contact />

      {/* Map Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="bg-[#f7f4ef] rounded-3xl h-[400px] flex items-center justify-center">
            <div className="text-center">
              <svg className="w-16 h-16 text-[#0f1f2d] mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className="text-[#0f1f2d] font-bold text-lg">Serving Big Country Region, Alberta</p>
              <p className="text-gray-500 text-sm">Drumheller, Hanna, Stettler, and surrounding communities</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
