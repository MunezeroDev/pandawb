import { useEffect, useState } from "react";
import clsx from "clsx";
import { DOWNLOAD_NOTICES } from "../../data/downloadNotices";

// Ignore backdrop clicks right after opening so the tap that opened the
// notice can't immediately close it.
const BACKDROP_CLICK_DELAY_MS = 350;

/**
 * Blurred backdrop + popup card. When `scopeRect` is given, the backdrop
 * only covers that area of the screen instead of the whole viewport.
 */
export default function DownloadNotice({ type, scopeRect, onClose, onConfirm }) {
  const [ready, setReady] = useState(false);
  const notice = DOWNLOAD_NOTICES[type];

  useEffect(() => {
    const t = setTimeout(() => setReady(true), BACKDROP_CLICK_DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      onClick={ready ? onClose : undefined}
      className={clsx(
        "fixed z-[9999] flex animate-backdrop-in items-center justify-center p-5 backdrop-blur-[6px]",
        !scopeRect && "inset-0",
      )}
      style={
        scopeRect ? {
          top: scopeRect.top,
          left: scopeRect.left,
          width: scopeRect.width,
          height: scopeRect.height,
        } : undefined
      }
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={clsx(
          "relative w-full max-w-[320px] animate-popup-in overflow-y-auto rounded-[22px] bg-white px-7 py-8 text-center font-display shadow-[0_24px_64px_rgba(0,0,0,0.22),0_2px_8px_rgba(0,191,99,0.1)]",
          scopeRect ? "max-h-[90%]" : "max-h-[90vh]",
        )}
      >
        <div className="absolute top-0 right-0 left-0 h-[5px] rounded-t-[22px] bg-[linear-gradient(90deg,#00bf63,#00d46e)]" />

        <div className="mt-[10px] mb-[14px] text-[2.6rem]">
          {notice.iconSrc ? (
            <img src={notice.iconSrc} width="42" height="42" alt={notice.iconAlt} />
          ) : (
            notice.emoji
          )}
        </div>

        <p className="mb-[10px] text-[1rem] leading-[1.4] font-bold tracking-[0.2px] text-notice-title">
          {notice.title}
        </p>

        {notice.body && (
          <p className="text-[0.875rem] leading-[1.6] text-notice-body">
            {notice.body}
          </p>
        )}

        {notice.bullets && (
          <ul className="mt-4 pl-[18px] text-left text-[0.875rem] leading-[1.9] text-notice-list">
            {notice.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        )}

        {notice.requiresConfirm && (
          <button
            onClick={() => {
              onClose();
              onConfirm();
            }}
            className="mt-[22px] block w-full cursor-pointer rounded-[999px] border-none bg-brand p-3 font-display text-[0.9rem] font-bold tracking-[0.3px] text-white"
          >
            Got it
          </button>
        )}
      </div>
    </div>
  );
}
