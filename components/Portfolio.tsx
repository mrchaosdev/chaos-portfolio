'use client';

import Image from "next/image";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowDownRight,
  ArrowUpRight,
  Braces,
  Github,
  Layers3,
  Mail,
  Menu,
  ShieldCheck,
  Sparkles,
  X,
  Zap,
} from "lucide-react";
import EvilEye from "./EvilEye";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const projects = [
  {
    index: "01",
    name: "ChaosSwap",
    type: "DEFI · AI",
    summary: "Trade across 15+ chains through natural language with risk-aware execution.",
    stack: ["React", "wagmi", "TypeScript", "SentientAGI"],
    href: "https://github.com/TuanChao/swap-auto-ai",
    tone: "violet",
  },
  {
    index: "02",
    name: "NFT AI Mint",
    type: "WEB3 · CREATIVE AI",
    summary: "Generate artwork from a prompt, store it on IPFS, then mint on Ethereum.",
    stack: ["Next.js", "wagmi", "IPFS", "AI"],
    href: "https://github.com/TuanChao/Nft-AI-mint",
    tone: "cyan",
  },
  {
    index: "03",
    name: "Roma Security",
    type: "CYBERSECURITY · MULTI-AGENT",
    summary: "Five coordinated agents for threat detection, simulation and AI-assisted response.",
    stack: ["React", "Python", "AI", "Realtime UI"],
    href: "https://github.com/TuanChao/Roma-Security-cyber",
    tone: "pink",
  },
  {
    index: "04",
    name: "ZWCAD Vietnam",
    type: "FULLSTACK · ENTERPRISE",
    summary: "A product site and admin system with a typed React frontend and .NET API.",
    stack: ["React", ".NET 8", "PostgreSQL", "i18n"],
    href: "https://github.com/TuanChao/landingPage",
    tone: "lime",
  },
];

const capabilities = [
  {
    icon: Braces,
    code: "01 / SYSTEMS",
    title: "Fullstack products",
    body: "React and Next.js interfaces backed by clean .NET APIs, real data models, and production-minded architecture.",
  },
  {
    icon: Layers3,
    code: "02 / ON-CHAIN",
    title: "Web3 interfaces",
    body: "Wallet flows, swaps, NFT products and dashboards that make complex blockchain actions feel understandable.",
  },
  {
    icon: Sparkles,
    code: "03 / EXPERIENCE",
    title: "Motion & creative UI",
    body: "Purposeful interaction, scroll choreography and visual systems that give a product a pulse without slowing it down.",
  },
];

export default function Portfolio() {
  const root = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) return;

      gsap.timeline({ defaults: { ease: "power3.out" } })
        .from(".nav-shell", { y: -30, opacity: 0, duration: 0.8 })
        .from(".hero-kicker", { y: 20, opacity: 0, duration: 0.6 }, "-=0.35")
        .from(".hero-word", { yPercent: 115, rotate: 2, duration: 1, stagger: 0.1 }, "-=0.3")
        .from(".hero-copy, .hero-actions", { y: 24, opacity: 0, duration: 0.7, stagger: 0.1 }, "-=0.6")
        .from(".avatar-stage", { scale: 0.82, opacity: 0, duration: 1.2 }, "-=1");

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.from(element, {
          y: 54,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 87%", once: true },
        });
      });

      gsap.to(".avatar-card", {
        yPercent: 8,
        ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1 },
      });
    },
    { scope: root },
  );

  const closeMenu = () => setMenuOpen(false);

  return (
    <main ref={root}>
      <div className="noise" aria-hidden="true" />
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
        <div className="nav-status"><i /> Available for work</div>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" aria-expanded={menuOpen}>
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      <section className="hero section-shell" id="top">
        <div className="hero-grid">
          <div className="hero-main">
            <p className="hero-kicker"><span>FULLSTACK / WEB3 ENGINEER</span><span>BANGKOK · UTC+7</span></p>
            <h1 aria-label="Build beyond the interface">
              <span className="word-clip"><span className="hero-word">BUILD</span></span>
              <span className="word-clip outline"><span className="hero-word">BEYOND</span></span>
              <span className="word-clip compact"><span className="hero-word">THE INTERFACE.</span></span>
            </h1>
            <p className="hero-copy">
              I turn complicated systems into digital products that feel sharp, fast and human — from <strong>.NET APIs</strong> to <strong>on-chain experiences</strong>.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#work">Explore work <ArrowDownRight /></a>
              <a className="button ghost" href="https://github.com/TuanChao" target="_blank" rel="noreferrer"><Github /> GitHub</a>
            </div>
          </div>

          <div className="avatar-stage" aria-label="Chaosdev profile artwork">
            <div className="eye-wrap">
              <EvilEye eyeColor="#8b5cff" intensity={1.3} pupilSize={0.62} irisWidth={0.22} glowIntensity={0.5} scale={0.72} noiseScale={1.1} pupilFollow={0.85} flameSpeed={0.72} backgroundColor="#05020b" />
            </div>
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="avatar-card">
              <Image src="/chaos-avatar.jpg" alt="Neon cyberpunk portrait of Chaosdev" fill priority sizes="(max-width: 900px) 82vw, 36vw" />
              <div className="avatar-scan" />
              <div className="avatar-label"><span>IDENTITY</span><strong>CHAOS_001</strong></div>
            </div>
            <span className="stage-note note-a">WEB2 / WEB3</span>
            <span className="stage-note note-b">BUILD SIGNAL: LIVE</span>
          </div>
        </div>
        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            {["NEXT.JS", "REACT", "TYPESCRIPT", ".NET", "POSTGRESQL", "WAGMI", "GSAP", "WEBGL", "NEXT.JS", "REACT", "TYPESCRIPT", ".NET"].map((item, index) => <span key={`${item}-${index}`}>{item}<i>✦</i></span>)}
          </div>
        </div>
      </section>

      <section className="manifesto section-shell" id="about">
        <div className="section-index" data-reveal><span>01</span><span>ABOUT THE BUILDER</span></div>
        <div className="manifesto-grid">
          <p className="manifesto-side" data-reveal>Code is only useful when the product around it makes sense.</p>
          <h2 data-reveal>I bridge the gap between <em>robust engineering</em> and <em>expressive design.</em></h2>
        </div>
        <div className="stats" data-reveal>
          <div><strong>3+</strong><span>Years shipping</span></div>
          <div><strong>20+</strong><span>Production features</span></div>
          <div><strong>08</strong><span>Selected builds</span></div>
          <div><strong>∞</strong><span>Curiosity level</span></div>
        </div>
      </section>

      <section className="work section-shell" id="work">
        <div className="section-index" data-reveal><span>02</span><span>SELECTED BUILDS</span></div>
        <div className="section-heading" data-reveal>
          <h2>Proof, not promises.</h2>
          <p>A selected mix of fullstack, Web3, AI and realtime products.</p>
        </div>
        <div className="project-list">
          {projects.map((project) => (
            <a className={`project-row ${project.tone}`} href={project.href} target="_blank" rel="noreferrer" key={project.name} data-reveal>
              <span className="project-index">{project.index}</span>
              <div className="project-title"><small>{project.type}</small><h3>{project.name}</h3></div>
              <p>{project.summary}</p>
              <div className="project-stack">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
              <span className="project-arrow"><ArrowUpRight /></span>
            </a>
          ))}
        </div>
        <a className="text-link" href="https://github.com/TuanChao?tab=repositories" target="_blank" rel="noreferrer" data-reveal>View all repositories <ArrowUpRight /></a>
      </section>

      <section className="capabilities section-shell" id="services">
        <div className="section-index" data-reveal><span>03</span><span>CAPABILITIES</span></div>
        <div className="capability-grid">
          {capabilities.map(({ icon: Icon, code, title, body }) => (
            <article className="capability-card" key={title} data-reveal>
              <div className="cap-icon"><Icon /></div>
              <span>{code}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
        <div className="principles" data-reveal>
          <span><Zap /> FAST BY DEFAULT</span>
          <span><ShieldCheck /> BUILT TO LAST</span>
          <span><Sparkles /> MOTION WITH PURPOSE</span>
        </div>
      </section>

      <section className="contact section-shell" id="contact">
        <div className="contact-eye" aria-hidden="true">
          <EvilEye eyeColor="#ff3dac" intensity={1.2} pupilSize={0.58} irisWidth={0.2} glowIntensity={0.42} scale={0.84} noiseScale={1.2} pupilFollow={0.7} flameSpeed={0.6} backgroundColor="#050208" />
        </div>
        <div className="contact-content" data-reveal>
          <span className="contact-kicker"><i /> OPEN FOR THE RIGHT PROJECT</span>
          <h2>Have a complex idea?<br /><em>Let’s make it feel simple.</em></h2>
          <a className="contact-mail" href="mailto:mrchaos235@gmail.com">mrchaos235@gmail.com <ArrowUpRight /></a>
        </div>
      </section>

      <footer className="section-shell">
        <a className="brand" href="#top"><span className="brand-mark">C</span><span>CHAOS//DEV</span></a>
        <p>Designing signal in the noise.</p>
        <div><a href="https://github.com/TuanChao" target="_blank" rel="noreferrer">GitHub</a><a href="https://x.com/Dev_Chao" target="_blank" rel="noreferrer">X / Twitter</a><a href="mailto:mrchaos235@gmail.com"><Mail /> Email</a></div>
        <span>© {new Date().getFullYear()} CHAOSDEV</span>
      </footer>
    </main>
  );
}
