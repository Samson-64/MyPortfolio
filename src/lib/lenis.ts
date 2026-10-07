import Lenis from 'lenis';

let instance: Lenis | null = null;

export function initLenis(): Lenis | null {
  if (instance) return instance;
  instance = new Lenis({
    lerp: 0.09,
    smoothWheel: true,
    syncTouch: false,
  });
  return instance;
}

export function getLenis(): Lenis | null {
  return instance;
}

export function destroyLenis(): void {
  instance?.destroy();
  instance = null;
}
