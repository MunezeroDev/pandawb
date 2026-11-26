import { useEffect, useRef, useState } from "react";

/**
 * Returns [ref, inView]. With `once` (default) it stays true after the element
 * first enters the viewport; otherwise it tracks visibility live.
 */
export default function useInView({ once = true, threshold = 0.15, rootMargin = "0px" } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [once, threshold, rootMargin]);

  return [ref, inView];
}
