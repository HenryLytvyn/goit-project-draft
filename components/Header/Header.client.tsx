// Components/Header/Header.client.tsx
'use client';

import { useState } from 'react';
import MobileMenuBtn from '../MobileMenuBtn/MobileMenuBtn';
// import { useBreakpointStore } from '@/lib/store/breakpointStore';

type HeaderClientProps = {
  variant?: 'header-main-page';
};

export default function HeaderClient({ variant }: HeaderClientProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // const { screenSize, screenSizeReady } = useBreakpointStore(state => ({
  //   screenSize: state.screenSize,
  //   screenSizeReady: state.screenSizeReady,
  // }));

  // const screenSize = useBreakpointStore(state => state.screenSize);

  // console.log(screenSize);

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
