const GREEN = "#00bf63";
const MINT = "color-mix(in srgb, #00bf63 55%, white)";
const VEIN = "color-mix(in srgb, #00bf63, black 30%)";

/** One leaf pointing along +x from its base at (0, 0). */
const LEAF = "M0 0 C 6 -8, 20 -10, 30 0 C 20 10, 6 8, 0 0 Z";

/** Leaves, kept sparse on purpose: [x, y, rotate°, scale, colour, pop delay]. */
const LEAVES = [
  [30, 26, -100, 1.2, GREEN, "1.3s"],
  [80, 14, -70, 1.35, MINT, "1.45s"],
  [126, 22, 40, 1.15, GREEN, "1.6s"],
  [34, 90, 160, 1.15, MINT, "1.75s"],
  [96, 108, -40, 1.25, GREEN, "1.9s"],
];

/** A stem that draws itself in. */
const Stem = ({ d, width = 4, delay }) => (
  <path
    d={d}
    pathLength="1"
    fill="none"
    stroke={GREEN}
    strokeWidth={width}
    strokeLinecap="round"
    strokeDasharray="1"
    className="motion-safe:animate-sprout-grow"
    style={delay ? { animationDelay: delay } : undefined}
  />
);

/**
 * A sprout vine growing out of the period after "memories.": one branch
 * rolls right to a curl and a bud, a second dips into the space beside the
 * subheadline. Five leaves only, with plenty of air. Stems draw in, leaves pop
 * one by one, then the vine sways gently. The caller sets its width (in em, so
 * it scales with the headline); static under reduced motion. Its origin is
 * (4, 52) in the viewBox, i.e. 2% across and 31% down.
 */
export default function SproutVine({ className = "" }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none block aspect-[200/170] origin-[2%_31%] motion-safe:animate-sprout-sway ${className}`}
    >
      <svg viewBox="0 0 200 170" className="block h-full w-full overflow-visible">
        {/* Main branch: up, then a lazy S to the right, ending in a curl */}
        <Stem d="M4 52 C 20 40, 30 18, 52 14 C 78 10, 92 30, 118 24 C 140 19, 150 6, 172 8" />
        <Stem d="M172 8 c 8 -2 12 -9 6 -12 c -4 -2 -7 2 -4 4" width={2.5} delay="1.4s" />

        {/* Lower branch: dips down and right, ending in a curl */}
        <Stem d="M4 52 C 18 70, 30 96, 58 104 C 86 112, 104 100, 128 118" width={3.5} delay="0.9s" />
        <Stem d="M128 118 c 8 4 14 0 12 -6 c -2 -4 -7 -3 -6 1" width={2.2} delay="1.6s" />

        {LEAVES.map(([x, y, rotate, scale, fill, delay]) => (
          <g key={`${x}-${y}`} transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}>
            <g
              className="[transform-origin:0_0] motion-safe:animate-leaf-pop"
              style={{ animationDelay: delay }}
            >
              <path d={LEAF} fill={fill} />
              <path d="M3 0 L 25 0" stroke={VEIN} strokeWidth="1.3" strokeLinecap="round" />
            </g>
          </g>
        ))}

        {/* Bud near the end of the main branch */}
        <g transform="translate(160 7)">
          <g className="[transform-origin:0_0] motion-safe:animate-leaf-pop" style={{ animationDelay: "2.1s" }}>
            <circle r="6" fill={MINT} stroke={GREEN} strokeWidth="2" />
          </g>
        </g>
      </svg>
    </span>
  );
}
