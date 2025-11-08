'use client';

import { useState } from 'react';
import MobileMenuBtn from '../MobileMenuBtn/MobileMenuBtn';
// import css from './Header.module.css';

export default function HeaderClient() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  function handleMobileMenu() {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }

  return (
    <MobileMenuBtn handleClick={handleMobileMenu} isOpen={isMobileMenuOpen} />
  );
}
