// import { ReactNode } from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import css from './Main.module.css';

interface MainLayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

export default function MainLayout({
  children,
  modal,
}: Readonly<MainLayoutProps>) {
  return (
    <>
      <Header />
      <main className={css.main}>{children}</main>
      <Footer />
      <div style={{ position: 'fixed', top: 0, left: 0 }}>{modal}</div>
    </>
  );
}
