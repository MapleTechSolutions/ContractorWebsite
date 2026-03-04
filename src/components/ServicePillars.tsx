import Image from "next/image";
import Link from "next/link";

export default function ServicePillars() {
  return (
    <section className="section-padding bg-[#0f1f2d]">
      <div className="container-custom">
        {/* Section header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 bg-white/10 text-[#F5A623] px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Our Services
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Built for <span className="text-[#F5A623]">Commercial Scale</span>
          </h2>
        </div>

        {/* Pillars grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Pillar: Excavation */}
          <div className="relative rounded-2xl overflow-hidden min-h-[420px] md:min-h-[560px]">
            <Image
              src="/images/excavation-pillar.jpg"
              alt="Commercial excavation services"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
            {/* Gradient overlay — heavy at bottom for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f1f2d]/95 via-[#0f1f2d]/50 to-[#0f1f2d]/20" />
            {/* Content anchored to bottom */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
              <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-3">
                Excavation &amp; Site Work
              </h3>
              <ul className="space-y-1.5 mb-5">
                {[
                  "Site Clearing & Grading",
                  "Utility Trenching",
                  "Rough & Fine Grading",
                  "Demolition & Removal",
                  "Foundation Excavation",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-white/80 text-sm">
                    <span className="text-[#F5A623] font-bold flex-shrink-0">—</span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/services" className="btn-primary w-fit text-sm">
                Learn More
              </Link>
            </div>
          </div>

          {/* Pillar: Snow Removal */}
          <div className="relative rounded-2xl overflow-hidden min-h-[420px] md:min-h-[560px]">
            <Image
              src="/images/snow-pillar.jpg"
              alt="Commercial snow removal services"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f1f2d]/95 via-[#0f1f2d]/50 to-[#0f1f2d]/20" />
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
              {/* 24/7 pill badge — CONV-03 */}
              <div className="inline-flex items-center gap-2 bg-[#F5A623] text-[#0f1f2d] px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-3 w-fit">
                24/7 Storm Response
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-3">
                Snow &amp; Ice Removal
              </h3>
              <ul className="space-y-1.5 mb-5">
                {[
                  "Commercial Lot Clearing",
                  "Sidewalk & Pathway Clearing",
                  "Salting & Sanding",
                  "Snow Hauling & Relocation",
                  "Seasonal Contracts",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-white/80 text-sm">
                    <span className="text-[#F5A623] font-bold flex-shrink-0">—</span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/services" className="btn-primary w-fit text-sm">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
