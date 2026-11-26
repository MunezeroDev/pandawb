import { TILE_TINTS } from "../../data/events";

const tileGradient = (index) =>
  `linear-gradient(135deg, ${TILE_TINTS[index % TILE_TINTS.length]}, ${
    TILE_TINTS[(index + 2) % TILE_TINTS.length]
  })`;

/** One square in the gallery: photo, video preview, or a "coming soon" placeholder. */
export default function MediaTile({ item, index, onClick }) {
  const isVideo = item.type === "video";

  return (
    <button
      onClick={onClick}
      aria-label={isVideo ? "Play video" : "Open photo"}
      className="relative block aspect-square w-full cursor-pointer overflow-hidden rounded-[14px] border-none p-0"
      style={{ background: isVideo && !item.src ? "#0a0f1a" : tileGradient(index) }}
    >
      {item.src && !isVideo && (
        <img
          src={item.src}
          alt=""
          loading="lazy"
          className="block h-full w-full object-cover"
        />
      )}
      {item.src && isVideo && (
        <video
          src={`${item.src}#t=0.5`}
          preload="metadata"
          muted
          playsInline
          className="block h-full w-full object-cover"
        />
      )}
      {!item.src && (
        <span className="absolute inset-0 flex flex-col items-center justify-center gap-1 font-display text-[12px] text-[rgba(255,255,255,0.9)] italic">
          <span className="text-[22px]">{isVideo ? "🎬" : "🌳"}</span>
          {isVideo ? "Video coming soon" : "Photo coming soon"}
        </span>
      )}

      {isVideo && (
        <span className="absolute bottom-[10px] left-[10px] flex items-center gap-2 rounded-[50px] bg-[rgba(0,0,0,0.55)] py-[5px] pr-[10px] pl-[5px] font-display text-[12px] text-white">
          <span className="flex h-5 w-5 items-center justify-center rounded-[50%] bg-brand">
            <span className="ml-[2px] border-y-[5px] border-l-[8px] border-y-transparent border-l-white" />
          </span>
          Watch
        </span>
      )}
    </button>
  );
}
