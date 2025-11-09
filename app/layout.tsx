import 'modern-normalize/modern-normalize.css';
import './globals.css';

import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import { Nunito_Sans } from 'next/font/google';
import { Sora } from 'next/font/google';
import AuthProvider from '@/components/AuthProvider/AuthProvider';
import { Metadata } from 'next';

const nunitoSans = Nunito_Sans({
  subsets: ['cyrillic'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-nunito-sans',
  display: 'swap',
});

const sora = Sora({
  subsets: ['latin-ext'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sora',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Travel App',
  description: 'Travel application',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body className={`${nunitoSans.variable} ${sora.variable}`}>
        <TanStackProvider>
          <AuthProvider>{children}</AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
