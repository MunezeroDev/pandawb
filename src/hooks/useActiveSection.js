import { useEffect, useState } from "react";

/**
 * Scroll-spy: returns the id (from `ids`) of the section crossing the middle
 * band of the viewport, or null before any has been seen.
 */
export default function useActiveSection(ids) {
  const [activeId, setActiveId] = useState(null);
  const key = ids.join(",");

  useEffect(() => {
    const elements = key
      .split(",")
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [key]);

  return activeId;
}
