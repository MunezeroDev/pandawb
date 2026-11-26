import AnimatedCounter from "../ui/AnimatedCounter";

/** Small leaf glyph used as floating decoration. */
const Leaf = ({ className, style }) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className={className}
    style={style}
    fill="currentColor"
  >
    <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
  </svg>
);

function StatChip({ value, label }) {
  return (
    <div className="rounded-[18px] border border-white/20 bg-white/10 px-5 py-4 backdrop-blur-md">
      <p className="text-[clamp(28px,3.4vw,40px)] leading-none font-bold">
        <AnimatedCounter to={value} />
      </p>
      <p className="mt-[6px] font-sans text-[12px] tracking-[1.5px] text-white/75 uppercase">
        {label}
      </p>
    </div>
  );
}

/** Dark-green hero card with the all-time totals across every event. */
export default function ImpactBanner({ planted, tracked, events, partners }) {
  return (
    <section
      aria-label="Total trees planted across all Panda events"
      className="relative isolate overflow-hidden rounded-[28px] bg-[linear-gradient(135deg,#00bf63_0%,#00924b_45%,#0b4d2c_100%)] px-6 py-8 text-white shadow-[0_30px_60px_-20px_rgba(0,122,61,0.55)] md:px-12 md:py-12"
    >
      {/* Glow + dotted texture */}
      <div className="pointer-events-none absolute -top-24 -right-24 -z-10 h-[340px] w-[340px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.28),transparent_65%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:18px_18px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <Leaf className="pointer-events-none absolute top-6 right-8 h-10 w-10 animate-float-slow text-white/25 motion-reduce:animate-none md:h-14 md:w-14" />
      <Leaf
        className="pointer-events-none absolute right-[30%] bottom-5 h-7 w-7 animate-float-slow text-white/15 motion-reduce:animate-none"
        style={{ animationDelay: "1.5s" }}
      />

      <div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between md:gap-10">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-[6px] font-sans text-[12px] tracking-[1.5px] uppercase">
            <span className="h-2 w-2 rounded-full bg-[#b9f5d3]" />
            Trees planted since year one
          </p>
          <p className="mt-4 text-[clamp(84px,22vw,96px)] leading-[0.9] font-bold tracking-[-4px] md:text-[clamp(96px,11vw,150px)]">
            <AnimatedCounter to={planted} />
          </p>
          <p className="mt-3 max-w-[34ch] text-[16px] leading-[1.6] text-white/85 md:text-[18px]">
            Real trees in real soil, planted with partners across Nairobi and
            tracked live on Panda.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 md:min-w-[420px] md:gap-4">
          <StatChip value={tracked} label="Tracked" />
          <StatChip value={events} label="Events" />
          <StatChip value={partners} label="Partners" />
        </div>
      </div>
    </section>
  );
}
