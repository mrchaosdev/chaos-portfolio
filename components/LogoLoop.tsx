'use client';

import { memo, useCallback, useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";

export type LogoLoopItem = {
  node: ReactNode;
  title: string;
  href?: string;
  ariaLabel?: string;
};

type LogoLoopProps = {
  logos: LogoLoopItem[];
  speed?: number;
  direction?: "left" | "right";
  logoHeight?: number;
  gap?: number;
  fadeOut?: boolean;
  fadeOutColor?: string;
  scaleOnHover?: boolean;
  pauseOnHover?: boolean;
  ariaLabel?: string;
  className?: string;
  style?: CSSProperties;
};

const MIN_COPIES = 2;
const COPY_HEADROOM = 2;
const SMOOTH_TAU = 0.25;

const LogoLoop = memo(function LogoLoop({
  logos,
  speed = 100,
  direction = "left",
  logoHeight = 60,
  gap = 60,
  fadeOut = true,
  fadeOutColor = "#050208",
  scaleOnHover = true,
  pauseOnHover = false,
  ariaLabel = "Technology logos",
  className,
  style,
}: LogoLoopProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const seqRef = useRef<HTMLUListElement>(null);
  const rafRef = useRef<number | null>(null);
  const lastTimestampRef = useRef<number | null>(null);
  const offsetRef = useRef(0);
  const velocityRef = useRef(0);

  const [seqWidth, setSeqWidth] = useState(0);
  const [copyCount, setCopyCount] = useState(MIN_COPIES);
  const [isHovered, setIsHovered] = useState(false);

  const updateDimensions = useCallback(() => {
    const containerWidth = containerRef.current?.clientWidth ?? 0;
    const sequenceWidth = seqRef.current?.getBoundingClientRect().width ?? 0;

    if (sequenceWidth <= 0) return;

    setSeqWidth(Math.ceil(sequenceWidth));
    setCopyCount(Math.max(MIN_COPIES, Math.ceil(containerWidth / sequenceWidth) + COPY_HEADROOM));
  }, []);

  useEffect(() => {
    updateDimensions();

    if (!window.ResizeObserver) {
      window.addEventListener("resize", updateDimensions);
      return () => window.removeEventListener("resize", updateDimensions);
    }

    const observers = [containerRef.current, seqRef.current]
      .filter(Boolean)
      .map((element) => {
        const observer = new ResizeObserver(updateDimensions);
        observer.observe(element as Element);
        return observer;
      });

    return () => observers.forEach((observer) => observer.disconnect());
  }, [updateDimensions, logos, gap, logoHeight]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || seqWidth <= 0) return;

    offsetRef.current = ((offsetRef.current % seqWidth) + seqWidth) % seqWidth;

    const animate = (timestamp: number) => {
      if (lastTimestampRef.current === null) lastTimestampRef.current = timestamp;

      const deltaTime = Math.max(0, timestamp - lastTimestampRef.current) / 1000;
      lastTimestampRef.current = timestamp;

      const directionMultiplier = direction === "left" ? 1 : -1;
      const targetVelocity = isHovered && pauseOnHover ? 0 : Math.abs(speed) * directionMultiplier * (speed < 0 ? -1 : 1);
      const easingFactor = 1 - Math.exp(-deltaTime / SMOOTH_TAU);

      velocityRef.current += (targetVelocity - velocityRef.current) * easingFactor;
      offsetRef.current = ((offsetRef.current + velocityRef.current * deltaTime) % seqWidth + seqWidth) % seqWidth;

      track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTimestampRef.current = null;
    };
  }, [direction, isHovered, pauseOnHover, seqWidth, speed]);

  const logoLists = useMemo(
    () =>
      Array.from({ length: copyCount }, (_, copyIndex) => (
        <ul className="logo-loop__list" key={copyIndex} ref={copyIndex === 0 ? seqRef : undefined} aria-hidden={copyIndex > 0}>
          {logos.map((item, index) => {
            const content = (
              <span className={scaleOnHover ? "logo-loop__logo scale" : "logo-loop__logo"} title={item.title}>
                {item.node}
                <b className="logo-loop__name">{item.title}</b>
              </span>
            );

            return (
              <li className="logo-loop__item" key={`${copyIndex}-${item.title}-${index}`}>
                {item.href ? (
                  <a href={item.href} aria-label={item.ariaLabel ?? item.title} target="_blank" rel="noreferrer">
                    {content}
                  </a>
                ) : content}
              </li>
            );
          })}
        </ul>
      )),
    [copyCount, logos, scaleOnHover],
  );

  return (
    <div
      ref={containerRef}
      className={className ? `logo-loop ${fadeOut ? "fade" : ""} ${className}` : `logo-loop ${fadeOut ? "fade" : ""}`}
      style={{
        "--logo-loop-height": `${logoHeight}px`,
        "--logo-loop-gap": `${gap}px`,
        "--logo-loop-fade-color": fadeOutColor,
        ...style,
      } as CSSProperties}
      role="region"
      aria-label={ariaLabel}
    >
      <div
        className="logo-loop__track"
        ref={trackRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {logoLists}
      </div>
    </div>
  );
});

export default LogoLoop;
