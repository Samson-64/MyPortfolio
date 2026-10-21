import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useReducedMotion } from 'motion/react';
import { getLenis } from '../../lib/lenis';

interface MarqueeProps {
  children: React.ReactNode;
  className?: string;
  /** Seconds for one full loop of the track. */
  duration?: number;
}

/**
 * A seamless horizontal loop. The track holds two identical halves, so
 * translating it by exactly half its width reads as an endless marquee.
 *
 * The loop speed follows the scroll velocity, so the band reacts to how hard
 * the page is being scrolled and settles again when it stops.
 *
 * The caller is responsible for giving each half a trailing gap that matches
 * the spacing between the items, otherwise the seam reads as a break.
 */
export const Marquee: React.FC<MarqueeProps> = ({
  children,
  className,
  duration = 30,
}) => {
  const reduce = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const hoverScaleRef = useRef(1);

  useEffect(() => {
    if (reduce) return;
    const track = trackRef.current;
    if (!track) return;

    const tween = gsap.to(track, {
      xPercent: -50,
      duration,
      ease: 'none',
      repeat: -1,
    });

    const tick = () => {
      const lenis = getLenis();
      const velocity = lenis ? Math.abs(lenis.velocity) : 0;
      const velocityScale = gsap.utils.clamp(0.6, 2.4, 1 + velocity / 240);
      tween.timeScale(hoverScaleRef.current * velocityScale);
    };

    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      tween.kill();
    };
  }, [reduce, duration]);

  if (reduce) {
    return (
      <div className={`flex flex-wrap items-center justify-center ${className ?? ''}`}>
        {children}
      </div>
    );
  }

  return (
    <div
      className={`overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] ${
        className ?? ''
      }`}
      onPointerEnter={() => {
        hoverScaleRef.current = 0.3;
      }}
      onPointerLeave={() => {
        hoverScaleRef.current = 1;
      }}
    >
      <div ref={trackRef} className="flex w-max">
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
};
