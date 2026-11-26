import clsx from "clsx";

export default function ProgressBar({ label, value, max, strong = false }) {
  const pct = Math.round((value / max) * 100);

  return (
    <div className="min-w-[180px] flex-1">
      <div className="mb-[6px] flex justify-between font-display text-[14px] text-muted">
        <span>{label}</span>
        <span className="font-bold text-ink">{value}</span>
      </div>
      <div className="h-2 rounded-[8px] bg-mint-200">
        <div
          className={clsx(
            "h-full rounded-[8px]",
            strong ? "bg-brand" : "bg-brand-soft",
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
