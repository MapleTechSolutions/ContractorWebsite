import Link from "next/link";

export default function About() {
  return (
    <section id="about" className="section-padding bg-[#f7f4ef] overflow-hidden">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left - Visual */}
          <div className="relative order-2 lg:order-1">
            {/* Main image container */}
            <div className="relative">
              <div className="aspect-[4/4] sm:aspect-[4/5] bg-gradient-to-br from-[#0f1f2d] to-[#2d4f64] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                {/* Image placeholder with pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px] md:bg-[size:32px_32px]" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-6 md:p-8">
                    <div className="w-20 h-20 md:w-28 md:h-28 bg-[#F5A623]/20 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                      <svg className="w-10 h-10 md:w-14 md:h-14 text-[#F5A623]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                      </svg>
                    </div>
                    <p className="text-white text-base md:text-lg font-medium">Commercial Fleet</p>
                    <p className="text-white/60 text-sm md:text-base">Since 2009</p>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -left-4 md:-top-6 md:-left-6 bg-[#F5A623] rounded-xl md:rounded-2xl p-4 md:p-6 shadow-xl shadow-[#F5A623]/25">
                <div className="text-2xl md:text-4xl font-black text-[#0f1f2d]">15+</div>
                <div className="text-[#0f1f2d]/80 font-semibold text-sm md:text-base">Years</div>
              </div>

              <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-xl border border-gray-100">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="flex -space-x-1.5 md:-space-x-2">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-[#0f1f2d] to-[#2d4f64] border-2 border-white flex items-center justify-center">
                        <svg className="w-4 h-4 md:w-5 md:h-5 text-[#F5A623]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="font-bold text-[#0f1f2d] text-sm md:text-base">50+</div>
                    <div className="text-xs md:text-sm text-gray-500">Commercial Contracts</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 bg-[#F5A623]/10 text-[#0f1f2d] px-4 py-2 rounded-full text-sm font-semibold mb-4 md:mb-6">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              About Us
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[#0f1f2d] mb-5 md:mb-6 leading-tight">
              Your Commercial
              <span className="text-[#F5A623]"> Partner in Saskatchewan</span>
            </h2>

            <p className="text-base md:text-lg text-gray-600 mb-4 md:mb-6 leading-relaxed">
              Big Country Landscaping &amp; Maintenance Ltd has been serving commercial clients across Saskatoon and surrounding Saskatchewan communities for over 15 years. Our fleet of heavy equipment handles excavation, landscaping, site prep, and commercial snow removal at scale.
            </p>

            <p className="text-gray-600 mb-8 md:mb-10 leading-relaxed text-sm md:text-base">
              We hold WCB Saskatchewan registration, full commercial liability insurance, and SK First Call certification on every job. Our operators know the land, the regulations, and what it takes to keep a commercial site moving.
            </p>

            {/* Features grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-5 mb-8 md:mb-10">
              {[
                { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", title: "WCB Saskatchewan Registered", desc: "All crews registered and compliant" },
                { icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z", title: "Fully Insured", desc: "Commercial liability coverage on every project" },
                { icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z", title: "Saskatoon & Area", desc: "Serving Saskatoon and surrounding SK communities" },
                { icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", title: "SK First Call Certified", desc: "Utility safety on every excavation site" },
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3 md:gap-4 p-3 md:p-4 bg-white rounded-xl md:rounded-2xl border border-gray-100 shadow-sm">
                  <div className="w-10 h-10 md:w-11 md:h-11 rounded-lg md:rounded-xl bg-[#0f1f2d] flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[#F5A623]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#0f1f2d] text-sm md:text-base">{item.title}</h4>
                    <p className="text-xs md:text-sm text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/contact" className="btn-primary w-full sm:w-auto justify-center">
              Get a Site Estimate
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
