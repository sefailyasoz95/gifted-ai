import type { Metadata } from 'next'

const title = 'Gifted-AI: Smart Gift Ideas Generator'
const description = 'Get AI-powered gift recommendations tailored to your needs. Upload photos and receive personalized gift suggestions for any occasion using advanced Google Gemini AI technology.'

export const metadata: Metadata = {
  metadataBase: new URL('https://gifted-ai.vercel.app'),
  title: {
    default: title,
    template: '%s - Gifted-AI'
  },
  description,
  applicationName: 'Gifted-AI',
  referrer: 'origin-when-cross-origin',
  keywords: [
    'AI gift recommendations',
    'gift finder AI',
    'smart gift assistant',
    'AI shopping helper',
    'gift ideas generator',
    'personalized presents',
    'AI gift guide',
    'occasion-based gifts',
    'AI shopping assistant',
    'gift inspiration',
    'Google Gemini AI'
  ],
  authors: [{ name: 'Sefa Oz', url: 'https://github.com/sefailyasoz95' }],
  creator: 'Sefa Oz',
  publisher: 'Gifted-AI',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
      noimageindex: false,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en',
    url: 'https://gifted-ai.vercel.app',
    title,
    description,
    siteName: title,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Gifted-AI: Smart Gift Ideas Generator'
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/og-image.png'],
    creator: '@sefailyasoz',
    site: '@GiftedAI',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico' }
    ],
    shortcut: ['/favicon.ico'],
    apple: ['/apple-icon.png']
  },
  alternates: {
    canonical: 'https://gifted-ai.vercel.app',
    languages: {
      'en': 'https://gifted-ai.vercel.app'
    }
  },
  verification: {
    google: 'ADD_YOUR_GOOGLE_SITE_VERIFICATION',
    yandex: 'ADD_YOUR_YANDEX_VERIFICATION',
  },
  category: 'AI Tools',
  classification: 'Gift Recommendations',
  other: {
    'content-language': 'en'
  }
}
