import { useEffect } from "react";

/** On first load, smooth-scroll to the element named in the URL hash. */
export default function useHashScroll() {
  useEffect(() => {
    const { hash } = window.location;
    if (!hash) return;
    setTimeout(() => {
      document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, []);
}
