import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import DisclaimerBar from '@/components/layout/DisclaimerBar';
import { siteMetadata, CF_BEACON_TOKEN } from '@/lib/metadata';
import './globals.css';

// Self-hosted copies of the Google Fonts files (latin subset, variable weight), see app/fonts/README.md.
// next/font/google fetched them from Google at build time, and that fetch broke on Cloudflare's
// build machines on 2026-11-13 (Google returned file URLs next/font could not parse).
const inter = localFont({
  src: './fonts/inter-latin-var.woff2',
  weight: '400 700',
  display: 'swap',
  variable: '--font-inter',
});

const jetbrainsMono = localFont({
  src: './fonts/jetbrains-mono-latin-var.woff2',
  weight: '400 600',
  display: 'swap',
  variable: '--font-jetbrains-mono',
});

export const metadata: Metadata = siteMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen antialiased">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <DisclaimerBar />
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        {/* Cloudflare Web Analytics: cookieless, aggregate visit counter,
            disclosed in the privacy + security pages. Renders only when the
            public beacon token is set. */}
        {CF_BEACON_TOKEN && (
          <script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={JSON.stringify({ token: CF_BEACON_TOKEN })}
          />
        )}
      </body>
    </html>
  );
}
