import { useRef, useState } from "react";
import DownloadNotice from "./DownloadNotice";
import { DOWNLOAD_NOTICES } from "../../data/downloadNotices";
import { APK_URL } from "../../constants/links";
import { detectPlatform, downloadFile } from "../../utils/device";

/**
 * "Download The App" button. Shows a platform-specific notice first; on
 * Android, confirming the notice downloads the APK. `scopeRef` limits the
 * notice backdrop to that element's area.
 */
export default function DownloadButton({ scopeRef }) {
  const rippleRef = useRef(null);
  const dismissTimerRef = useRef(null);
  const [notice, setNotice] = useState(null);
  const [scopeRect, setScopeRect] = useState(null);

  const openNotice = (type) => {
    const scope = scopeRef?.current;
    if (scope) {
      const { top, left, width, height } = scope.getBoundingClientRect();
      setScopeRect({ top, left, width, height });
    } else {
      setScopeRect(null);
    }

    clearTimeout(dismissTimerRef.current);
    setNotice(type);

    const { dismissAfter } = DOWNLOAD_NOTICES[type];
    if (dismissAfter) {
      dismissTimerRef.current = setTimeout(() => setNotice(null), dismissAfter);
    }
  };

  const closeNotice = () => {
    clearTimeout(dismissTimerRef.current);
    setNotice(null);
  };

  // Restart the CSS ripple animation on every click.
  const playRipple = () => {
    const el = rippleRef.current;
    if (!el) return;
    el.classList.remove("is-active");
    void el.offsetWidth;
    el.classList.add("is-active");
  };

  return (
    <>
      {notice && (
        <DownloadNotice
          key={notice}
          type={notice}
          scopeRect={scopeRect}
          onClose={closeNotice}
          onConfirm={() => downloadFile(APK_URL, "panda.apk")}
        />
      )}

      <div className="flex flex-col items-center">
        <button
          onClick={() => {
            playRipple();
            openNotice(detectPlatform());
          }}
          className="relative mb-[2rem] inline-flex cursor-pointer items-center gap-[10px] overflow-hidden rounded-[999px] border-none bg-brand px-7 py-[13px] font-display text-[1rem] font-bold tracking-[0.4px] whitespace-nowrap text-white shadow-[0_5px_0px_var(--color-brand-shadow),0_8px_20px_rgba(0,191,99,0.28)] select-none [-webkit-tap-highlight-color:transparent] [transition:transform_0.18s_cubic-bezier(0.34,1.56,0.64,1),background_0.18s_ease,box-shadow_0.18s_ease] hover:brightness-110 hover:shadow-[0_7px_0px_var(--color-brand-shadow),0_12px_28px_rgba(0,191,99,0.32)] hover:[transform:translateY(-2px)] active:brightness-95 active:shadow-[0_2px_0px_var(--color-brand-shadow),0_4px_10px_rgba(0,191,99,0.2)] active:[transform:translateY(3px)]"
        >
          <span ref={rippleRef} className="ripple" />
          <span>Download The App</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#ffffff"
            className="shrink-0 animate-bounce-icon"
            aria-hidden="true"
          >
            <path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" />
          </svg>
        </button>
      </div>
    </>
  );
}
