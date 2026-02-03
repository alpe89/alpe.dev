import type { Metadata, Viewport } from 'next'
import { Footer } from '@/components/ui/Footer'
import { inter, jetbrainsMono, spaceGrotesk } from './fonts'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://alpe.dev'),
  title: 'Alberto Pertusi | Technical Lead & Bug Manufacturer',
  icons: {
    icon: '/favicon.svg',
    apple: '/icon.svg',
  },
  description:
    'Personal website of Alberto Pertusi - Technical Lead at Banca AideXa, Full-Stack TypeScript enthusiast, competitive gamer, and proud Shiba Inu parent.',
  keywords: [
    'Alberto Pertusi',
    'Technical Lead',
    'Full Stack Developer',
    'TypeScript',
    'React',
    'Node.js',
    'Milan',
    'Banca AideXa',
  ],
  authors: [{ name: 'Alberto Pertusi' }],
  creator: 'Alberto Pertusi',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://alpe.dev',
    siteName: 'alpe.dev',
    title: 'Alberto Pertusi | Technical Lead & Bug Manufacturer',
    description:
      'Personal website of Alberto Pertusi - Technical Lead, Full-Stack TypeScript enthusiast, and proud Shiba Inu parent.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alberto Pertusi | Technical Lead & Bug Manufacturer',
    description:
      'Personal website of Alberto Pertusi - Technical Lead, Full-Stack TypeScript enthusiast, and proud Shiba Inu parent.',
    creator: '@albertoperdomo2',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0a0f',
  width: 'device-width',
  initialScale: 1,
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Alberto Pertusi',
  url: 'https://alpe.dev',
  jobTitle: 'Technical Lead',
  worksFor: {
    '@type': 'Organization',
    name: 'Banca AideXa',
  },
  sameAs: [
    'https://github.com/alpe89',
    'https://linkedin.com/in/albertopertusi',
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
