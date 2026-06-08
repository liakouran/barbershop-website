import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';

const display = Cormorant_Garamond({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-display',
  weight: ['500', '600', '700']
});

const sans = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-sans'
});

export const metadata: Metadata = {
  title: 'Numa Hair Salon',
  description: 'Premium barber shop experience in Greece.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="el" className={`${display.variable} ${sans.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}