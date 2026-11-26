import clsx from "clsx";

/** One event on the timeline; clicking selects it (expands + filters gallery). */
export default function EventCard({ event, selected, latest, onSelect }) {
  const trackedPct = Math.round((event.tracked / event.planted) * 100);
  const [month, ...rest] = event.when.split(" · ");

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={clsx(
        "group relative block w-full cursor-pointer overflow-hidden rounded-[24px] border p-0 text-left font-display [transition:transform_0.35s_cubic-bezier(0.22,1,0.36,1),box-shadow_0.35s_ease,border-color_0.2s_ease] hover:[transform:translateY(-4px)]",
        selected
          ? "border-brand bg-white shadow-[0_24px_50px_-18px_rgba(0,191,99,0.45)]"
          : "border-mint-200 bg-white shadow-[0_10px_30px_-18px_rgba(15,23,42,0.25)] hover:shadow-[0_20px_40px_-18px_rgba(0,191,99,0.35)]",
      )}
    >
      {/* Accent strip */}
      <span
        className={clsx(
          "absolute top-0 left-0 h-full w-[5px] [transition:background_0.2s_ease]",
          selected ? "bg-brand" : "bg-mint-200 group-hover:bg-brand/60",
        )}
      />

      <div className="px-6 pt-5 pb-6 md:px-7">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-mint-50 px-3 py-[5px] font-sans text-[12px] font-bold tracking-[1px] text-brand-deep uppercase">
            {month}
          </span>
          {rest.length > 0 && (
            <span className="font-sans text-[12px] tracking-[1px] text-subtle uppercase">
              {rest.join(" · ")}
            </span>
          )}
          {latest && (
            <span className="ml-auto rounded-full bg-brand px-3 py-[5px] font-sans text-[11px] font-bold tracking-[1.5px] text-white uppercase">
              Latest
            </span>
          )}
        </div>

        <h3 className="mt-4 text-[clamp(20px,5.5vw,24px)] leading-[1.2] font-normal tracking-[-0.3px] text-ink md:text-[22px]">
          {event.title}
        </h3>

        {/* Expanding story */}
        <div
          className={clsx(
            "grid [transition:grid-template-rows_0.4s_ease,opacity_0.3s_ease]",
            selected ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
          )}
        >
          <div className="overflow-hidden">
            <p className="pt-3 text-[15px] leading-[1.7] text-ink-soft md:text-[16px]">
              {event.text}
            </p>
            <p className="pt-3 font-sans text-[12px] tracking-[1px] text-brand-deep uppercase italic">
              {event.platform}
            </p>
          </div>
        </div>

        {/* Planted vs tracked */}
        <div className="mt-5 flex items-end gap-5">
          <div>
            <p className="text-[34px] leading-none font-bold text-brand">
              {event.planted}
            </p>
            <p className="mt-1 font-sans text-[11px] tracking-[1px] text-subtle uppercase">
              planted
            </p>
          </div>
          <div className="flex-1 pb-1">
            <div className="mb-[6px] flex justify-between font-sans text-[12px] text-subtle">
              <span>{event.tracked} tracked on Panda</span>
              <span className="font-bold text-ink">{trackedPct}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-mint-200">
              <div
                className="h-full rounded-full bg-brand"
                style={{ width: `${trackedPct}%` }}
              />
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {event.partners.map((partner) => (
            <span
              key={partner}
              className="rounded-full border border-pill-border bg-surface px-3 py-[5px] font-sans text-[12px] text-ink-soft"
            >
              {partner}
            </span>
          ))}
        </div>

        <p className="mt-5 font-sans text-[13px] font-bold text-brand">
          {selected ? "Showing this event’s gallery ↓" : "Tap to see the story & photos →"}
        </p>
      </div>
    </button>
  );
}
