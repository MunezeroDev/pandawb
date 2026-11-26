import { useEffect, useState } from "react";

export const MOBILE_BREAKPOINT = 768;

const isMobileWidth = () => window.innerWidth < MOBILE_BREAKPOINT;

/** True while the viewport is narrower than the `md` breakpoint (768px). */
export default function useIsMobile() {
  const [isMobile, setIsMobile] = useState(isMobileWidth);

  useEffect(() => {
    const onResize = () => setIsMobile(isMobileWidth());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return isMobile;
}
