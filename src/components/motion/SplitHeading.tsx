import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useReducedMotion } from 'motion/react';
import { GSAP_EASE_FLUID } from '../../lib/motion';

gsap.registerPlugin(ScrollTrigger, SplitText);

type HeadingTag = 'h1' | 'h2' | 'h3';

interface SplitHeadingProps {
  children: React.ReactNode;
  className?: string;
  as?: HeadingTag;
  delay?: number;
  stagger?: number;
  /** 'scroll' plays when the heading enters the viewport, 'mount' plays on load. */
  mode?: 'scroll' | 'mount';
}

/**
 * A heading whose lines rise out of a clipping mask.
 *
 * The split is done by GSAP on the rendered element, so the markup stays
 * ordinary and accessible: screen readers still read a single heading. The
 * split is reverted on unmount and automatically re-applied when the webfont
 * finishes loading or the viewport is resized.
 */
export const SplitHeading: React.FC<SplitHeadingProps> = ({
  children,
  className,
  as: Tag = 'h2',
  delay = 0,
  stagger = 0.09,
  mode = 'scroll',
}) => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLHeadingElement>(null);
  const playedRef = useRef(false);

  useLayoutEffect(() => {
    if (reduce) return;
    const element = ref.current;
    if (!element) return;

    let split: SplitText | undefined;

    const ctx = gsap.context(() => {
      split = SplitText.create(element, {
        type: 'lines',
        mask: 'lines',
        autoSplit: true,
        linesClass: 'split-line',
        onSplit: (instance) => {
          // A re-split (resize / font load) must not replay the reveal.
          if (playedRef.current) {
            gsap.set(instance.lines, { yPercent: 0 });
            return;
          }

          gsap.from(instance.lines, {
            yPercent: 108,
            duration: 0.9,
            ease: GSAP_EASE_FLUID,
            stagger,
            delay,
            onComplete: () => {
              playedRef.current = true;
            },
            scrollTrigger:
              mode === 'scroll'
                ? { trigger: element, start: 'top 88%', once: true }
                : undefined,
          });

          ScrollTrigger.refresh();
        },
      });
    }, element);

    return () => {
      split?.revert();
      ctx.revert();
    };
  }, [reduce, delay, stagger, mode]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
};
