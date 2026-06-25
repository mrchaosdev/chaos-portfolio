'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Theme = 'web3' | 'web2';
type ThemeCtxValue = { theme: Theme; toggle: () => void };

const ThemeCtx = createContext<ThemeCtxValue>({ theme: 'web3', toggle: () => {} });

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('web3');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeCtx.Provider value={{ theme, toggle: () => setTheme(t => t === 'web3' ? 'web2' : 'web3') }}>
      {children}
    </ThemeCtx.Provider>
  );
}

export const useTheme = () => useContext(ThemeCtx);
