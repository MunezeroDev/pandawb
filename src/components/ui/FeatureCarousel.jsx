import { useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import FeatureCard from "./FeatureCard";

const VISIBLE = 3;

const arrowClass =
  "flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-pill-border bg-white font-sans text-[18px] text-brand shadow-[0_6px_16px_-8px_rgba(0,0,0,0.25)] [transition:background_0.2s_ease,color_0.2s_ease,opacity_0.2s_ease] hover:bg-brand hover:text-white disabled:cursor-default disabled:opacity-35 disabled:hover:bg-white disabled:hover:text-brand";

/** Tablet carousel: three cards in view, arrows/dots/swipe for the rest. */
export default function FeatureCarousel({ features }) {
  const trackRef = useRef(null);
  const [start, setStart] = useState(0);
  const lastStart = Math.max(0, features.length - VISIBLE);

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
    <div>
      <div
        ref={trackRef}
        className="-mx-2 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-2 pt-3 pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {features.map((feature) => (
          <div
            key={feature.title}
            className="shrink-0 grow-0 basis-[calc((100%-48px)/3)] snap-start"
          >
            <FeatureCard feature={feature} />
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
