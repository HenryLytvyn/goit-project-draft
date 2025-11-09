// Components/Header/Header.client.tsx
'use client';

import { useState } from 'react';
import MobileMenuBtn from '../MobileMenuBtn/MobileMenuBtn';

type HeaderClientProps = {
  variant?: 'header-main-page';
};

export default function HeaderClient({ variant }: HeaderClientProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  function handleMobileMenu() {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }

  return (
    <MobileMenuBtn
      variant={variant}
      handleClick={handleMobileMenu}
      isOpen={isMobileMenuOpen}
    />
  );
}
