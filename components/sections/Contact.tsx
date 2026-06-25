'use client';

import { ArrowUpRight, Database, LockKeyhole, Rocket, Terminal } from "lucide-react";
import { contactLinks } from "../data";

export default function Contact() {
  return (
    <section className="contact section-shell" id="contact">
      <div className="contact-grid">
        <div className="channel-terminal" data-reveal>
          <div className="console-titlebar">
            <div><span /><span /><span /></div>
            <small>open-channel.sh</small>
          </div>
          <div className="channel-lines">
            <span><Terminal /> read the protocol intent</span>
            <span><Database /> shape the Web2 product flow</span>
            <span><LockKeyhole /> protect trust and user context</span>
            <span><Rocket /> ship the bridge layer</span>
          </div>
        </div>
        <div className="contact-content" data-reveal>
          <span className="contact-kicker"><i /> OPEN FOR THE RIGHT PROJECT</span>
          <h2>Need Web3 to feel<br /><em>Web2-simple?</em></h2>
          <a className="contact-mail magnetic" href={`mailto:${contactLinks.email}`}>{contactLinks.email} <ArrowUpRight /></a>
        </div>
      </div>
    </section>
  );
}
