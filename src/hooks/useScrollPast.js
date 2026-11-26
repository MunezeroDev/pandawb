import { useEffect, useRef, useState } from "react";

/**
 * True once the page is scrolled further than `fraction` of the viewport
 * height. `onPast` (optional) runs on every scroll event beyond that point.
 */
export default function useScrollPast(fraction, onPast) {
  const [isPast, setIsPast] = useState(false);
  const onPastRef = useRef(onPast);

  useEffect(() => {
    onPastRef.current = onPast;
  });

  useEffect(() => {
    const onScroll = () => {
      const past = window.scrollY > window.innerHeight * fraction;
      setIsPast(past);
      if (past) onPastRef.current?.();
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [fraction]);

  return isPast;
}
