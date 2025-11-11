// Components/Header/Header.tsx

'use client';

import { usePathname } from 'next/navigation';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import css from './Header.module.css';
import MobileMenuBtn from '../MobileMenuBtn/MobileMenuBtn';
import { useState } from 'react';

export default function Header() {
  const isMainPage = usePathname() === '/';

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  function handleMobileMenu() {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }

  return (
    <header className={`${css.header} ${isMainPage ? css.headerMainPage : ''}`}>
      <div className={`container ${css.headerContainer}`}>
        <Logo variant={isMainPage ? 'header-main-page' : undefined} />
        <Navigation variant={isMainPage ? 'header-main-page' : 'header'} />
        <MobileMenuBtn
          variant={isMainPage ? 'header-main-page' : undefined}
          handleClick={handleMobileMenu}
          isOpen={isMobileMenuOpen}
        />
      </div>
    </header>
  );
}
