import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: "Darsi - Laith's Study World",
  description: 'Interactive study platform for Laith',
  manifest: '/darsi.app/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Darsi',
  },
  icons: {
    icon: '/darsi.app/icons/icon-192x192.png',
    apple: '/darsi.app/icons/icon-192x192.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#2563EB',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;500;600;700;800&family=Nunito:wght@400;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Darsi" />
        <link rel="apple-touch-icon" href="/darsi.app/icons/icon-192x192.png" />
      </head>
      <body className="font-body bg-bg text-text h-full overflow-hidden">
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/darsi.app/sw.js');
                });
              }
            `,
          }}
        />
      </body>
    </html>
  )
}
