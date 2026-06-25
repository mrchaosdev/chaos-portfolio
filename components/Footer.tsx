'use client';

import { SiGithub, SiGmail } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";
import { contactLinks } from "./data";

export default function Footer() {
  return (
    <footer className="section-shell">
      <a className="brand" href="#top"><span className="brand-mark">C</span><span>CHAOS//DEV</span></a>
      <p>Translating Web3 chaos into Web2 clarity.</p>
      <div>
        <a href={contactLinks.github} target="_blank" rel="noreferrer"><SiGithub /> GitHub</a>
        <a href={contactLinks.x} target="_blank" rel="noreferrer"><FaXTwitter /> X</a>
        <a href={`mailto:${contactLinks.email}`}><SiGmail /> Email</a>
      </div>
      <span>© {new Date().getFullYear()} CHAOSDEV</span>
    </footer>
  );
}
