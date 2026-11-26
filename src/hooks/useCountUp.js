import { useEffect, useRef, useState } from "react";

const DURATION_MS = 1400;
const easeOutCubic = (p) => 1 - Math.pow(1 - p, 3);

/**
 * Counts from 0 to `to` once the returned ref's element scrolls into view.
 * Returns `[ref, value]`.
 */
export default function useCountUp(to) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min((now - start) / DURATION_MS, 1);
          setValue(Math.round(to * easeOutCubic(p)));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to]);

  return [ref, value];
}
