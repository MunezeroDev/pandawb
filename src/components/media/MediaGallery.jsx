import { useState } from "react";
import MediaTile from "./MediaTile";

/** Grid of media tiles that reveals more in pages of 8 (mobile) / 12 (desktop). */
export default function MediaGallery({ items, isMobile, onOpen }) {
  const pageSize = isMobile ? 8 : 12;
  const [count, setCount] = useState(pageSize);

  const shown = items.slice(0, count);
  const remaining = items.length - shown.length;
  const videoCount = items.filter((i) => i.type === "video").length;

  return (
    <div className="mt-7">
      <p className="mb-[14px] text-[16px] text-muted">
        {videoCount > 0
          ? `${videoCount} video${videoCount > 1 ? "s" : ""} and `
          : ""}
        {items.length - videoCount} photos
      </p>

      <div className="grid grid-cols-[repeat(2,1fr)] gap-[10px] md:grid-cols-[repeat(4,1fr)] md:gap-4">
        {shown.map((item, i) => (
          <MediaTile
            key={i}
            item={item}
            index={i}
            onClick={() => onOpen(items, i)}
          />
        ))}
      </div>

      {remaining > 0 && (
        <div className="mt-6 text-center">
          <button
            onClick={() => setCount((c) => c + pageSize)}
            className="cursor-pointer rounded-[50px] border-[1.5px] border-brand bg-white px-7 py-[11px] font-display text-[15px] font-bold text-brand"
          >
            Show more ({remaining} left)
          </button>
        </div>
      )}
    </div>
  );
}
