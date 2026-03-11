import Link from "next/link";

const testimonials = [
  {
    name: "Dave K.",
    location: "Property Manager — Strathmore Commercial Properties",
    text: "Big Country has handled our lot clearing contract for three winters running. They're on-site before our tenants arrive every storm, without fail. That kind of reliability is hard to find.",
    rating: 5,
  },
  {
    name: "Rob M.",
    location: "Site Superintendent — Prairie Build Ltd.",
    text: "We brought Big Country in for site clearing and rough grading on a 12-acre development. They finished two days ahead of schedule. Professional operation, no surprises.",
    rating: 5,
  },
  {
    name: "Carla B.",
    location: "Operations Manager — Drumheller Mall",
    text: "Our 24/7 snow response contract with Big Country has been a game-changer. One call, they handle everything — plowing, salting, hauling. Our parking lot is always clear by opening.",
    rating: 5,
  },
  {
    name: "Tyler J.",
    location: "Development Manager — Foothills Land Corp",
    text: "We've used Big Country for three utility trench projects across two counties. They know SK First Call compliance inside out. No delays, no damage claims. We keep calling them back.",
    rating: 5,
  },
];

export default function TestimonialsPreview() {
  return (
    <section className="section-padding bg-[#f7f4ef]">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#0f1f2d] text-[#F5A623] px-5 py-2 rounded-full text-sm font-semibold mb-6">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            5.0 Rated
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0f1f2d] mb-5">
            What Commercial
            <span className="text-[#F5A623]"> Clients Say</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Property managers, developers, and operations teams across Saskatoon and surrounding areas.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 hover:shadow-xl hover:shadow-[#0f1f2d]/5 border border-gray-100 hover:border-[#F5A623]/20 transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-[#F5A623]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-700 text-base mb-6 leading-relaxed">&ldquo;{testimonial.text}&rdquo;</p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#0f1f2d] flex items-center justify-center shadow-lg shadow-[#0f1f2d]/20">
                  <svg className="w-6 h-6 text-[#F5A623]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-[#0f1f2d]">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/reviews" className="btn-secondary">
            Read All Reviews
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
