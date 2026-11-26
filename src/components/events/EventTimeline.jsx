import clsx from "clsx";
import EventCard from "./EventCard";
import Reveal from "../ui/Reveal";

/**
 * Vertical timeline, newest first. Phones: one rail on the left.
 * md+: a centre rail with cards alternating left and right.
 */
export default function EventTimeline({ events, selectedTab, onSelect }) {
  return (
    <ol className="relative m-0 list-none p-0">
      {/* Rail */}
      <span
        aria-hidden="true"
        className="absolute top-2 bottom-2 left-[11px] w-[2px] bg-[linear-gradient(to_bottom,#00bf63,#c8f0dc_85%,transparent)] md:left-1/2 md:-translate-x-1/2"
      />

      {events.map((event, i) => {
        const selected = event.tab === selectedTab;
        const right = i % 2 === 1;
        return (
          <li
            key={event.tab}
            className={clsx(
              "relative pb-8 pl-10 last:pb-0 md:w-1/2 md:pl-0",
              right ? "md:ml-auto md:pl-12" : "md:pr-12",
              i > 0 && "md:-mt-24",
            )}
          >
            {/* Node */}
            <span
              aria-hidden="true"
              className={clsx(
                "absolute top-7 left-[4px] h-4 w-4 rounded-full border-[3px] border-white motion-reduce:animate-none",
                right ? "md:-left-2" : "md:right-[-8px] md:left-auto",
                selected || i === 0 ? "bg-brand" : "bg-brand-soft",
                i === 0 && "animate-pulse-ring",
              )}
            />
            <Reveal delay={i * 80}>
              <EventCard
                event={event}
                latest={i === 0}
                selected={selected}
                onSelect={() => onSelect(selected ? null : event.tab)}
              />
            </Reveal>
          </li>
        );
      })}
    </ol>
  );
}
