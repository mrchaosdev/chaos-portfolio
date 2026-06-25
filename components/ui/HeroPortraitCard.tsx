'use client';

import Image from "next/image";
import { useRef, type PointerEvent } from "react";
import { contactLinks } from "../data";

export default function HeroPortraitCard() {
  const cardRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    card.style.setProperty("--pointer-x", `${x * 100}%`);
    card.style.setProperty("--pointer-y", `${y * 100}%`);
    card.style.setProperty("--rotate-x", `${(0.5 - y) * 14}deg`);
    card.style.setProperty("--rotate-y", `${(x - 0.5) * 16}deg`);
    card.style.setProperty("--card-active", "1");
  };

  const handlePointerLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty("--pointer-x", "50%");
    card.style.setProperty("--pointer-y", "50%");
    card.style.setProperty("--rotate-x", "0deg");
    card.style.setProperty("--rotate-y", "0deg");
    card.style.setProperty("--card-active", "0");
  };

  return (
    <div className="portrait-card-shell" ref={cardRef} onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave}>
      <div className="portrait-card-glow" />
      <div className="portrait-card">
        <div className="portrait-holo" />
        <div className="portrait-glare" />
        <Image className="portrait-image" src="/chaos-avatar.jpg" alt="Neon cyberpunk portrait of Chaosdev" fill priority sizes="(max-width: 900px) 84vw, 430px" />
        <div className="portrait-topline">
          <span>CHAOSDEV</span>
          <span>WEB2 / WEB3</span>
        </div>
        <div className="portrait-user-panel">
          <div className="portrait-mini">
            <Image src="/chaos-avatar.jpg" alt="" fill sizes="42px" />
          </div>
          <div>
            <strong>Chaosdev</strong>
            <span><i /> Available</span>
          </div>
          <a href={`mailto:${contactLinks.email}`}>Contact</a>
        </div>
      </div>
    </div>
  );
}
