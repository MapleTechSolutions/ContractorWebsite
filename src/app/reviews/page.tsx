import type { Metadata } from "next";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Client Reviews | Big Country Landscaping & Maintenance Ltd",
  description: "Read what commercial clients say about Big Country Landscaping. Property managers, developers, and operations teams across Alberta.",
  keywords: ["Big Country Landscaping reviews", "excavation contractor reviews Alberta", "commercial snow removal reviews"],
};

export default function ReviewsPage() {
  return (
    <>
      {/* Page Header */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-[#0f1f2d] via-[#2d4f64] to-[#0f1f2d] relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#F5A623]/20 rounded-full blur-[150px]" />
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 text-[#F5A623] px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              5.0 Rated
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
              Client
              <span className="text-[#F5A623]"> Reviews</span>
            </h1>
            <p className="text-xl text-white/70 leading-relaxed">
              Commercial clients across Big Country, Alberta. Property managers, site superintendents, and developers.
            </p>
          </div>
        </div>
      </section>

      <Testimonials />
      <CTASection />
    </>
  );
}
