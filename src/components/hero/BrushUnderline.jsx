/**
 * A single tapered marker stroke drawn in code: thin at both ends, fuller in
 * the middle, rising slightly to the right, with a faint second pass beneath.
 * Draws in left to right once (static under reduced motion).
 */
export default function BrushUnderline({ className = "" }) {
  return (
    <svg
      viewBox="0 0 300 20"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`pointer-events-none block overflow-visible motion-safe:animate-underline-draw ${className}`}
    >
      <path
        d="M2 13 C 70 7, 170 5, 298 4 C 300 5, 299 7, 296 8 C 180 12, 80 16, 4 17 C 0 17, 0 14, 2 13 Z"
        fill="#00bf63"
      />
      <path
        d="M40 19 C 120 16.5, 200 14.5, 268 13"
        fill="none"
        stroke="#00bf63"
        strokeOpacity="0.35"
        strokeWidth="2"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
