'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

type DashboardProviderProps = {
  children: React.ReactNode;
};

type ProviderValues = {
  isOpen?: boolean;
  openSidebar?: () => void;
  closeSidebar?: () => void;
};

const Context = React.createContext<ProviderValues>({});

export function DashboardProvider({ children }: DashboardProviderProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);

  const openSidebar = () => {
    setIsOpen(true);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  // close Sidebar on route changes
  React.useEffect(() => {
    if (isOpen && window.innerWidth < 1024) {
      setIsOpen(false);
    }
  }, [pathname]);

  return (
    <Context.Provider value={{ isOpen, openSidebar, closeSidebar }}>
      {children}
    </Context.Provider>
  );
}

export function useDashboardContext() {
  return React.useContext(Context);
}
