import clsx from "clsx";
import { TILE_TINTS } from "../../data/events";

const tileGradient = (index) =>
  `linear-gradient(135deg, ${TILE_TINTS[index % TILE_TINTS.length]}, ${
    TILE_TINTS[(index + 2) % TILE_TINTS.length]
  })`;

/** A photo filling its tile; collage tiles are already shaped like their photos. */
const Photo = ({ src }) => (
  <img src={src} alt="" loading="lazy" className="block h-full w-full object-cover" />
);

/** An app screenshot inside a phone frame. */
export const PhoneFrame = ({ src, className = "" }) => (
  <span
    className={clsx(
      "block aspect-[9/19.5] overflow-hidden rounded-[22px] border-[5px] border-ink bg-ink shadow-[0_12px_28px_rgba(0,0,0,0.22)]",
      className,
    )}
  >
    <img src={src} alt="" loading="lazy" className="block h-full w-full object-cover object-top" />
  </span>
);

/** Playful play button: a wobbling green blob. */
const PlayBlob = () => (
  <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
    <span className="relative motion-safe:animate-play-wobble">
      <span className="flex h-[60px] w-[60px] items-center justify-center rounded-[46%_54%_52%_48%] border-4 border-white bg-brand shadow-[0_5px_0_var(--color-brand-shadow),0_10px_24px_rgba(0,0,0,0.35)] [transition:transform_0.25s_cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-115 md:h-[72px] md:w-[72px]">
        <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7 md:h-8 md:w-8" aria-hidden="true">
          <path
            d="M7 4.8v14.4c0 .9 1 1.4 1.7.9l10.4-7.2c.6-.4.6-1.3 0-1.8L8.7 3.9C8 3.4 7 3.9 7 4.8z"
            fill="white"
            stroke="white"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </span>
  </span>
);

/**
 * One gallery tile (square unless `className` sets another shape): a photo,
 * an app screenshot in a phone frame, a video (its poster plus a play
 * button), or a "coming soon" placeholder.
 */
export default function MediaTile({ item, index, onClick, className = "aspect-square" }) {
  const isVideo = item.type === "video";
  const still = isVideo ? item.poster : item.src;
  const isScreen = item.kind === "screen" && still;

  return (
    <button
      onClick={onClick}
      aria-label={isVideo ? "Play video" : "Open photo"}
      className={clsx(
        "group relative block w-full cursor-pointer overflow-hidden rounded-[14px] border-none p-0",
        isScreen && "flex items-center justify-center bg-gradient-to-br from-mint-200 to-mint-50",
        className,
      )}
      style={
        still ? undefined : { background: isVideo ? "#0a0f1a" : tileGradient(index) }
      }
    >
      {isScreen && <PhoneFrame src={still} className="h-[92%] max-w-[92%]" />}
      {still && !isScreen && <Photo src={still} />}
      {isVideo && !still && item.src && (
        <video
          src={`${item.src}#t=0.5`}
          preload="metadata"
          muted
          playsInline
          className="block h-full w-full object-cover"
        />
      )}
      {!still && !item.src && (
        <span className="absolute inset-0 flex flex-col items-center justify-center gap-1 font-display text-[12px] text-[rgba(255,255,255,0.9)] italic">
          <span className="text-[22px]">{isVideo ? "🎬" : "🌳"}</span>
          {isVideo ? "Video coming soon" : "Photo coming soon"}
        </span>
      )}

      {isVideo && <PlayBlob />}
    </button>
  );
}
