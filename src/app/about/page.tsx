import type { Metadata } from "next";
import About from "@/components/About";
import WhyChooseUs from "@/components/WhyChooseUs";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "About Big Country Landscaping & Maintenance Ltd",
  description: "Commercial excavation, snow removal, and landscaping company serving Saskatoon and surrounding areas for 15+ years. WCB Saskatchewan registered, fully insured, SK First Call certified.",
  keywords: ["Big Country Landscaping Saskatoon", "excavation company Saskatoon", "commercial contractor Saskatchewan", "WCB Saskatchewan contractor"],
};

export default function AboutPage() {
  return (
    <>
      {/* Page Header */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-[#0f1f2d] via-[#2d4f64] to-[#0f1f2d] relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#F5A623]/20 rounded-full blur-[150px]" />
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 text-[#F5A623] px-4 py-2 rounded-full text-sm font-semibold mb-6">
              Our Story
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
              About
              <span className="text-[#F5A623]"> Big Country</span>
            </h1>
            <p className="text-xl text-white/70 leading-relaxed">
              Commercial excavation, snow removal, and landscaping across Saskatoon and surrounding Saskatchewan — heavy equipment, reliable service, 15+ years.
            </p>
          </div>
        </div>
      </section>

      <About />
      <WhyChooseUs />
      <CTASection />
    </>
  );
}
