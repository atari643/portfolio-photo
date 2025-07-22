import './globals.css'
import { Inter, Playfair_Display } from 'next/font/google'
import { ThemeProvider } from '../components/providers/ThemeProvider'
import { Toaster } from 'react-hot-toast'
import { Metadata } from 'next'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Portfolio Photographe | Art & Émotion',
    template: '%s | Portfolio Photographe'
  },
  description: 'Portfolio professionnel de photographie - Capturer l\'émotion, sublimer l\'instant. Mariage, portrait, nature et bien plus.',
  keywords: ['photographe', 'portfolio', 'mariage', 'portrait', 'photographie professionnelle', 'art', 'créativité'],
  authors: [{ name: 'Votre Photographe' }],
  creator: 'Votre Photographe',
  publisher: 'Portfolio Photographe',
  metadataBase: new URL('https://votre-domaine.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://votre-domaine.com',
    title: 'Portfolio Photographe | Art & Émotion',
    description: 'Découvrez un univers photographique unique où chaque cliché raconte une histoire.',
    siteName: 'Portfolio Photographe',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Portfolio Photographe',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio Photographe | Art & Émotion',
    description: 'Découvrez un univers photographique unique où chaque cliché raconte une histoire.',
    images: ['/og-image.jpg'],
    creator: '@votre_pseudo',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'votre-code-google-verification',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ec4899" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans bg-neutral-50 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-50 transition-colors duration-300`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              className: 'glass',
              duration: 4000,
              style: {
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#fff',
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  )
}
