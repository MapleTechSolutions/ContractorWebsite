import type { Metadata, Viewport } from "next";
import { Montserrat } from 'next/font/google'
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileStickyCTA from "@/components/MobileStickyCTA";
import SeasonalBar from '@/components/SeasonalBar'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-montserrat',
  display: 'swap',
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#0f1f2d",
  colorScheme: "light",
};

export const metadata: Metadata = {
  metadataBase: new URL('https://bigcountrylandscaping.ca'),
  title: {
    default: 'Big Country Landscaping & Maintenance Ltd | Excavation & Snow Removal',
    template: '%s | Big Country Landscaping',
  },
  description: 'Commercial excavation and snow removal across Big Country, Alberta. Licensed, insured, and WCB compliant. 15+ years serving commercial clients. Get a free site estimate.',
  keywords: ['excavation Alberta', 'snow removal Alberta', 'commercial excavation', 'Big Country Alberta', 'site clearing', 'snow hauling', 'WCB compliant contractor', 'Alberta One-Call'],
  authors: [{ name: 'Big Country Landscaping & Maintenance Ltd' }],
  creator: 'Big Country Landscaping & Maintenance Ltd',
  publisher: 'Big Country Landscaping & Maintenance Ltd',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    url: 'https://bigcountrylandscaping.ca',
    siteName: 'Big Country Landscaping & Maintenance Ltd',
    title: 'Big Country Landscaping & Maintenance Ltd | Excavation & Snow Removal',
    description: 'Commercial excavation and snow removal across Big Country, Alberta. Licensed, insured, WCB compliant.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Big Country Landscaping & Maintenance Ltd - Commercial Excavation & Snow Removal',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Big Country Landscaping & Maintenance Ltd',
    description: 'Commercial excavation and snow removal across Big Country, Alberta.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={montserrat.variable}>
      <head>
        <link rel="canonical" href="https://bigcountrylandscaping.ca" />
      </head>
      <body className="antialiased">
        <SeasonalBar />
        <Header />
        <main>{children}</main>
        <Footer />
        <MobileStickyCTA />
      </body>
    </html>
  );
}
