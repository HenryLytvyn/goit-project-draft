// BreakpointInitializer.tsx

'use client';

import { useBreakpointStore } from '@/lib/store/breakpointStore';
import { useEffect } from 'react';

export default function BreakpointInitializer() {
  const setScreenSize = useBreakpointStore(state => state.setScreenSize);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setScreenSize]);

  return null;
}
