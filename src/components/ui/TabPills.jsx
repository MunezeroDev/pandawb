import clsx from "clsx";

/** Pill-shaped tabs; scroll horizontally on mobile, wrap and centre on desktop. */
export default function TabPills({ tabs, activeTab, onChange }) {
  return (
    <div
      role="tablist"
      className="flex flex-nowrap justify-start gap-[10px] overflow-x-auto px-1 pt-1 pb-[14px] [scrollbar-width:none] md:flex-wrap md:justify-center"
    >
      {tabs.map((tab) => {
        const active = tab === activeTab;
        return (
          <button
            key={tab}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(tab)}
            className={clsx(
              "shrink-0 cursor-pointer rounded-[50px] border px-[22px] py-[10px] font-display text-[15px] whitespace-nowrap [transition:background_0.2s_ease,color_0.2s_ease,box-shadow_0.2s_ease]",
              active
                ? "border-brand bg-brand font-bold text-white shadow-[0_4px_14px_rgba(0,191,99,0.35)]"
                : "border-pill-border bg-white font-normal text-muted",
            )}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}
