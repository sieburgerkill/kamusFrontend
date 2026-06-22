import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Kamus EPS-TOPIK',
  description: 'Belajar kosakata dan tata bahasa Korea untuk ujian EPS-TOPIK',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={`${inter.variable} font-sans bg-cream text-ink antialiased`}>
        {children}
      </body>
    </html>
  );
}
