'use client';

import { StackIcon } from "../ui/StackIcon";
import { themeWorlds, bridgeStack } from "../data";

export default function About() {
  return (
    <section className="manifesto section-shell" id="about">
      <div className="section-index" data-reveal><span>01</span><span>ABOUT THE BUILDER</span></div>
      <div className="manifesto-grid">
        <p className="manifesto-side" data-reveal>Web3 has new logic. Users still need Web2 clarity.</p>
        <h2 data-reveal>I translate <em>on-chain complexity</em> into <em>products people can actually use.</em></h2>
      </div>
      <div className="theme-bridge" data-reveal aria-label="Chaosdev Web3 dark theme to Web2 light theme bridge">
        <article className={`theme-world ${themeWorlds[0].mode}`}>
          <span className="theme-eyebrow">{themeWorlds[0].eyebrow}</span>
          <h3>{themeWorlds[0].title}</h3>
          <p>{themeWorlds[0].body}</p>
          <div className="theme-stack">
            {themeWorlds[0].stack.map((item) => <span key={item}><StackIcon name={item} />{item}</span>)}
          </div>
        </article>
        <div className="theme-converter" aria-hidden="true">
          <span className="converter-chip">CHAOS BRIDGE</span>
          <div className="converter-orb"><StackIcon name="React" /></div>
          <strong>translate</strong>
          <p>chain state → product language</p>
          <div className="converter-stack">
            {bridgeStack.map((item) => <span key={item}><StackIcon name={item} /></span>)}
          </div>
        </div>
        <article className={`theme-world ${themeWorlds[1].mode}`}>
          <span className="theme-eyebrow">{themeWorlds[1].eyebrow}</span>
          <h3>{themeWorlds[1].title}</h3>
          <p>{themeWorlds[1].body}</p>
          <div className="theme-stack">
            {themeWorlds[1].stack.map((item) => <span key={item}><StackIcon name={item} />{item}</span>)}
          </div>
        </article>
      </div>
      <div className="stats" data-reveal>
        <div><strong>3+</strong><span>Years shipping</span></div>
        <div><strong>Web2</strong><span>Fullstack foundation</span></div>
        <div><strong>Web3</strong><span>Frontend focus</span></div>
        <div><strong>∞</strong><span>Bridge mindset</span></div>
      </div>
    </section>
  );
}
