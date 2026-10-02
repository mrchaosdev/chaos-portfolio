import Link from 'next/link';

export default function Credits() {
  return <main className="wrap credits-page">
    <Link href="/">← Back to Chaosdev</Link>
    <h1>Creative credits.</h1>
    <p>This portfolio combines original interface work with the following open components and assets.</p>
    <article><h2>Portrait artwork</h2><p>The approved cyberpunk portrait was generated from the supplied avatar reference. The hero uses a transparent-background image cutout, not a 3D mesh. Original avatar and approved full-background artwork are preserved.</p></article>
    <article><h2>ThreeUI Community</h2><p><a href="https://threeui.com/">ThreeUI</a> by Meng To / DesignCode, MIT license. The portfolio imports BrandOrbs and RibbonFieldBackground from the official @designcodeio/threeui package.</p></article>
    <article><h2>The living eye</h2><p>Evil Eye from <a href="https://reactbits.dev/backgrounds/evil-eye">React Bits</a> by David Haz, under MIT + Commons Clause. Adapted for a light palette, reduced motion and a pause control.</p></article>
    <article><h2>Typography & icons</h2><p>Manrope and DM Mono use the SIL Open Font License. Icons by Lucide, ISC license. Avatar concept artwork was generated from the supplied reference image.</p></article>
  </main>;
}
