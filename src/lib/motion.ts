import { useEffect, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import { gsap } from 'gsap';
import { CustomEase } from 'gsap/CustomEase';

/**
 * Shared motion tokens.
 *
 * The house easing curve used to be inlined as a literal in eight components.
 * It is defined once here so every transition on the site shares the same
 * rhythm, and so pointer-driven effects can be switched off in one place.
 */
export const EASE_FLUID: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];
export const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const SPRING_SOFT = { type: 'spring', stiffness: 260, damping: 26, mass: 0.6 } as const;
export const SPRING_SNAPPY = { type: 'spring', stiffness: 420, damping: 32, mass: 0.5 } as const;

/** GSAP mirror of `EASE_FLUID`, used by the DOM-level GSAP work. */
export const GSAP_EASE_FLUID = 'fluid';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(CustomEase);
  CustomEase.create(GSAP_EASE_FLUID, 'M0,0 C0.21,0.47 0.32,0.98 1,1');
}

export const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

/**
 * True only for devices that actually have a hovering, precise pointer.
 * Magnetic pulls, tilt and the accent cursor are pointless on touch.
 */
export function useFinePointer(): boolean {
  const [isFine, setIsFine] = useState<boolean>(() =>
    typeof window === 'undefined'
      ? false
      : window.matchMedia('(hover: hover) and (pointer: fine)').matches
  );

  useEffect(() => {
    const query = window.matchMedia('(hover: hover) and (pointer: fine)');
    const onChange = () => setIsFine(query.matches);
    onChange();
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  return isFine;
}

/**
 * Single gate for every pointer-reactive effect: on only when the visitor has
 * not asked for reduced motion and is using a real pointer.
 */
export function usePointerMotion(): boolean {
  const reduce = useReducedMotion();
  const isFine = useFinePointer();
  return !reduce && isFine;
}
