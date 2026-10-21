import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { clamp, usePointerMotion } from '../../lib/motion';

interface MagneticProps {
  children: React.ReactNode;
  /** Fraction of the pointer offset the element travels towards it. */
  strength?: number;
  /** Hard cap on the travel, in pixels. */
  maxDistance?: number;
  className?: string;
}

/**
 * A button or panel that is drawn towards the pointer while it is hovered and
 * springs back when the pointer leaves. Driven by motion values so the
 * movement never re-renders React.
 */
export const Magnetic: React.FC<MagneticProps> = ({
  children,
  strength = 0.28,
  maxDistance = 10,
  className,
}) => {
  const enabled = usePointerMotion();
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 24, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 260, damping: 24, mass: 0.5 });

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!enabled) return;
    const element = ref.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const offsetX = event.clientX - (rect.left + rect.width / 2);
    const offsetY = event.clientY - (rect.top + rect.height / 2);

    x.set(clamp(offsetX * strength, -maxDistance, maxDistance));
    y.set(clamp(offsetY * strength, -maxDistance, maxDistance));
  };

  const handlePointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
