import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useReducedMotion } from 'motion/react';
import { useFinePointer } from '../../lib/motion';

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, textarea, select, [data-cursor="interactive"]';
const TEXT_ENTRY_SELECTOR = 'input, textarea';

/**
 * A restrained accent cursor: the native pointer stays visible and this ring
 * trails behind it, expanding over interactive elements. Desktop only, and
 * switched off entirely for visitors who prefer reduced motion.
 */
export const Cursor: React.FC = () => {
  const reduce = useReducedMotion();
  const isFine = useFinePointer();
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const enabled = Boolean(!reduce && isFine);

  useEffect(() => {
    if (!enabled) return;

    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    gsap.set(ring, { xPercent: -50, yPercent: -50 });
    gsap.set(dot, { xPercent: -50, yPercent: -50 });

    const ringX = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3' });
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3' });
    const dotX = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power2.out' });
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power2.out' });

    let visible = false;

    const show = () => {
      if (visible) return;
      visible = true;
      gsap.to([ring, dot], { opacity: 1, duration: 0.25, ease: 'power2.out' });
    };

    const hide = () => {
      if (!visible) return;
      visible = false;
      gsap.to([ring, dot], { opacity: 0, duration: 0.2, ease: 'power2.in' });
    };

    const onPointerMove = (event: PointerEvent) => {
      ringX(event.clientX);
      ringY(event.clientY);
      dotX(event.clientX);
      dotY(event.clientY);
      show();
    };

    const onOver = (event: MouseEvent) => {
      const target = event.target as Element | null;
      if (!target || typeof target.closest !== 'function') return;

      if (target.closest(TEXT_ENTRY_SELECTOR)) {
        gsap.to(ring, {
          scale: 0.55,
          borderColor: 'rgba(232, 222, 200, 0.85)',
          duration: 0.3,
          ease: 'power3.out',
        });
        gsap.to(dot, { scale: 0, duration: 0.2, ease: 'power2.out' });
        return;
      }

      if (target.closest(INTERACTIVE_SELECTOR)) {
        gsap.to(ring, {
          scale: 1.6,
          borderColor: 'rgba(232, 222, 200, 0.95)',
          duration: 0.3,
          ease: 'power3.out',
        });
      } else {
        gsap.to(ring, {
          scale: 1,
          borderColor: 'rgba(232, 222, 200, 0.55)',
          duration: 0.3,
          ease: 'power3.out',
        });
      }

      gsap.to(dot, { scale: 1, duration: 0.2, ease: 'power2.out' });
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('mouseover', onOver, { passive: true });
    document.addEventListener('mouseleave', hide);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseleave', hide);
      gsap.killTweensOf([ring, dot]);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[70] h-7 w-7 rounded-full border opacity-0"
        style={{ borderColor: 'rgba(232, 222, 200, 0.55)' }}
      />
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[70] h-1 w-1 rounded-full bg-[#E8DEC8] opacity-0"
      />
    </>
  );
};
