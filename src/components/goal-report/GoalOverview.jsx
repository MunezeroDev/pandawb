import clsx from "clsx";

/** "All" tab: one row per drive; clicking a row opens that drive's tab. */
export default function GoalOverview({ goals, onPick }) {
  return (
    <div className="rounded-[24px] border border-mint-200 bg-mint-100 px-4 py-[10px] md:px-[34px] md:py-[14px]">
      {goals.map((goal, i) => (
        <button
          key={goal.tab}
          onClick={() => onPick(goal.tab)}
          className={clsx(
            "flex w-full cursor-pointer flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-0 bg-transparent px-0 py-4 text-left font-display",
            i > 0 && "border-t border-mint-200",
          )}
        >
          <span className="text-[17px] text-ink md:text-[20px]">
            {goal.when}
          </span>
          <span className="text-[15px] text-muted">
            <b className="text-brand">{goal.planted}</b> planted ·{" "}
            <b className="text-brand-deep">{goal.tracked}</b> tracked
          </span>
        </button>
      ))}
    </div>
  );
}
