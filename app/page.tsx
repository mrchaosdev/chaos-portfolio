"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RibbonFieldBackground } from "@designcodeio/threeui/components/RibbonFieldBackground";
import EvilEye from "@/components/EvilEye";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowUpRight,
  Blocks,
  Check,
  Code2,
  Copy,
  Database,
  Globe2,
  Layers3,
  Menu,
  Pause,
  Play,
  ServerCog,
  X,
} from "lucide-react";
import { contactLinks, langLoopItems, libLoopItems } from "@/components/data";
import SelectedWork from "@/components/SelectedWork";
import { StackIcon } from "@/components/ui/StackIcon";
import Web3Orbit from "@/components/Web3Orbit";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const web2Expertise = [
  {
    icon: Code2,
    title: "Interfaces people understand.",
    label: "01 / FRONTEND",
    copy: "Accessible, responsive product interfaces with predictable interactions and the details users rely on.",
    stack: ["React", "Next.js", "TypeScript"],
  },
  {
    icon: ServerCog,
    title: "Backends built for real work.",
    label: "02 / SYSTEMS",
    copy: "Typed APIs, durable data models and admin workflows that remain understandable as the product grows.",
    stack: [".NET 8", "Node.js", "PostgreSQL"],
  },
  {
    icon: Database,
    title: "From data to shipped product.",
    label: "03 / DELIVERY",
    copy: "Data, deployment and product decisions joined into one practical system—not a pile of disconnected features.",
    stack: ["PostgreSQL", "Vercel", "i18next"],
  },
];

const web3Expertise = [
  {
    icon: Globe2,
    title: "On-chain. Human-first.",
    label: "01 / WALLET UX",
    copy: "Wallet connections, signatures and transaction states translated into actions people can understand and trust.",
    stack: ["wagmi", "WalletConnect", "Ethereum"],
  },
  {
    icon: Layers3,
    title: "Evidence before narrative.",
    label: "02 / ONCHAIN DATA",
    copy: "Protocol and market signals connected to inspectable evidence, with risk and confidence kept visible.",
    stack: ["Nansen", "PostgreSQL", "AI SDK"],
  },
  {
    icon: Blocks,
    title: "Protocol complexity, product clarity.",
    label: "03 / WEB3 FRONTEND",
    copy: "Fast, expressive interfaces that preserve what is powerful about Web3 without exposing every rough edge.",
    stack: ["Next.js", "Solidity", "IPFS"],
  },
];

const web2Stack = [".NET 8", "PostgreSQL", "React", "Next.js", "TypeScript", "Node.js", "Python", "Tailwind", "i18next", "Socket.IO", "Vercel"];
const web3Stack = ["Ethereum", "Solidity", "wagmi", "WalletConnect", "IPFS", "React", "Next.js", "TypeScript", "GSAP", "WebGL", "Three.js", "AI"];
const completeStack = Array.from(new Set([...langLoopItems, ...libLoopItems, "i18next", "Socket.IO"]));

function FlowPattern({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`flow-pattern ${className}`}
      viewBox="0 0 500 500"
      fill="none"
      aria-hidden="true"
    >
      {Array.from({ length: 23 }, (_, i) => (
        <ellipse
          key={i}
          cx="250"
          cy="250"
          rx={55 + i * 7}
          ry={115 + i * 4}
          transform={`rotate(${i * 7} 250 250)`}
        />
      ))}
    </svg>
  );
}

function Portrait({ dark }: { dark: boolean }) {
  return (
    <div className="identity-world">
      <div className="identity-watermark" aria-hidden="true">
        C.
      </div>
      <div className="portrait-halo" aria-hidden="true">
        <span className="halo-satellite" />
      </div>
      <div className={`portrait-cutout ${dark ? "portrait-web3" : "portrait-web2"}`}>
        <Image src={dark ? "/chaos-avatar-depth-cutout.png" : "/chaos-avatar-cutout.png"} alt="Chaos — developer and maker" fill priority sizes="(max-width: 760px) 100vw, 55vw" />
      </div>
      <span className="portrait-spark spark-one" aria-hidden="true">✳</span>
      <span className="portrait-spark spark-two" aria-hidden="true">+</span>
      <div className="identity-label label-top">
        <i />
        <span>
          {dark ? "PROTOCOLS INTO PRODUCTS" : "SYSTEMS INTO PRODUCTS"}<strong>{dark ? "WEB3 / FRONTEND & ONCHAIN UX" : "WEB2 / FULLSTACK PRODUCT ENGINEERING"}</strong>
        </span>
      </div>
      <div className="identity-label label-bottom">
        <span>
          {dark ? "ONCHAIN SIGNAL." : "PRODUCT CLARITY."}<strong>{dark ? "WITHOUT THE NOISE." : "BACKED BY SOLID SYSTEMS."}</strong>
        </span>
        <span className="identity-cross">+</span>
      </div>
    </div>
  );
}


let fallbackDark = false;
function readTheme() {
  try {
    return localStorage.getItem("chaos-theme") === "dark";
  } catch {
    return fallbackDark;
  }
}
function subscribeTheme(notify: () => void) {
  window.addEventListener("storage", notify);
  window.addEventListener("chaos-theme-change", notify);
  return () => {
    window.removeEventListener("storage", notify);
    window.removeEventListener("chaos-theme-change", notify);
  };
}
const serverTheme = () => false;

export default function Home() {
  const dark = useSyncExternalStore(subscribeTheme, readTheme, serverTheme);
  const root = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [menu, setMenu] = useState(false);
  const [copyState, setCopyState] = useState("");
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimer.current) clearTimeout(copyTimer.current);
    };
  }, []);
  useEffect(() => {
    document.documentElement.dataset.appearance = dark ? "dark" : "light";
    document.documentElement.dataset.world = dark ? "web3" : "web2";
  }, [dark]);
  useEffect(() => {
    document.documentElement.dataset.motion = paused ? "paused" : "playing";
  }, [paused]);
  useGSAP(
    () => {
      if (paused) return;
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .from(".eyebrow", { y: 15, opacity: 0, duration: 0.6 })
          .from(
            ".headline-line > span",
            { yPercent: 115, rotate: 3, duration: 1.05, stagger: 0.13 },
            "-=.3",
          )
          .from(
            ".hero-intro, .hero-detail, .hero-buttons",
            { y: 20, opacity: 0, duration: 0.7, stagger: 0.1 },
            "-=.6",
          );
        gsap.utils
          .toArray<HTMLElement>(
            ".studio-section-heading, .project-story, .repo-index, .about-text, .expertise-item, .contact-inner",
          )
          .forEach((element) => {
            gsap.from(element, {
              y: 45,
              opacity: 0,
              duration: 0.85,
              scrollTrigger: { trigger: element, start: "top 92%", once: true },
            });
          });
        gsap.to(".identity-watermark", {
          y: -85,
          ease: "none",
          scrollTrigger: {
            trigger: ".studio-hero",
            start: "top top",
            end: "bottom top",
            scrub: 0.8,
          },
        });
      });
      return () => media.revert();
    },
    { scope: root, dependencies: [paused], revertOnUpdate: true },
  );
  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenu(false);
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, []);
  const toggleTheme = () => {
    const next = !dark;
    fallbackDark = next;
    try {
      localStorage.setItem("chaos-theme", next ? "dark" : "light");
    } catch {
      /* Keep in-memory preference. */
    }
    window.dispatchEvent(new Event("chaos-theme-change"));
  };
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contactLinks.email);
      setCopyState("Email copied");
    } catch {
      setCopyState("Copy unavailable — use the email link");
    }
    if (copyTimer.current) clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopyState(""), 3500);
  };
  const activeStack = dark ? web3Stack : web2Stack;
  const bridgeStack = completeStack.filter((item) => !activeStack.some((active) => active.toLowerCase() === item.toLowerCase()));
  const expertise = dark ? web3Expertise : web2Expertise;

  return (
    <div className={`studio ${dark ? "web3-world" : "web2-world"}`} ref={root}>
      {dark && <div className="page-eye-bg" aria-hidden="true">
        <EvilEye
          eyeColor="#8b5cff"
          intensity={1.52}
          pupilSize={0.64}
          irisWidth={0.24}
          glowIntensity={0.46}
          scale={0.92}
          noiseScale={1.25}
          pupilFollow={1.15}
          flameSpeed={0.55}
          backgroundColor="#05020b"
          light={false}
          followMode="viewport"
          paused={paused}
        />
      </div>}
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <header className="studio-nav-shell">
        <div className="studio-nav wrap">
          <a className="studio-brand" href="#top" aria-label="Chaosdev home">
            <span className="brand-mark" aria-hidden="true">
              <Image src="/chaos-mark.png" alt="" width={48} height={48} priority />
            </span>
            <span className="brand-copy">
              <b>CHAOS</b>
              <small>{dark ? "PROTOCOL STUDIO" : "PRODUCT STUDIO"}</small>
            </span>
          </a>
          <nav
            id="primary-navigation"
            className={menu ? "studio-links is-open" : "studio-links"}
            aria-label="Main navigation"
          >
            <a href="#work" onClick={() => setMenu(false)}><span>01</span>Work</a>
            <a href="#about" onClick={() => setMenu(false)}><span>02</span>About</a>
            <a href="#stack" onClick={() => setMenu(false)}><span>03</span>Stack</a>
            <a href="#contact" onClick={() => setMenu(false)}><span>04</span>Contact</a>
          </nav>
          <div className="nav-tools">
            <span className="nav-status">
              <i />
              <span><small>CURRENT MODE</small>{dark ? "WEB3 / ONCHAIN" : "WEB2 / FULLSTACK"}</span>
            </span>
            <div className="nav-controls">
              <button
                className="icon-button motion-toggle"
                onClick={() => setPaused(!paused)}
                aria-label={paused ? "Resume animations" : "Pause animations"}
              >
                {paused ? <Play size={14} /> : <Pause size={14} />}
              </button>
              <button
                className={`world-toggle ${dark ? "is-web3" : "is-web2"}`}
                onClick={toggleTheme}
                aria-label={`Switch to ${dark ? "Web2 light" : "Web3 dark"} theme`}
              >
                <span className="world-toggle-option">WEB2</span>
                <span className="world-toggle-option">WEB3</span>
                <span className="world-toggle-thumb" aria-hidden="true" />
              </button>
              <button
                className="icon-button mobile-menu"
                onClick={() => setMenu(!menu)}
                aria-controls="primary-navigation"
                aria-expanded={menu}
                aria-label={menu ? "Close menu" : "Open menu"}
              >
                {menu ? <X size={19} /> : <Menu size={19} />}
              </button>
            </div>
          </div>
        </div>
      </header>
      <main id="main">
        <section className="studio-hero wrap" id="top">
          <div className="hero-text">
            <div className="eyebrow">
              <span className="signal-dot" /> {dark ? "WEB3 / FRONTEND & ONCHAIN UX" : "WEB2 / FULLSTACK PRODUCT ENGINEER"}
            </div>
            <h1>
              <span className="headline-line">
                <span>{dark ? "WEB3." : "WEB2."}</span>
              </span>
              <span className="headline-line">
                <span>{dark ? "OWN THE" : "BUILT"}</span>
              </span>
              <span className="headline-line headline-accent">
                <span>{dark ? "CHAIN." : "CLEAR."}</span>
              </span>
              <span className="headline-line">
                <span>
                  {dark ? "LOSE THE FRICTION" : "MADE TO LAST"}<span className="headline-period">.</span>
                </span>
              </span>
            </h1>
            <p className="hero-intro">
              {dark ? <>I build <strong>human-first Web3 interfaces</strong> for wallets, onchain data and payments—without hiding what matters.</> : <>I build <strong>clear, dependable Web2 products</strong> from interface to API and database.</>}
            </p>
            <p className="hero-detail">
              {dark ? "Wallet flows. Protocol dashboards. Onchain research." : "React & Next.js frontends. .NET APIs. PostgreSQL systems."}
              <br />
              {dark ? "Made legible, responsive and ready to use." : "Built around real users and maintainable delivery."}
            </p>
            <div className="hero-buttons">
              <a className="studio-button primary" href="#work">
                {dark ? "Explore Web3 work" : "Explore product work"} <ArrowDownRight size={18} />
              </a>
              <a className="plain-link" href={`mailto:${contactLinks.email}`}>
                Let’s talk <ArrowUpRight size={17} />
              </a>
            </div>
            <div className="hero-footnote">
              <span className="handwritten">{dark ? "Protocol-native. Product-minded." : "Simple outside. Solid underneath."}</span>
              <span className="note-line" />
              <span className="tiny-label">
                SCROLL TO EXPLORE <ArrowDown size={13} />
              </span>
            </div>
          </div>
          <Portrait dark={dark} />
        </section>
        <section className="stack-system wrap" id="stack">
          <div className="stack-system-heading">
            <span className="tiny-label">{dark ? "WEB3 / ACTIVE STACK" : "WEB2 / ACTIVE STACK"}</span>
            <h2>{dark ? "Protocol tools up front." : "Product systems up front."}</h2>
            <p>{dark ? "The chain-facing stack I use to turn protocols into usable products." : "The fullstack foundation I use for interfaces, APIs, data and delivery."}</p>
          </div>
          <div className="stack-primary">
            {activeStack.map((item, index) => (
              <span className="stack-chip" key={item}>
                <i>{String(index + 1).padStart(2, "0")}</i>
                <StackIcon name={item} />
                <b>{item}</b>
              </span>
            ))}
          </div>
          <div className="stack-bridge">
            <span>ALSO IN THE TOOLBOX</span>
            <div>{bridgeStack.map((item) => <span key={item}><StackIcon name={item} />{item}</span>)}</div>
          </div>
        </section>
        <SelectedWork dark={dark} />
        <section className="studio-about section-space" id="about">
          <div className="wrap about-grid">
            <div className={`about-art ${dark ? "web3-about-art" : "web2-about-art"}`}>
              {dark ? <Web3Orbit paused={paused} /> : <FlowPattern />}
              <span className="about-art-label">{dark ? "PROTOCOL, MEET PRODUCT." : "COMPLEXITY, MEET CLARITY."}</span>
              {!dark && <span className="about-art-plus">✳</span>}
            </div>
            <div className="about-text">
              <span className="tiny-label">
                02 / {dark ? "THE BUILDER BEHIND THE PROTOCOL UI" : "THE ENGINEER BEHIND THE PRODUCT"}
              </span>
              <h2>
                {dark ? "Onchain can feel new." : "Good products feel simple."}
                <br />
                <span>{dark ? "It shouldn’t feel confusing." : "Strong systems make that possible."}</span>
              </h2>
              <p>
                {dark ? "I’m Chaos — a Web3 frontend developer working across wallet UX, onchain research and crypto-native payments." : "I’m Chaos — a fullstack product engineer working from polished React interfaces through .NET APIs and PostgreSQL data."}
              </p>
              <p>
                {dark ? "I translate signatures, chain state and protocol data into clear states and confident actions, while keeping the evidence visible." : "I care about the unglamorous parts too: maintainable architecture, admin flows, localization, deployment and the reliability a real product needs."}
              </p>
              <a
                className="plain-link"
                href={contactLinks.github}
                target="_blank"
                rel="noreferrer"
              >
                See what I’m building <ArrowUpRight size={17} />
              </a>
              <div className="about-signoff">
                <span className="handwritten">
                  Always curious, always building.
                </span>
                <span>— Chaos</span>
              </div>
            </div>
          </div>
        </section>
        <section className="studio-expertise wrap section-space" id="expertise">
          <div className="section-eyebrow">
            <span>03 / {dark ? "WEB3 CAPABILITIES" : "WEB2 CAPABILITIES"}</span>
            <span>{dark ? "FROM WALLET CONNECTION TO VERIFIED STATE" : "FROM THE FIRST PIXEL TO THE LAST ENDPOINT"}</span>
          </div>
          <div className="expertise-grid">
            {expertise.map(({ icon: Icon, title, label, copy, stack }) => (
              <article className="expertise-item" key={label}>
                <div className="expertise-icon">
                  <Icon size={25} strokeWidth={1.4} />
                </div>
                <span className="tiny-label">{label}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
                <div className="expertise-stack">{stack.join(" / ")}</div>
              </article>
            ))}
          </div>
        </section>
        <section className="studio-contact wrap" id="contact">
          <div className="contact-inner">
            <div className="threeui-ribbon" aria-hidden="true">
              <RibbonFieldBackground
                speed={paused ? 0 : 0.4}
                hue={45}
                saturation={0.7}
                pointerAmount={paused ? 0 : 0.7}
              />
            </div>
            <FlowPattern className="contact-pattern" />
            <span className="tiny-label">
              04 / {dark ? "BUILD THE NEXT ONCHAIN EXPERIENCE" : "BUILD THE NEXT USEFUL PRODUCT"}
            </span>
            <h2>
              {dark ? "Have a protocol" : "Have a product"}
              <br />
              in mind? <span>Let’s build it.</span>
            </h2>
            <div className="contact-actions">
              <a
                href={`mailto:${contactLinks.email}`}
                className="studio-button primary"
              >
                Say hello <ArrowUpRight size={19} />
              </a>
              <a
                className="contact-email"
                href={`mailto:${contactLinks.email}`}
              >
                {contactLinks.email}
              </a>
              <button
                className="icon-button copy-button"
                onClick={copyEmail}
                aria-label="Copy email address"
              >
                {copyState === "Email copied" ? (
                  <Check size={18} />
                ) : (
                  <Copy size={18} />
                )}
              </button>
            </div>
            <p className="copy-status" role="status">
              {copyState}
            </p>
          </div>
        </section>
      </main>
      <footer className="studio-footer wrap">
        <a className="studio-brand footer-brand" href="#top" aria-label="Chaosdev home">
          <span className="brand-mark" aria-hidden="true"><Image src="/chaos-mark.png" alt="" width={40} height={40} /></span>
          <span className="brand-copy"><b>CHAOS</b><small>DEVELOPER / MAKER</small></span>
        </a>
        <span>© {new Date().getFullYear()} Chaosdev. Made with intention.</span>
        <div>
          <a href={contactLinks.github} target="_blank" rel="noreferrer">
            GitHub <ArrowUpRight size={13} />
          </a>
          <a href={contactLinks.x} target="_blank" rel="noreferrer">
            X / Twitter <ArrowUpRight size={13} />
          </a>
          <a href="/credits">Credits</a>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
    </div>
  );
}
