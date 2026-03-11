import Link from "next/link";

const services = [
  {
    title: "Excavation",
    description: "Full-scale commercial excavation — site clearing, rough grading, utility trenching, demolition, and frost work. We move earth at scale.",
    items: ["Site Clearing", "Rough Grading", "Utility Trenching", "Demolition & Removal", "Frost Work"],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
  },
  {
    title: "Snow Removal",
    description: "24/7 commercial snow response — lot clearing, salting and de-icing, snow hauling, and seasonal contracts for commercial properties.",
    items: ["Commercial Lot Clearing", "Salting & De-Icing", "Snow Hauling", "24/7 Storm Response", "Seasonal Contracts"],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v18M3 12h18M5.636 5.636l12.728 12.728M18.364 5.636L5.636 18.364" />
      </svg>
    ),
  },
];

export default function ServicesPreview() {
  return (
    <section className="section-padding bg-[#f7f4ef]">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#F5A623]/10 text-[#0f1f2d] px-5 py-2 rounded-full text-sm font-semibold mb-6">
            Our Services
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0f1f2d] mb-5">
            Excavation &amp; <span className="text-[#F5A623]">Snow Removal</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Heavy equipment solutions for commercial and industrial sites across Saskatoon and surrounding areas.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative p-8 bg-white rounded-2xl border border-gray-100 hover:border-[#F5A623]/20 hover:shadow-xl hover:shadow-[#F5A623]/5 transition-all duration-500 cursor-pointer"
            >
              <div className="w-14 h-14 bg-[#0f1f2d] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-[#0f1f2d]/20">
                <div className="text-[#F5A623]">
                  {service.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#0f1f2d] mb-3 group-hover:text-[#F5A623] transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                {service.description}
              </p>

              <ul className="space-y-1 mb-4">
                {service.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-4 h-4 text-[#F5A623] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-2 text-[#F5A623] font-semibold text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                Learn More
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/services" className="btn-secondary">
            View All Services
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
