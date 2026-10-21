import { useCallback, useRef } from 'react';

/**
 * Cursor-tracked spotlight.
 *
 * The pointer position is written straight to CSS custom properties on the
 * host element, so nothing here triggers a React render. The glow and the
 * border highlight are painted layers driven by those variables.
 */
export function useSpotlight() {
  const ref = useRef<HTMLDivElement>(null);

  const onPointerMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const element = ref.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    element.style.setProperty('--spotlight-x', `${event.clientX - rect.left}px`);
    element.style.setProperty('--spotlight-y', `${event.clientY - rect.top}px`);
  }, []);

  return { ref, onPointerMove, hostClassName: 'spotlight-host' };
}

/**
 * The painted layers for a spotlight host. Render as direct children of the
 * element returned by `useSpotlight`.
 */
export const SpotlightLayers: React.FC = () => (
  <>
    <span aria-hidden="true" className="spotlight-glow" />
    <span aria-hidden="true" className="spotlight-border" />
  </>
);
