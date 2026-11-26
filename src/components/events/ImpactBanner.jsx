import AnimatedCounter from "../ui/AnimatedCounter";

/** One tilted "sticker" pill: icon, counting number and a short label. */
function StatSticker({ icon, value, label, tilt }) {
  return (
    <div
      className={`flex items-center gap-3 rounded-full border-2 border-brand/25 bg-white py-2 pr-5 pl-2 shadow-[0_8px_20px_-10px_rgba(0,191,99,0.45)] [transition:transform_0.3s_cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-1 hover:rotate-0 motion-reduce:transition-none ${tilt}`}
    >
      <span
        aria-hidden="true"
        className="flex h-11 w-11 items-center justify-center rounded-full bg-brand/10 text-[22px]"
      >
        {icon}
      </span>
      <span className="flex items-baseline gap-2">
        <span className="text-[28px] leading-none font-bold text-brand">
          <AnimatedCounter to={value} />
        </span>
        <span className="font-sans text-[13px] text-muted">{label}</span>
      </span>
    </div>
  );
}

/** All-time totals across every event, as a row of playful sticker pills. */
export default function ImpactBanner({ tracked, events, partners }) {
  return (
    <section
      aria-label="Totals across all Panda events"
      className="flex flex-wrap items-center justify-center gap-3 md:gap-5"
    >
      <StatSticker icon="🌳" value={tracked} label="trees tracked" tilt="-rotate-2" />
      <StatSticker icon="📍" value={events} label="events" tilt="rotate-1" />
      <StatSticker icon="🤝" value={partners} label="partners" tilt="-rotate-1" />
    </section>
  );
}
