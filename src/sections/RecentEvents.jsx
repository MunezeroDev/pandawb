import { useCallback, useEffect, useState } from "react";
import ImpactBanner from "../components/events/ImpactBanner";
import EventTimeline from "../components/events/EventTimeline";
import EventGalleryCarousel from "../components/media/EventGalleryCarousel";
import Lightbox from "../components/media/Lightbox";
import Reveal from "../components/ui/Reveal";
import useIsMobile from "../hooks/useIsMobile";
import {
  EVENTS,
  EVENTS_NEWEST_FIRST,
  FEATURES_GALLERY,
  TOTAL_PARTNERS,
  TOTAL_PLANTED,
  TOTAL_TRACKED,
} from "../data/events";

/** Gallery tabs: every event (newest first), then the app's features. */
const GALLERY_TABS = [...EVENTS_NEWEST_FIRST, FEATURES_GALLERY];

/** "#gallery-2025" → that event's tab (links from reports point here), else null. */
function tabFromHash() {
  const slug = window.location.hash.match(/^#gallery-(.+)$/)?.[1];
  return GALLERY_TABS.find((e) => e.slug === slug)?.tab ?? null;
}

/** Scrolls to the gallery once the page's images have loaded, so the target does not move. */
function scrollToGallery() {
  const go = () =>
    setTimeout(
      () => document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" }),
      100,
    );
  if (document.readyState === "complete") go();
  else window.addEventListener("load", go, { once: true });
}

export default function RecentEvents() {
  const isMobile = useIsMobile();
  const [selectedTab, setSelectedTab] = useState(null); // expanded timeline card
  // Tab the gallery should jump to; a new object each time so repeats still apply.
  // `hold` (from a #gallery-<slug> link) keeps the gallery on that event until the visitor moves it.
  const [galleryRequest, setGalleryRequest] = useState(() => {
    const tab = tabFromHash();
    return tab && { tab, hold: true };
  });

  useEffect(() => {
    const follow = () => {
      const tab = tabFromHash();
      if (!tab) return;
      setGalleryRequest({ tab, hold: true });
      scrollToGallery();
    };
    if (tabFromHash()) scrollToGallery();
    window.addEventListener("hashchange", follow);
    return () => window.removeEventListener("hashchange", follow);
  }, []);

  const selectEvent = useCallback((tab) => {
    setSelectedTab(tab);
    if (tab) setGalleryRequest({ tab });
  }, []);
  const [lightbox, setLightbox] = useState(null); // { items, i } | null

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
        <h1 className="text-[clamp(40px,11vw,60px)] leading-[1.02] font-normal tracking-[-1.5px] text-ink md:text-[clamp(44px,6vw,76px)]">
          Our <span className="font-bold text-brand italic">Impact</span>
        </h1>
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
          onSelect={selectEvent}
        />
      </div>

      <div
        id="gallery"
        className="mt-14 rounded-[28px] bg-mint-50 px-4 py-7 md:mt-20 md:px-9 md:py-10"
      >
        <Reveal as="header" className="mb-6 text-center md:mb-8">
          <h2 className="text-[clamp(28px,7vw,36px)] leading-[1.1] font-normal text-ink md:text-[42px]">
            <span className="font-bold text-brand">Gallery</span>
          </h2>
        </Reveal>

        <EventGalleryCarousel
          events={GALLERY_TABS}
          request={galleryRequest}
          isMobile={isMobile}
          onOpen={(items, i) => setLightbox({ items, i })}
        />
      </div>

      <Lightbox
        state={lightbox}
        onClose={closeLightbox}
        onMove={moveLightbox}
      />
    </section>
  );
}
