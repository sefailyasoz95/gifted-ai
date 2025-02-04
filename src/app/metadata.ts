import type { Metadata } from 'next'

const title = 'Gifted-AI - AI-Powered Instagram Caption Generator by Softwarify'
const description = 'Generate engaging, creative Instagram captions instantly with AI. Upload your photo and get the perfect caption for maximum engagement. A product by Softwarify.'

export const metadata: Metadata = {
  metadataBase: new URL('https://Gifted-AI.vercel.app'),
  title: {
    default: title,
    template: '%s | Gifted-AI by Softwarify'
  },
  description,
  applicationName: 'Gifted-AI',
  referrer: 'origin-when-cross-origin',
  keywords: [
    'Instagram caption generator',
    'AI caption generator',
    'social media caption',
    'Instagram post helper',
    'AI writing assistant',
    'photo caption generator',
    'Instagram content creation',
    'social media tools',
    'Instagram marketing',
    'AI content generator',
    'Softwarify tools',
    'Instagram AI',
    'social media automation',
    'content creation tool'
  ],
  authors: [{ name: 'Softwarify', url: 'https://softwarify.co' }],
  creator: 'Softwarify',
  publisher: 'Softwarify',
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
    locale: 'en_US',
    url: 'https://Gifted-AI.vercel.app',
    title,
    description,
    siteName: title,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Gifted-AI - AI-Powered Instagram Caption Generator by Softwarify'
      }
    ],
    countryName: 'United States',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/og-image.png'],
    creator: '@softwarify',
    site: '@softwarify',
    creatorId: '1467726470533754880'
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
    shortcut: [
      { url: '/favicon.svg', type: 'image/svg+xml' }
    ],
    apple: [
      { url: '/apple-icon.png' }
    ]
  },
  alternates: {
    canonical: 'https://Gifted-AI.vercel.app',
    languages: {
      'en-US': 'https://Gifted-AI.vercel.app'
    }
  },
  verification: {
    google: 'your-google-site-verification',
    yandex: 'your-yandex-verification',
    yahoo: 'your-yahoo-verification'
  },
  category: 'technology',
  classification: 'AI Tools & Utilities',
}
