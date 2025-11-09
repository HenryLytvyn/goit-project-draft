// src/stores/useScreenStore.js

import { ScreenSize } from '@/constants/constants';
import { create } from 'zustand';

type ScreenSizeType = 'mobile' | 'tablet' | 'desktop';

type BreakpointStore = {
  screenSize: ScreenSizeType | undefined;
  setScreenSize: (width: number) => void;
  screenSizeReady: boolean;
};

export const useBreakpointStore = create<BreakpointStore>()(set => ({
  screenSize: undefined,
  screenSizeReady: false,
  setScreenSize: (width: number) =>
    set(() => ({ screenSize: getScreenSize(width), screenSizeReady: true })),
}));

function getScreenSize(width: number): ScreenSizeType {
  if (width >= ScreenSize.Desktop) return 'desktop';
  if (width >= ScreenSize.Tablet) return 'tablet';
  return 'mobile';
}
