import type { Metadata } from "next";
import Services from "@/components/Services";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Excavation & Snow Removal Services | Big Country Landscaping",
  description: "Commercial excavation (site clearing, grading, trenching, demolition), snow removal (lot clearing, salting, hauling, 24/7 response), and landscaping in Saskatoon and surrounding areas.",
  keywords: ["excavation services Saskatoon", "commercial snow removal Saskatoon", "landscaping Saskatoon", "site clearing Saskatchewan", "utility trenching Saskatoon"],
};

export default function ServicesPage() {
  return (
    <>
      {/* Page Header */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-[#0f1f2d] via-[#2d4f64] to-[#0f1f2d] relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#F5A623]/20 rounded-full blur-[150px]" />
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 text-[#F5A623] px-4 py-2 rounded-full text-sm font-semibold mb-6">
              What We Do
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
              Our
              <span className="text-[#F5A623]"> Services</span>
            </h1>
            <p className="text-xl text-white/70 leading-relaxed">
              Excavation, snow removal, and landscaping for development sites and commercial properties across Saskatoon and surrounding Saskatchewan areas.
            </p>
          </div>
        </div>
      </section>

      <Services />
      <CTASection />
    </>
  );
}
