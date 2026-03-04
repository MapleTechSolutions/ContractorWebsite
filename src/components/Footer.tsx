import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white">
      {/* Main Footer */}
      <div className="section-padding pb-8 md:pb-12">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8">
            {/* Company Info */}
            <div className="col-span-2 md:col-span-2 lg:col-span-1">
              <Link href="/" className="flex items-center gap-2 md:gap-3 mb-5 md:mb-6">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-[#F5A623] rounded-xl flex items-center justify-center shadow-lg shadow-[#F5A623]/20">
                  <Image
                    src="/logo.svg"
                    alt="Big Country Landscaping & Maintenance Ltd"
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </div>
                <div>
                  <span className="text-lg md:text-xl font-bold">Big Country Landscaping &amp; Maintenance Ltd</span>
                  <span className="block text-[10px] md:text-xs text-[#F5A623] font-semibold tracking-widest uppercase">Excavation & Snow Removal</span>
                </div>
              </Link>
              <p className="text-gray-400 mb-5 md:mb-6 leading-relaxed text-sm md:text-base">
                Big Country Landscaping &amp; Maintenance Ltd has been serving commercial and industrial clients across the Big Country region of Alberta for over 15 years.
              </p>
              <div className="flex gap-2 md:gap-3">
                {["facebook", "instagram", "google"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="w-10 h-10 md:w-10 md:h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center active:bg-[#F5A623] active:border-[#F5A623] active:text-[#0f1f2d] transition-all duration-200 touch-manipulation"
                    aria-label={social}
                  >
                    {social === "facebook" && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    )}
                    {social === "instagram" && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    )}
                    {social === "google" && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                      </svg>
                    )}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-base md:text-lg font-bold mb-4 md:mb-6">Quick Links</h4>
              <ul className="space-y-2 md:space-y-3">
                {[
                  { href: "/", label: "Home" },
                  { href: "/services", label: "Services" },
                  { href: "/about", label: "About Us" },
                  { href: "/reviews", label: "Reviews" },
                  { href: "/contact", label: "Contact" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-gray-400 active:text-[#F5A623] transition-colors flex items-center gap-2 group py-1 touch-manipulation text-sm md:text-base">
                      <svg className="w-3 h-3 md:w-4 md:h-4 text-[#F5A623] opacity-0 group-active:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-base md:text-lg font-bold mb-4 md:mb-6">Our Services</h4>
              <ul className="space-y-2 md:space-y-3">
                {["Excavation", "Snow Removal", "Site Clearing", "Rough Grading", "Utility Trenching"].map((service) => (
                  <li key={service}>
                    <Link href="/services" className="text-gray-400 active:text-[#F5A623] transition-colors flex items-center gap-2 group py-1 touch-manipulation text-sm md:text-base">
                      <svg className="w-3 h-3 md:w-4 md:h-4 text-[#F5A623] opacity-0 group-active:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      {service}
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="text-white/50 text-sm mt-4">Serving Big Country region, Alberta</p>
            </div>

            {/* Contact */}
            <div className="col-span-2 md:col-span-1">
              <h4 className="text-base md:text-lg font-bold mb-4 md:mb-6">Contact</h4>
              <ul className="space-y-3 md:space-y-4">
                <li>
                  <a href="tel:+15875551234" className="flex items-center gap-3 text-gray-400 active:text-[#F5A623] transition-colors touch-manipulation">
                    <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-[#0f1f2d] flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 md:w-5 md:h-5 text-[#F5A623]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <span className="font-semibold text-sm md:text-base">(587) 555-1234</span>
                  </a>
                </li>
                <li>
                  <a href="mailto:info@bigcountrylandscaping.ca" className="flex items-center gap-3 text-gray-400 active:text-[#F5A623] transition-colors touch-manipulation">
                    <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-[#0f1f2d] flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 md:w-5 md:h-5 text-[#F5A623]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span className="text-sm md:text-base">info@bigcountrylandscaping.ca</span>
                  </a>
                </li>
                <li className="flex items-start gap-3 text-gray-400">
                  <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-[#0f1f2d] flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 md:w-5 md:h-5 text-[#F5A623]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="text-sm md:text-base">
                    <div>Mon-Fri: 7AM-6PM</div>
                    <div className="text-[#F5A623] font-bold">On-call for emergencies</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-4 md:py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
            <p className="text-gray-500 text-xs md:text-sm text-center md:text-left">
              &copy; {currentYear} Big Country Landscaping &amp; Maintenance Ltd. All rights reserved.
            </p>
            <div className="flex gap-4 md:gap-6 text-xs md:text-sm">
              <a href="#" className="text-gray-500 active:text-[#F5A623] transition-colors touch-manipulation">Privacy Policy</a>
              <a href="#" className="text-gray-500 active:text-[#F5A623] transition-colors touch-manipulation">Terms of Service</a>
              <a href="/sitemap.xml" className="text-gray-500 active:text-[#F5A623] transition-colors touch-manipulation">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
