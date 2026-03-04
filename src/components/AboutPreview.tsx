import Link from "next/link";

export default function AboutPreview() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Visual */}
          <div className="relative">
            <div className="aspect-[4/3] bg-gradient-to-br from-[#0f1f2d] to-[#2d4f64] rounded-3xl overflow-hidden shadow-2xl relative">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-24 h-24 bg-[#F5A623] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-[#F5A623]/30">
                    <svg className="w-12 h-12 text-[#0f1f2d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                  </div>
                  <p className="text-white text-2xl font-bold">Moving Earth Since 2009</p>
                </div>
              </div>
            </div>

            {/* Experience badge */}
            <div className="absolute -bottom-6 -right-6 bg-[#F5A623] rounded-2xl p-6 shadow-xl shadow-[#F5A623]/30">
              <div className="text-4xl font-black text-[#0f1f2d]">15+</div>
              <div className="text-sm font-semibold text-[#0f1f2d]/80 uppercase tracking-wider">Years</div>
            </div>
          </div>

          {/* Right - Content */}
          <div className="lg:pl-8">
            <div className="inline-flex items-center gap-2 bg-[#F5A623]/10 text-[#0f1f2d] px-5 py-2 rounded-full text-sm font-semibold mb-6">
              About Us
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0f1f2d] mb-6 leading-tight">
              Heavy Equipment.
              <span className="text-[#F5A623]"> Reliable Service.</span>
            </h2>

            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Big Country Landscaping &amp; Maintenance Ltd has been serving commercial clients across the Big Country region of Alberta for over 15 years. Our fleet of heavy equipment handles excavation, site prep, and commercial snow removal at scale.
            </p>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              We work directly with property managers, developers, and site superintendents. WCB Alberta registered, fully insured, and Alberta One-Call compliant on every project.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", text: "WCB Alberta Registered" },
                { icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z", text: "Fully Insured" },
                { icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z", text: "Big Country Region, AB" },
                { icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", text: "Alberta One-Call Certified" },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 group">
                  <div className="w-10 h-10 rounded-xl bg-[#0f1f2d] flex items-center justify-center flex-shrink-0 group-hover:bg-[#F5A623] transition-colors">
                    <svg className="w-5 h-5 text-[#F5A623] group-hover:text-[#0f1f2d] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                    </svg>
                  </div>
                  <span className="text-[#0f1f2d] font-semibold">{item.text}</span>
                </div>
              ))}
            </div>

            <Link href="/about" className="btn-primary">
              About Big Country
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
