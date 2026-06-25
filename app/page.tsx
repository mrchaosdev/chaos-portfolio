'use client';
import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ThemeProvider } from "@/components/ThemeProvider";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import IntroOverlay from "@/components/IntroOverlay";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Work from "@/components/sections/Work";
import Capabilities from "@/components/sections/Capabilities";
import Contact from "@/components/sections/Contact";
import EvilEye from "@/components/EvilEye";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Home() {
  const root = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [introVisible, setIntroVisible] = useState(true);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(() => setIntroVisible(false), reduceMotion ? 700 : 3200);
    return () => window.clearTimeout(timer);
  }, []);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) return;

      gsap.timeline({ defaults: { ease: "power3.out" }, delay: 2.15 })
        .from(".nav-shell", { y: -30, opacity: 0, duration: 0.8 })
        .from(".hero-kicker", { y: 20, opacity: 0, duration: 0.6 }, "-=0.35")
        .from(".hero-word", { yPercent: 115, rotate: 2, duration: 1, stagger: 0.1 }, "-=0.3")
        .from(".hero-copy, .hero-actions, .experience-chip", { y: 24, opacity: 0, duration: 0.7, stagger: 0.1 }, "-=0.6")
        .from(".portrait-card-shell, .hero-console-strip", { scale: 0.9, opacity: 0, duration: 1.05, stagger: 0.12 }, "-=0.9");

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.from(element, {
          y: 54, opacity: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 87%", once: true },
        });
      });

      gsap.to(".portrait-card-shell", {
        yPercent: 7, ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1 },
      });
    },
    { scope: root },
  );

  return (
    <ThemeProvider>
      <div ref={root}>
        <div className="page-eye-bg" aria-hidden="true">
          <EvilEye eyeColor="#8b5cff" intensity={1.52} pupilSize={0.64} irisWidth={0.24} glowIntensity={0.46} scale={0.92} noiseScale={1.25} pupilFollow={1.15} flameSpeed={0.55} backgroundColor="#05020b" followMode="viewport" />
        </div>
        <IntroOverlay visible={introVisible} />
        <div className="noise" aria-hidden="true" />
        <Nav menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <main>
          <Hero />
          <About />
          <Work />
          <Capabilities />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
