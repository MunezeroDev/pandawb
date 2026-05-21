import { useRef, useState, useEffect } from "react";

/* ─── Keyframes & base styles ─────────────────────────────────────────── */
const css = `
  @keyframes bounce-icon {
    0%, 100% { transform: translateY(0); }
    50%       { transform: translateY(5px); }
  }
  @keyframes ripple-out {
    from { width: 0; height: 0; opacity: 1; }
    to   { width: 220px; height: 220px; opacity: 0; }
  }
  @keyframes popup-slide-in {
    from { opacity: 0; transform: translateY(20px) scale(0.96); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }
  @keyframes backdrop-fade-in {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes toast-in {
    from { opacity: 0; transform: translateY(-16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes toast-out {
    from { opacity: 1; transform: translateY(0); }
    to   { opacity: 0; transform: translateY(-16px); }
  }
  .dl-ripple {
    position: absolute; border-radius: 50%;
    background: rgba(255,255,255,0.22);
    width: 0; height: 0;
    top: 50%; left: 50%;
    transform: translate(-50%,-50%);
    pointer-events: none;
  }
  .dl-ripple.active { animation: ripple-out 0.5s ease-out forwards; }
  .dl-backdrop      { animation: backdrop-fade-in 0.2s ease forwards; }
  .dl-popup         { animation: popup-slide-in 0.32s cubic-bezier(0.34,1.56,0.64,1) forwards; }
  .dl-toast     { animation: toast-in 0.32s cubic-bezier(0.34,1.56,0.64,1) forwards; }
  .dl-toast-out { animation: toast-out 0.28s ease-in forwards; }
`;

/* ─── Notice configuration ─────────────────────────────────────────────── */
const NOTICES = {
  ios: {
    // TODO: replace with Svg for apple
    emoji: "🍎",
    title: "Panda is currently not available on iOS.",
    body: "We're currently developing the iOS version. Stay tuned for updates.",
    autoDismiss: true,
    dismissAfter: 5000,
  },
  desktop: {
    emoji: "💻",
    title: "Panda is designed for mobile devices.",
    body: "A desktop version will be available soon.",
    autoDismiss: true,
    dismissAfter: 5000,
  },
  server: {
    emoji: "⚠️",
    title: "Seems like our servers are down.",
    body: "Try again in a minute.",
    autoDismiss: true,
    dismissAfter: 5000,
  },
  success: {
    emoji: "✅",
    title: "Download Started!",
    body: null, // guide rendered separately
    autoDismiss: false, // stays until user dismisses
    dismissAfter: null,
  },
};

/* ─── Overlay / Popup ──────────────────────────────────────────────────── */
function NoticeOverlay({
  notice,
  onClose,
  scopeRect,
  successStage,
  bannerLeaving,
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!notice) {
      setReady(false);
      return;
    }
    const t = setTimeout(() => setReady(true), 350);
    return () => clearTimeout(t);
  }, [notice]);

  if (!notice) return null;
  const cfg = NOTICES[notice];

  return (
    <div
      className="dl-backdrop"
      onClick={ready && successStage === "guide" ? onClose : undefined}
      style={{
        ...(scopeRect
          ? {
              position: "fixed",
              top: scopeRect.top,
              left: scopeRect.left,
              width: scopeRect.width,
              height: scopeRect.height,
            }
          : { position: "fixed", inset: 0 }),
        // background: "rgba(10, 30, 18, 0.82)",
        background:
          successStage === "banner" ? "transparent" : "rgba(10, 30, 18, 0.82)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        padding: "20px",
      }}
    >
      {notice === "success" && successStage === "banner" ? (
        /* ── Phase 1: Banner ── */
        <div
          style={{
            position: "fixed",
            top: "16px",
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            zIndex: 9999,
            pointerEvents: "none",
          }}
        >
          <div
            className={bannerLeaving ? "dl-toast-out" : "dl-toast"}
            style={{
              pointerEvents: "auto",
              background: "#ffffff",
              borderRadius: "14px",
              padding: "12px 20px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              boxShadow:
                "0 4px 24px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.08)",
              border: "1px solid #c8f0dc",
              borderLeft: "4px solid #00bf63",
              minWidth: "260px",
              maxWidth: "340px",
            }}
          >
            <span style={{ fontSize: "1.4rem" }}>✅</span>
            <div>
              <p
                style={{
                  margin: 0,
                  fontWeight: "700",
                  color: "#0f2d1c",
                  fontSize: "0.95rem",
                  fontFamily: "'Georgia', serif",
                }}
              >
                Download Started!
              </p>
              <p
                style={{
                  margin: 0,
                  color: "#3d6b4f",
                  fontSize: "0.78rem",
                  marginTop: "2px",
                  fontFamily: "'Georgia', serif",
                }}
              >
                Your APK is downloading…
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* ── Phase 2: Guide + all other notices ── */
        <div
          className="dl-popup"
          onClick={(e) => e.stopPropagation()}
          style={{
            background: "#ffffff",
            borderRadius: "22px",
            padding: notice === "success" ? "28px 24px 32px" : "32px 28px",
            maxWidth: notice === "success" ? "360px" : "320px",
            width: "100%",
            maxHeight: scopeRect ? "90%" : "90vh",
            overflowY: "auto",
            boxShadow:
              "0 24px 64px rgba(0,0,0,0.22), 0 2px 8px rgba(0,191,99,0.1)",
            position: "relative",
            textAlign: "center",
            fontFamily: "'Georgia', serif",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "5px",
              background: "linear-gradient(90deg, #00bf63, #00d46e)",
              borderRadius: "22px 22px 0 0",
            }}
          />

          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              position: "absolute",
              top: "14px",
              right: "16px",
              background: "#f0faf4",
              border: "none",
              borderRadius: "50%",
              width: "30px",
              height: "30px",
              cursor: "pointer",
              color: "#4a7c5f",
              fontSize: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              lineHeight: 1,
            }}
          >
            ✕
          </button>

          <div
            style={{
              fontSize: "2.6rem",
              marginTop: "10px",
              marginBottom: "14px",
            }}
          >
            {notice === "success" ? "📲" : cfg.emoji}
          </div>

          <p
            style={{
              margin: "0 0 10px",
              fontSize: "1rem",
              fontWeight: "700",
              color: "#0f2d1c",
              letterSpacing: "0.2px",
              lineHeight: 1.4,
            }}
          >
            {notice === "success" ? "How to Install" : cfg.title}
          </p>

          {cfg.body && notice !== "success" && (
            <p
              style={{
                margin: 0,
                fontSize: "0.875rem",
                color: "#3d6b4f",
                lineHeight: 1.6,
              }}
            >
              {cfg.body}
            </p>
          )}

          {notice === "success" && (
            <div style={{ textAlign: "left", marginTop: "22px" }}>
              <ol
                style={{
                  margin: 0,
                  paddingLeft: "18px",
                  fontSize: "0.85rem",
                  color: "#1a3c2a",
                  lineHeight: "1.9",
                }}
              >
                <li>
                  Open <strong>Downloads</strong>
                </li>
                <li>
                  Tap the <strong>.apk</strong> file
                </li>
                <li>
                  Tap <strong>Install</strong>
                </li>
                <li>
                  If blocked or unable to install:
                  <ol
                    style={{
                      paddingLeft: "16px",
                      marginTop: "4px",
                      listStyleType: "lower-alpha",
                    }}
                  >
                    <li>
                      Tap <strong>Settings</strong>
                    </li>
                    <li>
                      Turn on <em>"Allow from this source"</em> or{" "}
                      <em>"Install unknown apps"</em>
                    </li>
                  </ol>
                </li>
                <li>
                  Go back to <strong>Downloads</strong>
                </li>
                <li>
                  Tap <strong>Install</strong> again
                </li>
              </ol>
              <button
                onClick={onClose}
                style={{
                  display: "block",
                  width: "100%",
                  marginTop: "22px",
                  padding: "12px",
                  background: "#00bf63",
                  color: "#fff",
                  border: "none",
                  borderRadius: "999px",
                  fontFamily: "'Georgia', serif",
                  fontWeight: "700",
                  fontSize: "0.9rem",
                  cursor: "pointer",
                  letterSpacing: "0.3px",
                }}
              >
                Got it!
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ─── Main component ───────────────────────────────────────────────────── */
export default function DownloadButton({ scopeRef }) {
  const rippleRef = useRef(null);
  const timerRef = useRef(null);
  const guideTimerRef = useRef(null);
  const [notice, setNotice] = useState(null);
  const [scopeRect, setScopeRect] = useState(null);
  const [successStage, setSuccessStage] = useState("banner");
  const [bannerLeaving, setBannerLeaving] = useState(false);

  /* Open a notice; auto-dismiss notices clear themselves */
  const openNotice = (type) => {
    if (scopeRef?.current) {
      const r = scopeRef.current.getBoundingClientRect();
      setScopeRect({
        top: r.top,
        left: r.left,
        width: r.width,
        height: r.height,
      });
    } else {
      setScopeRect(null);
    }

    clearTimeout(timerRef.current);
    clearTimeout(guideTimerRef.current);

    if (type === "success") {
      setSuccessStage("banner");
      setBannerLeaving(false);
      setNotice("success");
      timerRef.current = setTimeout(() => setBannerLeaving(true), 1700);
      guideTimerRef.current = setTimeout(() => {
        setBannerLeaving(false);
        setSuccessStage("guide");
      }, 1100);
      // 2100);
      return;
    }

    setNotice(type);
    const cfg = NOTICES[type];
    if (cfg.autoDismiss) {
      timerRef.current = setTimeout(() => setNotice(null), cfg.dismissAfter);
    }
  };
  const closeNotice = () => {
    clearTimeout(timerRef.current);
    clearTimeout(guideTimerRef.current);
    setNotice(null);
    setSuccessStage("banner");
    setBannerLeaving(false);
  };

  const triggerRipple = () => {
    const el = rippleRef.current;
    if (!el) return;
    el.classList.remove("active");
    void el.offsetWidth;
    el.classList.add("active");
  };

  const handleDownload = async () => {
    const ua = navigator.userAgent;

    /* iOS phone */
    if (/iPhone|iPod/i.test(ua)) {
      openNotice("ios");
      return;
    }

    /* Desktop (Windows, Mac, Linux non-Android) */
    const isDesktop =
      /Win/i.test(ua) ||
      (/Macintosh/i.test(ua) && !/iPhone|iPad/i.test(ua)) ||
      (/Linux/i.test(ua) && !/Android/i.test(ua));

    /* iPad or Android tablet */
    const isTablet =
      /iPad/i.test(ua) || (/Android/i.test(ua) && !/mobile/i.test(ua));

    if (isDesktop || isTablet) {
      openNotice("desktop");
      return;
    }

    /* Android phone — ping server first */
    try {
      const res = await fetch("YOUR_EXPRESS_DOWNLOAD_ENDPOINT", {
        method: "HEAD",
        signal: AbortSignal.timeout(5000),
      });
      if (!res.ok) {
        openNotice("server");
        return;
      }
    } catch {
      openNotice("server");
      return;
    }

    /* All clear — start download */
    openNotice("success");
    // FIX: WHEN URL IS READY OPEN
    // window.location.href = "YOUR_EXPRESS_DOWNLOAD_ENDPOINT";
  };

  return (
    <>
      <style>{css}</style>
      <NoticeOverlay
        notice={notice}
        onClose={closeNotice}
        scopeRect={scopeRect}
        successStage={successStage}
        bannerLeaving={bannerLeaving}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <button
          onClick={() => {
            triggerRipple();
            handleDownload();
          }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            background: "#00bf63",
            color: "#fff",
            border: "none",
            borderRadius: "999px",
            padding: "13px 28px",
            fontFamily: "'Georgia', serif",
            fontSize: "1rem",
            fontWeight: "700",
            letterSpacing: "0.4px",
            cursor: "pointer",
            position: "relative",
            overflow: "hidden",
            whiteSpace: "nowrap",
            boxShadow: "0 5px 0px #007a3d, 0 8px 20px rgba(0,191,99,0.28)",
            transition:
              "transform 0.18s cubic-bezier(0.34,1.56,0.64,1), background 0.18s ease, box-shadow 0.18s ease",
            marginBottom: "2rem",
            userSelect: "none",
            WebkitUserSelect: "none",
            WebkitTapHighlightColor: "transparent",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.background = "#00d46e";
            e.currentTarget.style.boxShadow =
              "0 7px 0px #007a3d, 0 12px 28px rgba(0,191,99,0.32)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.background = "#00bf63";
            e.currentTarget.style.boxShadow =
              "0 5px 0px #007a3d, 0 8px 20px rgba(0,191,99,0.28)";
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = "translateY(3px)";
            e.currentTarget.style.boxShadow =
              "0 2px 0px #007a3d, 0 4px 10px rgba(0,191,99,0.2)";
            e.currentTarget.style.background = "#00a854";
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.background = "#00d46e";
            e.currentTarget.style.boxShadow =
              "0 7px 0px #007a3d, 0 12px 28px rgba(0,191,99,0.32)";
          }}
        >
          <span ref={rippleRef} className="dl-ripple" />
          <span>Download The App</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#ffffff"
            style={{
              animation: "bounce-icon 1.6s ease-in-out infinite",
              flexShrink: 0,
            }}
          >
            <path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" />
          </svg>
        </button>
      </div>
    </>
  );
}
