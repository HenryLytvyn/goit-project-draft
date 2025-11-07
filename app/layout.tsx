import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import './globals.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { Nunito_Sans } from 'next/font/google';
import { Sora } from 'next/font/google';
import AuthProvider from '@/components/AuthProvider/AuthProvider';

type ChildrenType = {
  children: React.ReactNode;
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

export default function RootLayout({ children }: Readonly<ChildrenType>) {
  return (
    <html lang="en">
      <body className={`${nunitoSans.variable} ${sora.variable}`}>
        <TanStackProvider>
          <AuthProvider>
            <Header />
            <main>{children}</main>
            <Footer />
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
