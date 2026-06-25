'use client';

import { useDashboardContext } from './Provider';

const style = {
  overlay: 'bg-black/40 fixed inset-0 z-30 lg:hidden backdrop-blur-sm',
};

export function Overlay() {
  const { isOpen, closeSidebar } = useDashboardContext();
  return isOpen ? <div onClick={closeSidebar} className={style.overlay} /> : null;
}
