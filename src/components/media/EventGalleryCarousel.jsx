import { useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import MediaTile from "./MediaTile";
import PhoneWall from "./PhoneWall";
import useInView from "../../hooks/useInView";
import { collectMedia } from "../../utils/media";
import { packSlide } from "../../utils/packSlide";
import { arrowClass } from "../ui/carouselStyles";

const SLIDE_MS = 5000;
const SETTLE_MS = 120;

/** Collage packing per layout: items per slide, column counts to try, preferred height ÷ width. */
const COLLAGE = {
  desktop: { perSlide: 7, columns: [3, 4, 5], target: 0.55 },
  mobile: { perSlide: 4, columns: [2], target: 1.15 },
};

/** Splits `n` items into the fewest chunks of at most `max`, sized as evenly as possible. */
function chunkSizes(n, max) {
  const count = Math.ceil(n / max);
  return Array.from({ length: count }, (_, i) => Math.floor(n / count) + (i < n % count ? 1 : 0));
}

/** "October 2026 · Mazingira Day" → "October 2026" */
const tabLabel = (event) => event.when.split(" · ")[0];

/** Splits every event's media into collage-sized slides, in event order. */
function buildSlides(events, isMobile) {
  return events.flatMap((event) => {
    const media = collectMedia([event]);
    const layout = event.layout ?? "collage";
    const collage = isMobile ? COLLAGE.mobile : COLLAGE.desktop;
    const perSlide = layout === "phones" ? (isMobile ? 2 : 4) : collage.perSlide;
    let offset = 0;
    return chunkSizes(media.length, perSlide).map((size) => {
      const items = media.slice(offset, offset + size);
      const slide = { tab: event.tab, layout, media, offset, items };
      if (layout === "collage") slide.pack = packSlide(items, collage.columns, collage.target);
      offset += size;
      return slide;
    });
  });
}

/**
 * Event gallery: one tab per event, newest first, over a carousel that runs
 * through every event's slides on its own. Each slide is a Pinterest-style
 * collage of that event's photos and videos, packed so every tile keeps its
 * photo's exact shape (see packSlide); the track eases to each slide's height. The active tab follows the slide
 * in view, clicking a tab jumps to that event, and `requestedTab` (for example,
 * from the timeline) does the same. Playback pauses on hover, on touch and
 * while the gallery is off-screen.
 */
export default function EventGalleryCarousel({ events, request, isMobile, onOpen }) {
  const slides = useMemo(() => buildSlides(events, isMobile), [events, isMobile]);
  const firstSlideOf = (tab) =>
    Math.max(
      0,
      slides.findIndex((s) => s.tab === tab),
    );

  const trackRef = useRef(null);
  const settleTimer = useRef(null);
  const indexRef = useRef(0);
  const [viewRef, inView] = useInView({ once: false, threshold: 0.3 });
  const [index, setIndex] = useState(() => (request ? firstSlideOf(request.tab) : 0));
  const [paused, setPaused] = useState(false);
  const [trackHeight, setTrackHeight] = useState(null);

  // Held on one event after arriving from a #gallery-<slug> link, until the visitor moves it.
  const [held, setHeld] = useState(Boolean(request?.hold));

  // Follow requests made outside the gallery (timeline cards, #gallery-<slug> links).
  const [lastRequest, setLastRequest] = useState(request);
  if (request !== lastRequest) {
    setLastRequest(request);
    if (request) {
      setIndex(firstSlideOf(request.tab));
      setHeld(Boolean(request.hold));
    }
  }

  const current = slides[Math.min(index, slides.length - 1)];
  const eventSlides = slides.map((s, i) => ({ ...s, i })).filter((s) => s.tab === current?.tab);

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  /** Visitor-driven moves release a link's hold so autoplay resumes. */
  const go = (i) => {
    setHeld(false);
    setIndex(i);
  };

  // Auto-advance, wrapping from the last event back to the newest.
  useEffect(() => {
    if (!inView || paused || held || slides.length < 2) return;
    const id = setTimeout(() => setIndex((i) => (i + 1) % slides.length), SLIDE_MS);
    return () => clearTimeout(id);
  }, [inView, paused, held, index, slides.length]);

  // Keep the track on the current slide.
  useEffect(() => {
    const track = trackRef.current;
    const slide = track?.children[index];
    if (!slide) return;
    if (Math.abs(track.scrollLeft - slide.offsetLeft) > 2) {
      track.scrollTo({ left: slide.offsetLeft, behavior: "smooth" });
    }
  }, [index]);

  // Size the track to the current slide (slides differ in height), re-measuring on resize.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => setTrackHeight(track.children[index]?.offsetHeight ?? null);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    return () => observer.disconnect();
  }, [index, slides]);

  // After a manual swipe settles, adopt the slide in view.
  const onScroll = () => {
    clearTimeout(settleTimer.current);
    settleTimer.current = setTimeout(() => {
      const track = trackRef.current;
      if (!track || !track.clientWidth) return;
      const nearest = Math.round(track.scrollLeft / track.clientWidth);
      if (nearest !== indexRef.current) go(nearest);
    }, SETTLE_MS);
  };
  useEffect(() => () => clearTimeout(settleTimer.current), []);

  const step = (d) => go((index + d + slides.length) % slides.length);

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
              onClick={() => go(firstSlideOf(event.tab))}
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
        style={trackHeight ? { height: trackHeight } : undefined}
        className="mt-6 flex snap-x snap-mandatory items-start overflow-x-auto overflow-y-hidden [scrollbar-width:none] [transition:height_0.45s_cubic-bezier(0.22,1,0.36,1)] md:mt-8 [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((slide, s) => (
          <div
            key={`${slide.tab}-${slide.offset}`}
            inert={s !== index}
            className={clsx(
              "flex w-full shrink-0 snap-start gap-[10px] md:gap-4",
              slide.layout === "phones" && "h-[clamp(420px,60vw,640px)]",
            )}
            style={slide.pack ? { aspectRatio: 1 / slide.pack.hOverW } : undefined}
          >
            {slide.layout === "phones" ? (
              <PhoneWall
                items={slide.items}
                offset={slide.offset}
                onOpen={(n) => onOpen(slide.media, n)}
              />
            ) : (
              // Column width ∝ 1/S and tile height ∝ its ratio: every tile is its photo's exact shape.
              slide.pack.columns.map((col, c) => (
                <div
                  key={c}
                  className="flex min-w-0 basis-0 flex-col gap-[10px] md:gap-4"
                  style={{ flexGrow: 1 / col.S }}
                >
                  {col.entries.map(({ item, i }) => {
                    const n = slide.offset + i;
                    return (
                      <div key={n} className="min-h-0 basis-0" style={{ flexGrow: item.ratio ?? 1 }}>
                        <MediaTile
                          item={item}
                          index={n}
                          className="h-full"
                          onClick={() => onOpen(slide.media, n)}
                        />
                      </div>
                    );
                  })}
                </div>
              ))
            )}
          </div>
        ))}
      </div>

      {/* Controls: arrows across all events, dots within the current one */}
      <div className="mt-5 flex items-center justify-center gap-5">
        <button
          type="button"
          aria-label="Previous slide"
          onClick={() => step(-1)}
          className={arrowClass}
        >
          ←
        </button>
        <div className="flex gap-2">
          {eventSlides.map((s) => (
            <button
              key={s.i}
              type="button"
              aria-label={`Go to slide ${s.i + 1}`}
              onClick={() => go(s.i)}
              className={clsx(
                "h-2 cursor-pointer rounded-full border-0 p-0 [transition:width_0.3s_ease,background_0.3s_ease]",
                s.i === index ? "w-7 bg-brand" : "w-2 bg-mint-200",
              )}
            />
          ))}
        </div>
        <button
          type="button"
          aria-label="Next slide"
          onClick={() => step(1)}
          className={arrowClass}
        >
          →
        </button>
      </div>
    </div>
  );
}
