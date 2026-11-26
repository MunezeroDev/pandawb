import { PhoneFrame } from "./MediaTile";

/** Per-column stagger and tilt, so the wall reads like a pinned board. */
const COLUMN_STYLE = [
  "mt-0 -rotate-2",
  "mt-10 rotate-1",
  "mt-4 -rotate-1",
  "mt-14 rotate-2",
];
const STICKER_TILT = ["rotate-3", "-rotate-3", "rotate-2", "-rotate-2"];

/**
 * "What's New!" slide: app screenshots as a staggered, slightly tilted wall of
 * phones, each with a caption sticker. Phones lift and straighten on hover.
 */
export default function PhoneWall({ items, offset, onOpen }) {
  return (
    <div className="flex h-full w-full items-start justify-center gap-4 px-1 pt-2 md:gap-8">
      {items.map((item, i) => (
        <button
          key={offset + i}
          type="button"
          aria-label={item.caption ? `Open screenshot: ${item.caption}` : "Open screenshot"}
          onClick={() => onOpen(offset + i)}
          className={`group relative flex h-[82%] min-w-0 cursor-pointer flex-col items-center border-none bg-transparent p-0 [transition:transform_0.3s_cubic-bezier(0.34,1.56,0.64,1)] hover:rotate-0 motion-safe:hover:-translate-y-2 motion-reduce:rotate-0 ${COLUMN_STYLE[i % COLUMN_STYLE.length]}`}
        >
          <PhoneFrame src={item.src} className="h-full max-w-full" />
          {item.caption && (
            <span
              className={`absolute -bottom-4 left-1/2 max-w-[115%] -translate-x-1/2 rounded-full bg-brand px-3 py-[6px] font-display text-[12px] leading-tight font-bold text-white shadow-[0_4px_0_var(--color-brand-shadow)] md:text-[14px] ${STICKER_TILT[i % STICKER_TILT.length]}`}
            >
              <span className="mr-1">{item.emoji}</span>
              {item.caption}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
