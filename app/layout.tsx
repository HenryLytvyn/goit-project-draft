import 'modern-normalize/modern-normalize.css';
import './globals.css';

import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { Nunito_Sans } from 'next/font/google';
import { Sora } from 'next/font/google';
import css from './Home.module.css';
import AuthProvider from '@/components/AuthProvider/AuthProvider';

type ChildrenType = {
  children: React.ReactNode;
  modal: React.ReactNode;
};

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

export default function RootLayout({
  children,
  modal,
}: Readonly<ChildrenType>) {
  return (
    <html lang="en">
      <body className={`${nunitoSans.variable} ${sora.variable}`}>
        <TanStackProvider>
          <AuthProvider>
            <Header />
            <main className={css.main}>{children}</main>
            <Footer />
            <div style={{ position: 'fixed', top: 0, left: 0 }}>{modal}</div>
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
