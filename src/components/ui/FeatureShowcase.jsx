import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import useInView from "../../hooks/useInView";
import { FeatureDetails } from "./FeatureCard";

/** How long each card stays in focus before the showcase moves on. */
const CARD_MS = 5000;
const SETTLE_MS = 120;

/**
 * Phone feature showcase: one card at a time, swipeable, each with its
 * details permanently over the screenshot. Advances on its own in a loop; it
 * pauses while touched or off-screen, and picks up from whichever card was
 * swiped to.
 */
export default function FeatureShowcase({ features }) {
  const trackRef = useRef(null);
  const settleTimer = useRef(null);
  const [sectionRef, inView] = useInView({ once: false, threshold: 0.4 });
  const [index, setIndex] = useState(0);
  const [touching, setTouching] = useState(false);
  const indexRef = useRef(0);
  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  const playing = inView && !touching;

  // Timed loop: next card every CARD_MS.
  useEffect(() => {
    if (!playing) return;
    const id = setTimeout(
      () => setIndex((i) => (i + 1) % features.length),
      CARD_MS,
    );
    return () => clearTimeout(id);
  }, [playing, index, features.length]);

  // Keep the track centred on the current card.
  useEffect(() => {
    const track = trackRef.current;
    const slide = track?.children[index];
    if (!slide) return;
    const left = slide.offsetLeft - (track.clientWidth - slide.offsetWidth) / 2;
    if (Math.abs(track.scrollLeft - left) > 2) {
      track.scrollTo({ left, behavior: "smooth" });
    }
  }, [index]);

  // After a manual swipe settles, adopt the card nearest the centre.
  const onScroll = () => {
    clearTimeout(settleTimer.current);
    settleTimer.current = setTimeout(() => {
      const track = trackRef.current;
      if (!track) return;
      const centre = track.scrollLeft + track.clientWidth / 2;
      let nearest = 0;
      let best = Infinity;
      [...track.children].forEach((el, i) => {
        const d = Math.abs(el.offsetLeft + el.offsetWidth / 2 - centre);
        if (d < best) {
          best = d;
          nearest = i;
        }
      });
      if (nearest !== indexRef.current) setIndex(nearest);
    }, SETTLE_MS);
  };

  useEffect(() => () => clearTimeout(settleTimer.current), []);

  const goTo = (i) => setIndex(i);

  return (
    <div ref={sectionRef}>
      <div
        ref={trackRef}
        onScroll={onScroll}
        onTouchStart={() => setTouching(true)}
        onTouchEnd={() => setTouching(false)}
        onTouchCancel={() => setTouching(false)}
        className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[9%] pt-2 pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {features.map((feature, i) => {
          const active = i === index;
          return (
            <button
              key={feature.title}
              type="button"
              onClick={() => goTo(i)}
              aria-label={feature.title}
              className={clsx(
                "relative w-[82%] max-w-[360px] shrink-0 cursor-pointer snap-center overflow-hidden rounded-[24px] border-0 bg-navy p-0 text-left font-display [transition:transform_0.5s_cubic-bezier(0.22,1,0.36,1),opacity_0.5s_ease,box-shadow_0.5s_ease]",
                active
                  ? "scale-100 opacity-100 shadow-[0_24px_50px_-16px_rgba(0,191,99,0.55)]"
                  : "scale-[0.92] opacity-60 shadow-[0_8px_20px_-12px_rgba(0,0,0,0.3)]",
              )}
            >
              <div className="aspect-[4/5]">
                <img
                  src={feature.image}
                  alt=""
                  className="block h-full w-full object-contain"
                  loading={i < 2 ? "eager" : "lazy"}
                />
              </div>

              {/* Number badge */}
              <span className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 font-sans text-[12px] font-bold text-brand-deep backdrop-blur">
                {String(i + 1).padStart(2, "0")} / {String(features.length).padStart(2, "0")}
              </span>

              <FeatureDetails feature={feature} open size="lg" />
            </button>
          );
        })}
      </div>

      {/* Progress dots: the current one fills while its card is in focus. */}
      <div className="flex items-center justify-center gap-[6px]">
        {features.map((feature, i) => (
          <button
            key={feature.title}
            type="button"
            aria-label={`Show ${feature.title}`}
            onClick={() => goTo(i)}
            className={clsx(
              "relative h-[6px] cursor-pointer overflow-hidden rounded-full border-0 p-0 [transition:width_0.35s_ease]",
              i === index ? "w-8 bg-mint-200" : "w-[6px] bg-mint-200",
            )}
          >
            {i === index && (
              <span
                key={index}
                className="absolute inset-0 origin-left animate-showcase-progress rounded-full bg-brand motion-reduce:animate-none"
                style={{
                  animationDuration: `${CARD_MS}ms`,
                  animationPlayState: playing ? "running" : "paused",
                }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
