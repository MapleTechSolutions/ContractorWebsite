export default function WhyBigCountry() {
  const reasons = [
    {
      number: "01",
      title: "24/7 Availability",
      description:
        "Storm hits at 3 AM? We're dispatched. Commercial snow contracts include around-the-clock storm response — because downtime costs your business money.",
    },
    {
      number: "02",
      title: "Licensed & Insured",
      description:
        "Fully licensed contractor, WCB Saskatchewan registered, and carrying commercial liability insurance. Your site liability is covered from day one.",
    },
    {
      number: "03",
      title: "Commercial-Grade Equipment",
      description:
        "Our fleet handles any scale — from single-lot clearing to multi-site contracts. Kobelco excavators, Deere track loaders, and more on the job.",
    },
    {
      number: "04",
      title: "Saskatchewan-Based",
      description:
        "We operate in Saskatoon and surrounding Saskatchewan communities. We know the land, the regulations, and SK First Call requirements. No out-of-province crews.",
    },
  ];

  return (
    <section id="why-us" className="section-padding bg-[#0f1f2d] relative overflow-hidden">
      {/* Subtle amber glow */}
      <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-[#F5A623]/8 rounded-full blur-[80px] md:blur-[120px]" />

      <div className="container-custom relative z-10">
        {/* Section header */}
        <div className="text-center mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 bg-white/10 text-[#F5A623] px-4 md:px-5 py-2 rounded-full text-sm font-semibold mb-4 md:mb-6">
            Why Big Country
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
            The Big Country
            <span className="text-[#F5A623]"> Difference</span>
          </h2>
          <p className="text-base md:text-lg text-white/60 max-w-2xl mx-auto">
            Licensed, insured, and WCB compliant — the credentials and heavy equipment your commercial site requires.
          </p>
        </div>

        {/* 4-reason grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {reasons.map((reason) => (
            <div
              key={reason.number}
              className="p-6 md:p-8 bg-white/5 border border-white/10 rounded-xl"
            >
              <div className="text-4xl md:text-5xl font-black text-[#F5A623] mb-3">
                {reason.number}
              </div>
              <h3 className="text-base md:text-lg font-black text-white mb-2 leading-tight">
                {reason.title}
              </h3>
              <p className="text-white/60 leading-relaxed text-sm">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
