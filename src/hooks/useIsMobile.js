import useMediaQuery from "./useMediaQuery";

export const MOBILE_BREAKPOINT = 768;
/** First width that gets the full desktop layout (keep in sync with `tablet:` in index.css). */
export const DESKTOP_BREAKPOINT = 1040;

/** True while the viewport is narrower than the `md` breakpoint (768px). */
export default function useIsMobile() {
  return useMediaQuery(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
}

/** True for tablets: 768px up to (but not including) the desktop breakpoint. */
export function useIsTablet() {
  return useMediaQuery(
    `(min-width: ${MOBILE_BREAKPOINT}px) and (max-width: ${DESKTOP_BREAKPOINT - 1}px)`,
  );
}
