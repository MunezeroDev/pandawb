import { LeafIcon } from "./icons";

/** "Rooted in Action" pill above the hero headline. */
export default function HeroBadge({ className = "" }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full bg-mint-300 px-4 py-1.5 font-display text-[14px] font-bold tracking-[0.2px] text-brand-ink ${className}`}
    >
      <LeafIcon />
      Rooted in Action
    </span>
  );
}
