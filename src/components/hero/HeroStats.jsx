const STATS = [
  { value: "10K+", label: "Trees planted" },
  { value: "500+", label: "Active planters" },
  { value: "50+", label: "Communities" },
];

/**
 * Three headline numbers: one line across the top of the strip and a thin
 * rule on the right of every stat but the last, with 32–36px between items.
 */
export default function HeroStats({ className = "" }) {
  return (
    <dl
      className={`m-0 flex gap-8 border-0 border-t border-solid border-divider pt-6 lg:gap-9 tablet:gap-6 ${className}`}
    >
      {STATS.map(({ value, label }) => (
        <div
          key={label}
          className="flex flex-col-reverse border-0 border-r border-solid border-divider pr-8 last:border-r-0 last:pr-0 lg:pr-9 tablet:pr-6"
        >
          <dt className="mt-1 font-display text-[13px] text-subtle md:text-[14px]">
            {label}
          </dt>
          <dd className="m-0 font-display text-[28px] leading-none text-brand-pressed md:text-[36px]">
            {value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
