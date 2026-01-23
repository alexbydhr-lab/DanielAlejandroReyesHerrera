import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { profile } from '@/content/profile';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: `${profile.name} | ${profile.role}`,
  description: profile.subheadline,
  metadataBase: new URL('https://example.com'),
  openGraph: {
    title: `${profile.name} | ${profile.role}`,
    description: profile.subheadline,
    url: 'https://example.com',
    siteName: profile.name,
    images: [{ url: profile.ogImage || '/og-image.png' }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${inter.variable} antialiased`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
