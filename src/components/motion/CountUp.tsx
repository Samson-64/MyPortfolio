import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useReducedMotion } from 'motion/react';

interface CountUpProps {
  /** The full value, for example "4.3 / 5" or "3-Star". */
  value: string;
  className?: string;
  duration?: number;
  delay?: number;
}

const PATTERN = /^([^0-9]*)([0-9]+(?:\.[0-9]+)?)(.*)$/;

/**
 * Counts the leading number of a metric up from zero while keeping the rest
 * of the string ("/ 5", "-Star", "%") exactly as authored.
 */
export const CountUp: React.FC<CountUpProps> = ({
  value,
  className,
  duration = 1.1,
  delay = 0.25,
}) => {
  const reduce = useReducedMotion();
  const numberRef = useRef<HTMLSpanElement>(null);

  const match = PATTERN.exec(value);
  const prefix = match?.[1] ?? '';
  const rawNumber = match?.[2] ?? '';
  const suffix = match?.[3] ?? '';
  const target = Number.parseFloat(rawNumber);
  const decimals = rawNumber.includes('.') ? rawNumber.split('.')[1]?.length ?? 0 : 0;
  const hasNumber = match !== null && Number.isFinite(target);

  useLayoutEffect(() => {
    const element = numberRef.current;
    if (!element || !hasNumber) return;

    if (reduce) {
      element.textContent = target.toFixed(decimals);
      return;
    }

    const counter = { value: 0 };
    const tween = gsap.to(counter, {
      value: target,
      duration,
      delay,
      ease: 'power3.out',
      onUpdate: () => {
        element.textContent = counter.value.toFixed(decimals);
      },
      onComplete: () => {
        element.textContent = target.toFixed(decimals);
      },
    });

    return () => {
      tween.kill();
    };
  }, [target, decimals, duration, delay, reduce, hasNumber]);

  if (!hasNumber) {
    return <span className={className}>{value}</span>;
  }

  return (
    <span className={className}>
      {prefix}
      <span ref={numberRef}>{(0).toFixed(decimals)}</span>
      {suffix}
    </span>
  );
};
