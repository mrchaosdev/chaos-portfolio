'use client';

import EvilEye from "./EvilEye";
import { bootLines } from "./data";

export default function IntroOverlay({ visible }: { visible: boolean }) {
  if (!visible) return null;
  return (
    <div className="intro-overlay" aria-hidden="true">
      <div className="intro-eye">
        <EvilEye
          eyeColor="#ff3dac" intensity={1.72} pupilSize={0.7} irisWidth={0.22}
          glowIntensity={0.62} scale={0.78} noiseScale={1.1} pupilFollow={1.25}
          flameSpeed={0.82} backgroundColor="#030107" followMode="viewport"
        />
      </div>
      <div className="intro-copy">
        <span>CHAOS//PROTOCOL</span>
        <strong>INITIALIZING SIGNAL</strong>
        <ul>
          {bootLines.map((line) => <li key={line}>{line}</li>)}
        </ul>
      </div>
    </div>
  );
}
