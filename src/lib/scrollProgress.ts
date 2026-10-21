type ProgressListener = (progress: number) => void;

const listeners = new Set<ProgressListener>();
let subscribers = 0;
let frame = 0;
let last = -1;

function measure(): number {
  const doc = document.documentElement;
  const scrollable = doc.scrollHeight - window.innerHeight;
  if (scrollable <= 0) return 0;
  return Math.min(1, Math.max(0, window.scrollY / scrollable));
}

function flush(): void {
  frame = 0;
  const next = measure();
  if (next === last) return;
  last = next;
  listeners.forEach((listener) => listener(next));
}

function schedule(): void {
  if (frame) return;
  frame = window.requestAnimationFrame(flush);
}

function attach(): void {
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
}

function detach(): void {
  window.removeEventListener('scroll', schedule);
  window.removeEventListener('resize', schedule);
  if (frame) {
    window.cancelAnimationFrame(frame);
    frame = 0;
  }
}

/** Current scroll progress, 0 at the top of the page and 1 at the bottom. */
export function getScrollProgress(): number {
  return measure();
}

/**
 * Subscribe to scroll progress. Callbacks run on the next animation frame
 * after a scroll, and are never tied to React state so they cannot trigger a
 * re-render.
 */
export function subscribeScrollProgress(listener: ProgressListener): () => void {
  listeners.add(listener);
  subscribers += 1;
  if (subscribers === 1) attach();

  listener(measure());

  return () => {
    listeners.delete(listener);
    subscribers -= 1;
    if (subscribers === 0) detach();
  };
}
