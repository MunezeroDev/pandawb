import { useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import MediaTile from "./MediaTile";
import useInView from "../../hooks/useInView";
import { collectMedia } from "../../utils/media";
import { arrowClass } from "../ui/carouselStyles";

const SLIDE_MS = 5000;
const SETTLE_MS = 120;

/**
 * Repeating tile heights (height ÷ width of the old aspect shapes). Each slide
 * is a fixed height, and tiles share their column's height in these
 * proportions, so columns stagger inside while every column starts and ends level.
 */
const WEIGHTS = [4 / 3, 1, 5 / 4, 5 / 3, 3 / 4, 3 / 2, 1];

/** Deals a slide's items round-robin into `count` columns, keeping each item's overall index. */
function toColumns(items, offset, count) {
  const cols = Array.from({ length: count }, () => []);
  items.forEach((item, i) => cols[i % count].push({ item, n: offset + i }));
  return cols.filter((c) => c.length);
}

/** "October 2026 · Mazingira Day" → "October 2026" */
const tabLabel = (event) => event.when.split(" · ")[0];

/** Splits every event's media into collage-sized slides, in event order. */
function buildSlides(events, perSlide) {
  return events.flatMap((event) => {
    const media = collectMedia([event]);
    const slides = [];
    for (let offset = 0; offset < media.length; offset += perSlide) {
      slides.push({
        tab: event.tab,
        media,
        offset,
        items: media.slice(offset, offset + perSlide),
      });
    }
    return slides;
  });
}

/**
 * Event gallery: one tab per event, newest first, over a carousel that runs
 * through every event's slides on its own. Each slide is a Pinterest-style
 * collage of that event's photos and videos. The active tab follows the slide
 * in view, clicking a tab jumps to that event, and `requestedTab` (for example,
 * from the timeline) does the same. Playback pauses on hover, on touch and
 * while the gallery is off-screen.
 */
export default function EventGalleryCarousel({ events, requestedTab, isMobile, onOpen }) {
  const slides = useMemo(
    () => buildSlides(events, isMobile ? 6 : 7),
    [events, isMobile],
  );
  const firstSlideOf = (tab) => Math.max(0, slides.findIndex((s) => s.tab === tab));

  const trackRef = useRef(null);
  const settleTimer = useRef(null);
  const indexRef = useRef(0);
  const [viewRef, inView] = useInView({ once: false, threshold: 0.3 });
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  // Follow selections made outside the gallery (the timeline cards).
  const [lastRequested, setLastRequested] = useState(requestedTab);
  if (requestedTab !== lastRequested) {
    setLastRequested(requestedTab);
    if (requestedTab) setIndex(firstSlideOf(requestedTab));
  }

  const current = slides[Math.min(index, slides.length - 1)];
  const eventSlides = slides
    .map((s, i) => ({ ...s, i }))
    .filter((s) => s.tab === current?.tab);

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  // Auto-advance, wrapping from the last event back to the newest.
  useEffect(() => {
    if (!inView || paused || slides.length < 2) return;
    const id = setTimeout(() => setIndex((i) => (i + 1) % slides.length), SLIDE_MS);
    return () => clearTimeout(id);
  }, [inView, paused, index, slides.length]);

  // Keep the track on the current slide.
  useEffect(() => {
    const track = trackRef.current;
    const slide = track?.children[index];
    if (!slide) return;
    if (Math.abs(track.scrollLeft - slide.offsetLeft) > 2) {
      track.scrollTo({ left: slide.offsetLeft, behavior: "smooth" });
    }
  }, [index]);

  // After a manual swipe settles, adopt the slide in view.
  const onScroll = () => {
    clearTimeout(settleTimer.current);
    settleTimer.current = setTimeout(() => {
      const track = trackRef.current;
      if (!track || !track.clientWidth) return;
      const nearest = Math.round(track.scrollLeft / track.clientWidth);
      if (nearest !== indexRef.current) setIndex(nearest);
    }, SETTLE_MS);
  };
  useEffect(() => () => clearTimeout(settleTimer.current), []);

  const step = (d) => setIndex((i) => (i + d + slides.length) % slides.length);

  return (
    <div ref={viewRef}>
      {/* Event tabs */}
      <div
        role="tablist"
        aria-label="Events"
        className="-mx-4 flex justify-start gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] md:mx-0 md:flex-wrap md:justify-center md:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {events.map((event) => {
          const active = event.tab === current?.tab;
          return (
            <button
              key={event.tab}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setIndex(firstSlideOf(event.tab))}
              className={clsx(
                "shrink-0 cursor-pointer rounded-full border px-5 py-[9px] font-display text-[14px] font-bold whitespace-nowrap [transition:background_0.2s_ease,color_0.2s_ease,border-color_0.2s_ease] md:text-[15px]",
                active
                  ? "border-brand bg-brand text-white"
                  : "border-pill-border bg-white text-ink-soft hover:border-brand hover:text-brand",
              )}
            >
              {tabLabel(event)}
            </button>
          );
        })}
      </div>

      {/* Slides */}
      <div
        ref={trackRef}
        onScroll={onScroll}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
        onTouchCancel={() => setPaused(false)}
        className="mt-6 flex snap-x snap-mandatory items-start overflow-x-auto [scrollbar-width:none] md:mt-8 [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((slide, s) => (
          <div
            key={`${slide.tab}-${slide.offset}`}
            inert={s !== index}
            className="flex h-[clamp(420px,60vw,640px)] w-full shrink-0 snap-start gap-[10px] md:gap-4"
          >
            {toColumns(slide.items, slide.offset, isMobile ? 2 : 3).map((col, c) => (
              <div key={c} className="flex min-w-0 flex-1 flex-col gap-[10px] md:gap-4">
                {col.map(({ item, n }) => (
                  <div
                    key={n}
                    className="min-h-0 basis-0"
                    style={{ flexGrow: WEIGHTS[n % WEIGHTS.length] }}
                  >
                    <MediaTile
                      item={item}
                      index={n}
                      className="h-full"
                      onClick={() => onOpen(slide.media, n)}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Controls: arrows across all events, dots within the current one */}
      <div className="mt-5 flex items-center justify-center gap-5">
        <button type="button" aria-label="Previous slide" onClick={() => step(-1)} className={arrowClass}>
          ←
        </button>
        <div className="flex gap-2">
          {eventSlides.map((s) => (
            <button
              key={s.i}
              type="button"
              aria-label={`Go to slide ${s.i + 1}`}
              onClick={() => setIndex(s.i)}
              className={clsx(
                "h-2 cursor-pointer rounded-full border-0 p-0 [transition:width_0.3s_ease,background_0.3s_ease]",
                s.i === index ? "w-7 bg-brand" : "w-2 bg-mint-200",
              )}
            />
          ))}
        </div>
        <button type="button" aria-label="Next slide" onClick={() => step(1)} className={arrowClass}>
          →
        </button>
      </div>
    </div>
  );
}
