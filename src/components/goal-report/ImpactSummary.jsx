import AnimatedCounter from "../ui/AnimatedCounter";

function Stat({ value, label }) {
  return (
    <div>
      <p className="text-[clamp(32px,4vw,48px)] font-bold">
        <AnimatedCounter to={value} />
      </p>
      <p className="text-[15px] opacity-90">{label}</p>
    </div>
  );
}

/** Green banner with the all-time totals (Goal 1). */
export default function ImpactSummary({ planted, tracked, drives }) {
  return (
    <section
      aria-label="Goal 1: total trees planted since Year 1"
      className="mb-6 flex flex-col items-start gap-5 rounded-[24px] bg-brand px-5 py-[26px] text-white md:mb-8 md:flex-row md:items-center md:gap-12 md:px-11 md:py-9"
    >
      <div>
        <p className="text-[16px] opacity-95 md:text-[18px]">
          <b>Goal 1:</b> Total trees planted since Year 1
        </p>
        <p className="mt-1 text-[72px] leading-none font-bold tracking-[-3px] md:text-[clamp(84px,9vw,128px)]">
          <AnimatedCounter to={planted} />
        </p>
      </div>
      <div className="ml-0 flex flex-wrap gap-7 md:ml-auto md:gap-11">
        <Stat value={tracked} label="tracked on Panda" />
        <Stat value={drives} label="planting drives" />
      </div>
    </section>
  );
}
