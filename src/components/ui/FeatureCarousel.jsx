import { useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import FeatureCard from "./FeatureCard";
import useInView from "../../hooks/useInView";
import { arrowClass } from "./carouselStyles";

const GAP = 24;
/** Overlay mode: how long after scrolling into view the descriptions slide up. */
const OVERLAY_DELAY_MS = 1500;


/**
 * Tablet/desktop carousel: `visible` equal-height cards in view, arrows/dots/
 * swipe for the rest. With `overlay`, each card shows its description over the
 * image once the carousel has been on screen for a moment, and keeps it there.
 */
export default function FeatureCarousel({ features, visible = 3, overlay = false }) {
  const trackRef = useRef(null);
  const [start, setStart] = useState(0);
  const lastStart = Math.max(0, features.length - visible);
  const [viewRef, inView] = useInView({ threshold: 0.4 });
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (!overlay || !inView) return;
    const id = setTimeout(() => setRevealed(true), OVERLAY_DELAY_MS);
    return () => clearTimeout(id);
  }, [overlay, inView]);

  const slideWidth = () => {
    const track = trackRef.current;
    const first = track?.children[0];
    if (!first) return 0;
    const second = track.children[1];
    return second ? second.offsetLeft - first.offsetLeft : first.offsetWidth;
  };

  const goTo = useCallback((i) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: i * slideWidth(), behavior: "smooth" });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const w = slideWidth();
      if (w) setStart(Math.round(track.scrollLeft / w));
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={viewRef}>
      <div
        ref={trackRef}
        style={{ gap: GAP }}
        className="-mx-2 flex snap-x snap-mandatory items-stretch overflow-x-auto scroll-smooth px-2 pt-3 pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {features.map((feature) => (
          <div
            key={feature.title}
            className="flex shrink-0 grow-0 snap-start"
            style={{ flexBasis: `calc((100% - ${GAP * (visible - 1)}px) / ${visible})` }}
          >
            <FeatureCard feature={feature} overlay={overlay} revealed={revealed} />
          </div>
        ))}
      </div>

      {lastStart > 0 && (
        <div className="mt-3 flex items-center justify-center gap-5">
          <button
            type="button"
            aria-label="Previous features"
            onClick={() => goTo(start - 1)}
            disabled={start === 0}
            className={arrowClass}
          >
            ←
          </button>
          <div className="flex gap-2">
            {Array.from({ length: lastStart + 1 }, (_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => goTo(i)}
                className={clsx(
                  "h-2 cursor-pointer rounded-full border-0 p-0 [transition:width_0.3s_ease,background_0.3s_ease]",
                  i === start ? "w-7 bg-brand" : "w-2 bg-mint-200",
                )}
              />
            ))}
          </div>
          <button
            type="button"
            aria-label="Next features"
            onClick={() => goTo(start + 1)}
            disabled={start >= lastStart}
            className={arrowClass}
          >
            →
          </button>
        </div>
      )}
    </div>
  );
}
