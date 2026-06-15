import type { Metadata } from 'next'
import { Cormorant_Garamond, Manrope } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ScrollToTop } from '@/components/ScrollToTop'

const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope' })
const cormorant = Cormorant_Garamond({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-cormorant' })

export const metadata: Metadata = {
  title: {
    default: 'The Digital ARMSS',
    template: '%s | The Digital ARMSS'
  },
  description: 'The Digital ARMSS is a premium digital marketing agency in Pune helping brands grow through strategy, creative, and performance marketing.',
  metadataBase: new URL('https://thedigitalarmss.com'),
  keywords: ['digital marketing agency Pune', 'SEO services', 'brand strategy', 'website design', 'performance marketing'],
  alternates: { canonical: '/' },
  authors: [{ name: 'The Digital ARMSS' }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1
    }
  },
  openGraph: {
    title: 'The Digital ARMSS',
    description: 'The Digital Arm Behind Your Growth',
    type: 'website',
    url: 'https://thedigitalarmss.com',
    siteName: 'The Digital ARMSS'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Digital ARMSS',
    description: 'The Digital Arm Behind Your Growth'
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${cormorant.variable}`} suppressHydrationWarning>
      <body className="overflow-x-hidden">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  )
}