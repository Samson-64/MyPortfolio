import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { subscribeScrollProgress } from '../../lib/scrollProgress';

/**
 * A hairline progress indicator pinned to the top of the viewport. It reads
 * the native scroll position, so it keeps working when Lenis is disabled for
 * reduced-motion visitors.
 */
export const ScrollProgress: React.FC = () => {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const setScale = gsap.quickSetter(bar, 'scaleX');
    return subscribeScrollProgress((progress) => setScale(progress));
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[45] h-px bg-white/[0.06]"
    >
      <div
        ref={barRef}
        className="h-full w-full origin-left scale-x-0 bg-[#E8DEC8]"
      />
    </div>
  );
};
