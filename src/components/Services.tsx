"use client";

import { useState } from "react";
import Link from "next/link";

interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  gradient: string;
}

const services: Service[] = [
  {
    id: "excavation",
    title: "Excavation",
    description: "Full-scale commercial excavation services for development, utility, and industrial projects. Our heavy equipment fleet handles any site — from breaking ground to final grade.",
    features: ["Site Clearing", "Rough Grading", "Utility Trenching", "Demolition & Removal", "Frost Work"],
    gradient: "from-[#F5A623] to-[#d4921f]",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
  },
  {
    id: "snow-removal",
    title: "Snow Removal",
    description: "24/7 commercial snow management for parking lots, access roads, and industrial sites. Seasonal contracts and single-event response available.",
    features: ["Commercial Lot Clearing", "Salting & De-Icing", "Snow Hauling", "24/7 Storm Response", "Seasonal Contracts"],
    gradient: "from-[#2d4f64] to-[#3d6882]",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v18M3 12h18M5.636 5.636l12.728 12.728M18.364 5.636L5.636 18.364" />
      </svg>
    ),
  },
];

export default function Services() {
  const [activeId, setActiveId] = useState<string>("excavation");
  const activeService = services.find(s => s.id === activeId) || services[0];

  return (
    <section id="services" className="section-padding bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-[#F5A623]/10 text-[#0f1f2d] px-4 py-2 rounded-full text-sm font-semibold mb-4 md:mb-6">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
            </svg>
            Our Services
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[#0f1f2d] mb-4 md:mb-5">
            The Work We
            <span className="text-[#F5A623]"> Do</span>
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Excavation, snow removal, and landscaping for Saskatoon and surrounding Saskatchewan communities. Licensed, insured, WCB compliant.
          </p>
        </div>

        {/* Mobile: Horizontal Scroll Tabs */}
        <div className="lg:hidden mb-6 -mx-4 px-4">
          <div className="flex gap-2 overflow-x-auto pb-3 scroll-smooth-x">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => setActiveId(service.id)}
                className={`flex-shrink-0 flex items-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-200 touch-manipulation whitespace-nowrap ${
                  activeId === service.id
                    ? "bg-[#0f1f2d] text-white shadow-lg"
                    : "bg-gray-100 text-[#0f1f2d] active:bg-gray-200"
                }`}
              >
                <span className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  activeId === service.id ? "bg-[#F5A623] text-[#0f1f2d]" : "bg-white"
                }`}>
                  {service.icon}
                </span>
                {service.title.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Desktop/Tablet Layout */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Service Cards - Desktop Only */}
          <div className="hidden lg:block lg:col-span-1 space-y-3">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => setActiveId(service.id)}
                className={`w-full text-left p-5 rounded-2xl transition-all duration-300 group ${
                  activeId === service.id
                    ? "bg-[#0f1f2d] shadow-xl shadow-[#0f1f2d]/20"
                    : "bg-[#f7f4ef] hover:bg-gray-100"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    activeId === service.id
                      ? `bg-[#F5A623] text-[#0f1f2d] shadow-lg`
                      : "bg-white text-[#0f1f2d] group-hover:scale-105"
                  }`}>
                    {service.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-semibold transition-colors duration-300 ${
                      activeId === service.id ? "text-white" : "text-[#0f1f2d]"
                    }`}>
                      {service.title}
                    </h3>
                  </div>
                  <svg
                    className={`w-5 h-5 transition-all duration-300 ${
                      activeId === service.id
                        ? "text-[#F5A623] rotate-0"
                        : "text-gray-400 -rotate-90"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            ))}
          </div>

          {/* Active Service Detail */}
          <div className="lg:col-span-2">
            <div className="bg-[#f7f4ef] rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10 border border-gray-200/50 h-full">
              <div className={`inline-flex w-14 h-14 md:w-16 md:h-16 rounded-xl md:rounded-2xl items-center justify-center bg-gradient-to-br ${activeService.gradient} text-white shadow-lg mb-5 md:mb-6`}>
                {activeService.icon}
              </div>

              <h3 className="text-xl md:text-2xl lg:text-3xl font-black text-[#0f1f2d] mb-3 md:mb-4">
                {activeService.title}
              </h3>

              <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-6 md:mb-8">
                {activeService.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-8">
                {activeService.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 bg-white rounded-xl p-3 md:p-4 shadow-sm">
                    <div className={`w-7 h-7 md:w-8 md:h-8 rounded-lg bg-gradient-to-br ${activeService.gradient} flex items-center justify-center flex-shrink-0`}>
                      <svg className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-[#0f1f2d] font-medium text-sm md:text-base">{feature}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/contact"
                className="btn-primary inline-flex w-full sm:w-auto justify-center"
              >
                Get a Quote
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
