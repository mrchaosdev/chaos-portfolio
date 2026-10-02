"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BrandOrbs } from "@designcodeio/threeui/components/BrandOrbs";
import { RibbonFieldBackground } from "@designcodeio/threeui/components/RibbonFieldBackground";
import EvilEye from "@/components/EvilEye";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowUpRight,
  Check,
  Code2,
  Copy,
  Globe2,
  Layers3,
  Menu,
  Moon,
  Pause,
  Play,
  Sun,
  X,
} from "lucide-react";
import { contactLinks } from "@/components/data";
import SelectedWork from "@/components/SelectedWork";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const expertise = [
  {
    icon: Code2,
    title: "Interfaces that feel right.",
    label: "01 / FRONTEND",
    copy: "Responsive web applications with clear interactions, thoughtful motion and attention to the details.",
    stack: ["React", "Next.js", "TypeScript"],
  },
  {
    icon: Layers3,
    title: "Evidence before answers.",
    label: "02 / DATA & AI",
    copy: "Typed data flows, calculated indicators and AI explanations that stay connected to their source. Built into products you can inspect.",
    stack: ["Next.js", "AI SDK", "PostgreSQL"],
  },
  {
    icon: Globe2,
    title: "On-chain. Human-first.",
    label: "03 / WEB3",
    copy: "Wallet connections, payment requests and onchain research, with clear transaction states and evidence the user can follow.",
    stack: ["wagmi", "RainbowKit", "Nansen"],
  },
];

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

function Portrait() {
  return (
    <div className="identity-world">
      <div className="identity-watermark" aria-hidden="true">
        C.
      </div>
      <div className="portrait-halo" aria-hidden="true">
        <span className="halo-satellite" />
      </div>
      <div className="portrait-cutout">
        <Image src="/chaos-avatar-cutout.png" alt="Chaos — purple cyberpunk portrait with cyan-lit dreadlocks and an ivory coat" fill priority sizes="(max-width: 760px) 100vw, 55vw" />
      </div>
      <span className="portrait-spark spark-one" aria-hidden="true">✳</span>
      <span className="portrait-spark spark-two" aria-hidden="true">+</span>
      <div className="identity-label label-top">
        <i />
        <span>
          THE PERSON BEHIND THE PIXELS<strong>CHAOS / DEVELOPER & MAKER</strong>
        </span>
      </div>
      <div className="identity-label label-bottom">
        <span>
          A LITTLE CHAOS.<strong>A LOT OF INTENTION.</strong>
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

  return (
    <div className="studio" ref={root}>
      <div className="page-eye-bg" aria-hidden="true">
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
          backgroundColor={dark ? "#05020b" : "#f4f2fb"}
          light={!dark}
          followMode="viewport"
          paused={paused}
        />
      </div>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <header className="studio-nav wrap">
        <a className="studio-brand" href="#top" aria-label="Chaosdev home">
          <span className="brand-flower">◉</span> CHAOS
          <span className="brand-dev">{"//DEV"}</span>
        </a>
        <nav
          id="primary-navigation"
          className={menu ? "studio-links is-open" : "studio-links"}
          aria-label="Main navigation"
        >
          <a href="#work" onClick={() => setMenu(false)}>
            Work <span>01</span>
          </a>
          <a href="#about" onClick={() => setMenu(false)}>
            About <span>02</span>
          </a>
          <a href="#contact" onClick={() => setMenu(false)}>
            Contact <ArrowUpRight size={14} />
          </a>
        </nav>
        <div className="nav-tools">
          <span className="nav-location">WEB3 · AI · CREATIVE DEVELOPMENT</span>
          <button
            className="icon-button motion-toggle"
            onClick={() => setPaused(!paused)}
            aria-label={paused ? "Resume animations" : "Pause animations"}
          >
            {paused ? <Play size={15} /> : <Pause size={15} />}
          </button>
          <button
            className="icon-button"
            onClick={toggleTheme}
            aria-label={`Switch to ${dark ? "light" : "dark"} theme`}
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            className="icon-button mobile-menu"
            onClick={() => setMenu(!menu)}
            aria-controls="primary-navigation"
            aria-expanded={menu}
            aria-label={menu ? "Close menu" : "Open menu"}
          >
            {menu ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>
      <main id="main">
        <section className="studio-hero wrap" id="top">
          <div className="hero-text">
            <div className="eyebrow">
              <span className="signal-dot" /> CHAOS / DEVELOPER & MAKER
            </div>
            <h1>
              <span className="headline-line">
                <span>A LITTLE</span>
              </span>
              <span className="headline-line">
                <span>CHAOS.</span>
              </span>
              <span className="headline-line headline-accent">
                <span>A LOT</span>
              </span>
              <span className="headline-line">
                <span>
                  OF CRAFT<span className="headline-period">.</span>
                </span>
              </span>
            </h1>
            <p className="hero-intro">
              I’m <strong>Chaos.</strong> I turn curious ideas into things you can
              open, explore and use.
            </p>
            <p className="hero-detail">
              Onchain products. AI research tools.
              <br />
              Playful interfaces, built with React & Next.js.
            </p>
            <div className="hero-buttons">
              <a className="studio-button primary" href="#work">
                Explore my work <ArrowDownRight size={18} />
              </a>
              <a className="plain-link" href={`mailto:${contactLinks.email}`}>
                Let’s talk <ArrowUpRight size={17} />
              </a>
            </div>
            <div className="hero-footnote">
              <span className="handwritten">Always a work in progress.</span>
              <span className="note-line" />
              <span className="tiny-label">
                SCROLL TO EXPLORE <ArrowDown size={13} />
              </span>
            </div>
          </div>
          <Portrait />
        </section>
        <div className="stack-strip wrap">
          <span className="tiny-label">MY EVERYDAY TOOLKIT</span>
          <div>
            {[
              "Next.js",
              "React",
              "TypeScript",
              "Phaser",
              "PostgreSQL",
              "wagmi",
            ].map((item) => (
              <span key={item}>
                {item === "React" && (
                  <BrandOrbs
                    variant="react"
                    size="small"
                    mode={dark ? "dark" : "light"}
                    paused={paused}
                    style={{
                      width: 20,
                      height: 20,
                      border: 0,
                      borderRadius: "50%",
                      flexShrink: 0,
                    }}
                  />
                )}
                {item}
              </span>
            ))}
          </div>
          <span className="stack-flower">✳</span>
        </div>
        <SelectedWork />
        <section className="studio-about section-space" id="about">
          <div className="wrap about-grid">
            <div className="about-art">
              <FlowPattern />
              <span className="about-art-label">COMPLEXITY, MEET CLARITY.</span>
              <span className="about-art-plus">✳</span>
            </div>
            <div className="about-text">
              <span className="tiny-label">
                02 / THE PERSON BEHIND THE PIXELS
              </span>
              <h2>
                Curious enough to try.
                <br />
                <span>Patient enough to build.</span>
              </h2>
              <p>
                I’m Chaos — the developer behind ProofPulse, ChaosPay,
                Chaos Market AI, Chaos UI and Dlicom Attack.
              </p>
              <p>
                I move between onchain data, AI workflows and creative frontend
                work. Sometimes that means making a payment flow easier to follow.
                Sometimes it means building a game, just to see an idea come alive.
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
            <span>03 / WHAT I BRING</span>
            <span>FROM THE FIRST PIXEL TO THE LAST ENDPOINT</span>
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
              04 / GOOD THINGS START WITH A CONVERSATION
            </span>
            <h2>
              Have something
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
        <a className="studio-brand" href="#top">
          <span className="brand-flower">✳</span> chaos
          <span className="brand-dev">dev</span>
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
