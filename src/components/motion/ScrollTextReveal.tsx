import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useReducedMotion } from 'motion/react';
import { GSAP_EASE_FLUID } from '../../lib/motion';

gsap.registerPlugin(ScrollTrigger, SplitText);

interface ScrollTextRevealProps {
  children: React.ReactNode;
  className?: string;
  /** Color the words sit at before the scroll reveals them. */
  inactiveColor?: string;
  /** Color the words land on once revealed. */
  activeColor?: string;
}

/**
 * Text that is revealed as you scroll.
 *
 * The paragraph is split into words, and a scrubbed timeline lifts each word
 * into place and brightens it. The reveal is tied to the scroll position
 * rather than a timer, so scrubbing back up hides the words again.
 *
 * The DOM still contains the original sentence, so screen readers and search
 * engines get the full text regardless of the animation.
 */
export const ScrollTextReveal: React.FC<ScrollTextRevealProps> = ({
  children,
  className,
  inactiveColor = '#5F5B55',
  activeColor = '#E8E2D8',
}) => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    if (reduce) return;
    const element = ref.current;
    if (!element) return;

    let split: SplitText | undefined;

    const ctx = gsap.context(() => {
      split = SplitText.create(element, {
        type: 'words',
        mask: 'words',
        autoSplit: true,
        wordsClass: 'reveal-word',
        onSplit: (instance) => {
          gsap.set(instance.words, { color: inactiveColor, opacity: 0.3, yPercent: 18 });

          const tween = gsap.to(instance.words, {
            color: activeColor,
            opacity: 1,
            yPercent: 0,
            duration: 0.8,
            ease: GSAP_EASE_FLUID,
            stagger: { each: 0.03 },
            scrollTrigger: {
              trigger: element,
              start: 'top 85%',
              end: 'bottom 35%',
              scrub: 0.9,
            },
          });

          ScrollTrigger.refresh();
          return tween;
        },
      });
    }, element);

    return () => {
      split?.revert();
      ctx.revert();
    };
  }, [reduce, inactiveColor, activeColor]);

  return (
    <p ref={ref} className={className}>
      {children}
    </p>
  );
};
