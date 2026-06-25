'use client';

import { ArrowDownRight, Radio } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";
import LogoLoop from "../LogoLoop";
import HeroPortraitCard from "../ui/HeroPortraitCard";
import { makeLogoItems } from "../ui/StackIcon";
import { contactLinks, protocolProps, langLoopItems, libLoopItems } from "../data";
import { useTheme } from "../ThemeProvider";

const langItems = makeLogoItems(langLoopItems);
const libItems = makeLogoItems(libLoopItems);

export default function Hero() {
  const { theme } = useTheme();
  const fadeColor = theme === 'web2' ? '#f5f4f9' : '#050208';

  return (
    <section className="hero section-shell" id="top">
      <div className="hero-grid">
        <div className="hero-main">
          <p className="hero-kicker"><span>FULLSTACK WEB2 / WEB3 FRONTEND</span><span>BANGKOK / UTC+7</span></p>
          <h1 aria-label="Web3 to Web2 product layer">
            <span className="word-clip"><span className="hero-word">WEB3</span></span>
            <span className="word-clip outline"><span className="hero-word">TO WEB2</span></span>
            <span className="word-clip compact"><span className="hero-word">PRODUCT LAYER.</span></span>
          </h1>
          <p className="hero-copy">
            I build the bridge between <strong>Web3 systems</strong> and <strong>Web2 users</strong> — React/Next frontends, .NET APIs, wallet flows and dashboards that feel familiar, fast and trusted.
          </p>
          <div className="hero-actions">
            <a className="button primary magnetic" href="#about">Decode the bridge <ArrowDownRight /></a>
            <a className="button ghost magnetic" href={contactLinks.github} target="_blank" rel="noreferrer"><SiGithub /> GitHub</a>
            <a className="button ghost magnetic" href={contactLinks.x} target="_blank" rel="noreferrer"><FaXTwitter /> X</a>
          </div>
          <div className="experience-chip" aria-hidden="true">
            <Radio />
            <span>Web3 → Web2 translation / mouse-tracked signal / product-first interface</span>
          </div>
        </div>

        <div className="hero-experience" aria-label="Chaosdev interactive protocol panel">
          <HeroPortraitCard />
          <div className="hero-console-strip" aria-hidden="true">
            {protocolProps.map((prop) => (
              <span className={prop.tone} key={prop.name}>
                <b>{prop.name}</b>
                {prop.value.replaceAll('"', "")}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="stack-loop" data-reveal>
        <LogoLoop logos={langItems} speed={90} direction="left" logoHeight={52} gap={56} fadeOut fadeOutColor={fadeColor} scaleOnHover ariaLabel="Languages and runtimes" />
        <LogoLoop logos={libItems} speed={90} direction="right" logoHeight={52} gap={56} fadeOut fadeOutColor={fadeColor} scaleOnHover ariaLabel="Frameworks, libraries and tools" />
      </div>
    </section>
  );
}
