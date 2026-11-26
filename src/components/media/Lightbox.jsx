import { useEffect } from "react";
import clsx from "clsx";

function NavButton({ side, direction, label, onMove }) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onMove(direction);
      }}
      aria-label={label}
      className={clsx(
        "absolute top-1/2 h-11 w-11 -translate-y-1/2 cursor-pointer rounded-[50%] border-none bg-[rgba(255,255,255,0.16)] text-[22px] text-white",
        side === "left" ? "left-3" : "right-3",
      )}
    >
      {direction > 0 ? "›" : "‹"}
    </button>
  );
}

/**
 * Full-screen viewer. `state` is `{ items, i }` or null when closed.
 * Esc closes, arrow keys move; page scroll is locked while open.
 */
export default function Lightbox({ state, onClose, onMove }) {
  useEffect(() => {
    if (!state) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onMove(1);
      if (e.key === "ArrowLeft") onMove(-1);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [state, onClose, onMove]);

  if (!state) return null;
  const item = state.items[state.i];
  const hasMany = state.items.length > 1;

  return (
    <div
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[300] flex items-center justify-center bg-[rgba(4,20,12,0.94)] px-16 py-14"
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute top-[14px] right-[14px] h-10 w-10 cursor-pointer rounded-[50%] border-none bg-brand text-[20px] text-white"
      >
        ✕
      </button>

      <div
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-full max-w-full"
      >
        {!item.src ? (
          <p className="font-display text-[18px] text-white italic">
            {item.type === "video"
              ? "This video is coming soon."
              : "This photo is coming soon."}
          </p>
        ) : item.type === "video" ? (
          <video
            key={item.src}
            src={item.src}
            poster={item.poster ?? undefined}
            controls
            autoPlay
            playsInline
            className="max-h-[80vh] max-w-full rounded-[14px] bg-black"
          />
        ) : (
          <img
            src={item.src}
            alt=""
            className="max-h-[80vh] max-w-full rounded-[14px] object-contain"
          />
        )}
      </div>

      {hasMany && (
        <NavButton side="left" direction={-1} label="Previous" onMove={onMove} />
      )}
      {hasMany && (
        <NavButton side="right" direction={1} label="Next" onMove={onMove} />
      )}

      <span className="absolute right-0 bottom-4 left-0 text-center font-display text-[14px] text-[rgba(255,255,255,0.75)]">
        {state.i + 1} / {state.items.length}
      </span>
    </div>
  );
}
