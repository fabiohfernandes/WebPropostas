// ============================================================================
// Root Layout - Main App Layout with Providers
// NOVA Agent - Frontend Development Specialist
// ============================================================================

import {
  Inter,
  JetBrains_Mono,
  Roboto,
  Open_Sans,
  Montserrat,
  Poppins,
  Lato,
  Playfair_Display,
  Raleway,
  Merriweather,
  Oswald,
  Source_Sans_3
} from 'next/font/google';
import type { Metadata } from 'next';
import { appConfig } from '@/config';
import { Providers } from './providers';
import { cn } from '@/utils';
import '@/styles/globals.css';

// Font configuration - All fonts for builder
// Load fonts globally so they're available to Konva canvas
const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700', '900'],
  variable: '--font-roboto',
  display: 'swap',
});

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-open-sans',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-montserrat',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
});

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  variable: '--font-lato',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-playfair',
  display: 'swap',
});

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-raleway',
  display: 'swap',
});

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  variable: '--font-merriweather',
  display: 'swap',
});

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700'],
  variable: '--font-oswald',
  display: 'swap',
});

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '900'],
  variable: '--font-source-sans',
  display: 'swap',
});

// Metadata configuration
export const metadata: Metadata = {
  title: {
    default: appConfig.appName,
    template: `%s | ${appConfig.appName}`,
  },
  description: 'Plataforma moderna para criação e gestão de orçamentos online com colaboração em tempo real.',
  keywords: [
    'orçamentos',
    'propostas',
    'gestão',
    'colaboração',
    'online',
    'business',
    'quotations',
    'estimates',
  ],
  authors: [
    {
      name: 'NOVA Agent - Frontend Development Specialist',
      url: 'https://github.com/orcamentos-online',
    },
  ],
  creator: 'WebPropostas Team',
  publisher: 'WebPropostas',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: process.env.NEXT_PUBLIC_DOMAIN || 'http://localhost:3001',
    title: appConfig.appName,
    description: 'Plataforma moderna para criação e gestão de orçamentos online com colaboração em tempo real.',
    siteName: appConfig.appName,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: `${appConfig.appName} - Gestão de Orçamentos Online`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: appConfig.appName,
    description: 'Plataforma moderna para criação e gestão de orçamentos online com colaboração em tempo real.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon-16x16.png',
    shortcut: '/favicon-16x16.png',
    apple: '/favicon-16x16.png',
  },
  manifest: '/manifest.json',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  verification: {
    // Add verification IDs when ready for production
    // google: 'verification-code',
    // yandex: 'verification-code',
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="pt-BR"
      className={cn(
        'h-full bg-gray-50',
        inter.variable,
        jetbrainsMono.variable,
        roboto.variable,
        openSans.variable,
        montserrat.variable,
        poppins.variable,
        lato.variable,
        playfair.variable,
        raleway.variable,
        merriweather.variable,
        oswald.variable,
        sourceSans.variable
      )}
      suppressHydrationWarning
    >
      <head>
        {/* PWA meta tags */}
        <meta name="application-name" content={appConfig.appName} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content={appConfig.appName} />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#2563eb" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#2563eb" />

        {/* Performance optimization */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="preconnect" href="//fonts.gstatic.com" crossOrigin="" />

        {/* Google Fonts for Konva canvas - Load with actual font names */}
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@200;300;400;500;600;700;900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@200;300;400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700;900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@100;200;300;400;500;600;700;800&display=swap" rel="stylesheet" />

        {/* Handwritten fonts for Post-it notes */}
        <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Patrick+Hand&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap" rel="stylesheet" />

        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: appConfig.appName,
              description: 'Plataforma moderna para criação e gestão de orçamentos online',
              applicationCategory: 'BusinessApplication',
              operatingSystem: 'All',
              browserRequirements: 'Requires JavaScript. Requires HTML5.',
              url: process.env.NEXT_PUBLIC_DOMAIN || 'http://localhost:3001',
              author: {
                '@type': 'Organization',
                name: 'WebPropostas Team',
              },
            }),
          }}
        />
      </head>
      <body
        className={cn(
          'h-full font-sans antialiased',
          'selection:bg-primary-100 selection:text-primary-900'
        )}
      >
        {/* Skip to main content for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 px-4 py-2 bg-primary-600 text-white rounded-md font-medium"
        >
          Pular para o conteúdo principal
        </a>

        {/* App providers and content */}
        <Providers>
          <div id="root" className="h-full">
            {children}
          </div>
        </Providers>

        {/* Portal for modals and toasts */}
        <div id="modal-root" />
        <div id="toast-root" />

        {/* Performance monitoring script */}
        {process.env.NODE_ENV === 'production' && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                if ('serviceWorker' in navigator) {
                  window.addEventListener('load', function() {
                    navigator.serviceWorker.register('/sw.js')
                      .then(function(registration) {
                        console.log('SW registered: ', registration);
                      })
                      .catch(function(registrationError) {
                        console.log('SW registration failed: ', registrationError);
                      });
                  });
                }
              `,
            }}
          />
        )}
      </body>
    </html>
  );
}