import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'DjaCar – Location de voitures à Alger | Car Rental Algiers',
  description:
    'DjaCar propose la location de voitures premium à Alger, Algérie. Flotte variée, tarifs en DZD, livraison aéroport Houari Boumédiène, confirmation WhatsApp. Réservez facilement en ligne.',
  keywords: [
    'location voiture Alger',
    'car rental Algiers',
    'location voiture Algérie',
    'DjaCar',
    'louer voiture Alger',
    'location véhicule Alger',
    'car hire Algeria',
    'voiture de location Algérie',
  ],
  metadataBase: new URL('https://djacar-website.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'DjaCar – Location de voitures à Alger',
    description:
      'Louez une voiture premium à Alger avec DjaCar. Flotte variée, prix en DZD, livraison aéroport. Réservation simple via WhatsApp.',
    url: 'https://djacar-website.vercel.app',
    siteName: 'DjaCar',
    locale: 'fr_DZ',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DjaCar – Location de voitures à Alger',
    description:
      'Location de voitures premium à Alger. Tarifs en DZD, livraison aéroport, confirmation WhatsApp.',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'AutoRental'],
    name: 'DjaCar',
    description:
      'Location de voitures premium à Alger, Algérie. Flotte variée, tarifs en DZD, livraison aéroport Houari Boumédiène.',
    url: 'https://djacar-website.vercel.app',
    telephone: '+213555123456',
    email: 'contact@djacar.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Avenue de l\'ALN',
      addressLocality: 'Alger',
      addressCountry: 'DZ',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 36.7538,
      longitude: 3.0588,
    },
    areaServed: {
      '@type': 'City',
      name: 'Alger',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '08:00',
      closes: '20:00',
    },
    priceRange: 'DZD',
    currenciesAccepted: 'DZD',
    paymentAccepted: 'Cash',
  };

  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow">
          {children}
        </div>
        <Footer />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

