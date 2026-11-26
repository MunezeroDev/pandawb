import { useCallback, useState } from "react";
import ImpactBanner from "../components/events/ImpactBanner";
import EventTimeline from "../components/events/EventTimeline";
import MediaGallery from "../components/media/MediaGallery";
import Lightbox from "../components/media/Lightbox";
import Reveal from "../components/ui/Reveal";
import useIsMobile from "../hooks/useIsMobile";
import { collectMedia } from "../utils/media";
import {
  EVENTS,
  EVENTS_NEWEST_FIRST,
  TOTAL_PARTNERS,
  TOTAL_PLANTED,
  TOTAL_TRACKED,
} from "../data/events";

export default function RecentEvents() {
  const isMobile = useIsMobile();
  const [selectedTab, setSelectedTab] = useState(null); // null = all events
  const [lightbox, setLightbox] = useState(null); // { items, i } | null

  const selected = EVENTS.find((e) => e.tab === selectedTab);

  const closeLightbox = useCallback(() => setLightbox(null), []);
  const moveLightbox = useCallback(
    (step) =>
      setLightbox(
        (s) => s && { ...s, i: (s.i + step + s.items.length) % s.items.length },
      ),
    [],
  );

  return (
    <section
      id="events"
      className="relative bg-white px-5 py-12 font-body md:mx-[3.25rem] md:px-0 md:pt-10 md:pb-16"
    >
      <Reveal as="header" className="mb-8 text-center md:mb-12">
        <p className="mb-3 font-sans text-[12px] font-bold tracking-[3px] text-brand uppercase">
          Our impact, event by event
        </p>
        <h1 className="text-[clamp(40px,11vw,60px)] leading-[1.02] font-normal tracking-[-1.5px] text-ink md:text-[clamp(44px,6vw,76px)]">
          Recent <span className="font-bold text-brand italic">Events</span>
        </h1>
        <p className="mx-auto mt-4 max-w-[52ch] text-[16px] leading-[1.7] text-muted md:text-[18px]">
          Every drive is a story of partners, students and neighbours getting
          their hands dirty. Here&apos;s what we&apos;ve planted together.
        </p>
      </Reveal>

      <Reveal>
        <ImpactBanner
          planted={TOTAL_PLANTED}
          tracked={TOTAL_TRACKED}
          events={EVENTS.length}
          partners={TOTAL_PARTNERS}
        />
      </Reveal>

      <div className="mt-12 md:mt-16">
        <EventTimeline
          events={EVENTS_NEWEST_FIRST}
          selectedTab={selectedTab}
          onSelect={setSelectedTab}
        />
      </div>

      <div className="mt-14 rounded-[28px] bg-mint-50 px-4 py-7 md:mt-20 md:px-9 md:py-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-[clamp(24px,6vw,30px)] leading-[1.15] font-normal text-ink md:text-[34px]">
            Moments from{" "}
            <span className="font-bold text-brand">
              {selected ? selected.when.split(" · ")[0] : "every event"}
            </span>
          </h2>
          {selected && (
            <button
              type="button"
              onClick={() => setSelectedTab(null)}
              className="cursor-pointer rounded-full border border-brand bg-white px-4 py-2 font-display text-[14px] font-bold text-brand [transition:background_0.2s_ease,color_0.2s_ease] hover:bg-brand hover:text-white"
            >
              ✕ All events
            </button>
          )}
        </div>

        <MediaGallery
          key={selectedTab ?? "all"}
          items={collectMedia(selected ? [selected] : EVENTS_NEWEST_FIRST)}
          isMobile={isMobile}
          onOpen={(items, i) => setLightbox({ items, i })}
        />
      </div>

      <Lightbox state={lightbox} onClose={closeLightbox} onMove={moveLightbox} />
    </section>
  );
}
