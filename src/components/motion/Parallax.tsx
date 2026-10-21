import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { usePointerMotion } from '../../lib/motion';

interface ParallaxProps {
  children: React.ReactNode;
  className?: string;
  /** Maximum tilt in degrees. */
  maxRotation?: number;
  /** Maximum drift in pixels. */
  maxOffset?: number;
}

/**
 * Drifts and tilts towards the pointer. The movement is spring damped, so it
 * keeps easing into place after the pointer stops instead of stopping dead.
 */
export const Parallax: React.FC<ParallaxProps> = ({
  children,
  className,
  maxRotation = 5,
  maxOffset = 8,
}) => {
  const enabled = usePointerMotion();

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 140, damping: 20, mass: 0.6 };
  const smoothRotateX = useSpring(rotateX, springConfig);
  const smoothRotateY = useSpring(rotateY, springConfig);
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  useEffect(() => {
    if (!enabled) return;

    const onPointerMove = (event: PointerEvent) => {
      const nx = (event.clientX / window.innerWidth) * 2 - 1;
      const ny = (event.clientY / window.innerHeight) * 2 - 1;

      rotateY.set(nx * maxRotation);
      rotateX.set(-ny * maxRotation);
      x.set(nx * maxOffset);
      y.set(ny * maxOffset);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', onPointerMove);
  }, [enabled, maxRotation, maxOffset, rotateX, rotateY, x, y]);

  return (
    <div className={className} style={{ perspective: 1000 }}>
      <motion.div
        style={{
          rotateX: smoothRotateX,
          rotateY: smoothRotateY,
          x: smoothX,
          y: smoothY,
          transformStyle: 'preserve-3d',
        }}
        className="h-full w-full"
      >
        {children}
      </motion.div>
    </div>
  );
};
