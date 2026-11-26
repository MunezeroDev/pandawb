/** Line icons used in the hero. They inherit colour via `currentColor`. */
const base = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

export const LeafIcon = ({ className = "size-4" }) => (
  <svg {...base} className={className}>
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
  </svg>
);

export const SproutIcon = ({ className = "size-4" }) => (
  <svg {...base} className={className}>
    <path d="M7 20h10" />
    <path d="M10 20c5.5-2.5.8-6.4 3-10" />
    <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z" />
    <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z" />
  </svg>
);

export const PlayCircleIcon = ({ className = "size-5" }) => (
  <svg {...base} className={className}>
    <circle cx="12" cy="12" r="10" />
    <path d="M10 8.5v7l5.5-3.5z" />
  </svg>
);

export const ArrowRightIcon = ({ className = "size-5" }) => (
  <svg {...base} className={className}>
    <path d="M4 12h15" />
    <path d="M14 6l6 6-6 6" />
  </svg>
);
