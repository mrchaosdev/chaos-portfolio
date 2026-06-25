'use client';

import type { Dispatch, SetStateAction } from "react";
import { Menu, X } from "lucide-react";
import { useTheme } from "./ThemeProvider";

type NavProps = {
  menuOpen: boolean;
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
};

export default function Nav({ menuOpen, setMenuOpen }: NavProps) {
  const { theme, toggle } = useTheme();
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="nav-shell">
      <a className="brand" href="#top" aria-label="Chaosdev home">
        <span className="brand-mark">C</span>
        <span>CHAOS//DEV</span>
      </a>
      <nav className={menuOpen ? "nav-links open" : "nav-links"} aria-label="Primary navigation">
        <a href="#about" onClick={closeMenu}>About</a>
        <a href="#work" onClick={closeMenu}>Work</a>
        <a href="#services" onClick={closeMenu}>Capabilities</a>
        <a href="#contact" onClick={closeMenu}>Contact</a>
      </nav>
      <div className="nav-end">
        <div className="nav-status"><i /> Web3 → Web2 bridge</div>
        <button
          className={`theme-toggle ${theme}`}
          onClick={toggle}
          aria-label={`Switch to ${theme === 'web3' ? 'Web2' : 'Web3'} mode`}
        >
          <span className="toggle-label">WEB3</span>
          <span className="toggle-label">WEB2</span>
          <span className="toggle-thumb" />
        </button>
      </div>
      <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" aria-expanded={menuOpen}>
        {menuOpen ? <X /> : <Menu />}
      </button>
    </header>
  );
}
