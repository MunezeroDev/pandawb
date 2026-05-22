import { useRef, useState, useEffect } from "react";
import applePng from "../assets/apple-logo.png";

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
`;

/* ─── Notice configuration ─────────────────────────────────────────────── */
const NOTICES = {
  ios: {
    icon: <img src={applePng} width="42" height="42" alt="iOS" />,
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
  android: {
    // icon: (
    //   <svg
    //     xmlns="http://www.w3.org/2000/svg"
    //     height="48px"
    //     viewBox="0 -960 960 960"
    //     width="48px"
    //     fill="#0fa114"
    //   >
    //     <path d="M40-240q9-107 65.5-197T256-580l-74-128q-6-9-3-19t13-15q8-5 18-2t16 12l74 128q86-36 180-36t180 36l74-128q6-9 16-12t18 2q10 5 13 15t-3 19l-74 128q94 53 150.5 143T920-240H40Zm275.5-124.5Q330-379 330-400t-14.5-35.5Q301-450 280-450t-35.5 14.5Q230-421 230-400t14.5 35.5Q259-350 280-350t35.5-14.5Zm400 0Q730-379 730-400t-14.5-35.5Q701-450 680-450t-35.5 14.5Q630-421 630-400t14.5 35.5Q659-350 680-350t35.5-14.5Z" />
    //   </svg>
    // ),
    title: "Before you install",
    bullets: [
      "This file is safe. Panda is just not on the Play Store yet.",
      'You may need to allow "Install unknown apps" or "Allow from this source" when prompted.',
      "Your browser will handle the download.",
    ],
    autoDismiss: false,
    dismissAfter: null,
  },
};

/* ─── Overlay / Popup ──────────────────────────────────────────────────── */
function NoticeOverlay({ notice, onClose, onAndroidConfirm, scopeRect }) {
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
      onClick={ready ? onClose : undefined}
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

        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        padding: "20px",
      }}
    >
      <div
        className="dl-popup"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#ffffff",
          borderRadius: "22px",
          padding: "32px 28px",
          maxWidth: "320px",
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
        {/* Green top bar */}
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

        {/* Emoji icon */}
        <div
          style={{
            fontSize: "2.6rem",
            marginTop: "10px",
            marginBottom: "14px",
          }}
        >
          {/* {cfg.emoji} */}
          {cfg.icon ?? cfg.emoji}
        </div>

        {/* Title */}
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
          {cfg.title}
        </p>

        {/* Body text — ios, desktop, server */}
        {cfg.body && (
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

        {/* Bullet list — android */}
        {notice === "android" && (
          <ul
            style={{
              margin: "16px 0 0",
              paddingLeft: "18px",
              fontSize: "0.875rem",
              color: "#1a3c2a",
              lineHeight: 1.9,
              textAlign: "left",
            }}
          >
            {cfg.bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        )}

        {/* Got it button — android */}
        {notice === "android" && (
          <button
            onClick={() => {
              onClose();
              onAndroidConfirm();
            }}
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
            Got it
          </button>
        )}
      </div>
    </div>
  );
}

/* ─── Main component ───────────────────────────────────────────────────── */
export default function DownloadButton({ scopeRef }) {
  const rippleRef = useRef(null);
  const timerRef = useRef(null);
  const [notice, setNotice] = useState(null);
  const [scopeRect, setScopeRect] = useState(null);

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
    setNotice(type);

    const cfg = NOTICES[type];
    if (cfg.autoDismiss) {
      timerRef.current = setTimeout(() => setNotice(null), cfg.dismissAfter);
    }
  };

  const closeNotice = () => {
    clearTimeout(timerRef.current);
    setNotice(null);
  };

  const triggerRipple = () => {
    const el = rippleRef.current;
    if (!el) return;
    el.classList.remove("active");
    void el.offsetWidth;
    el.classList.add("active");
  };

  /* ─── Hand download straight to the browser ─────────────────────────── */
  const triggerDownload = () => {
    const APK_URL =
      "https://qzhmm6zmlofstw5b.public.blob.vercel-storage.com/panda.apk";
    const a = document.createElement("a");
    a.href = APK_URL;
    a.download = "panda.apk";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  /* ─── Button click — device detection only ──────────────────────────── */
  const handleDownload = () => {
    const ua = navigator.userAgent;

    if (/iPhone|iPod/i.test(ua)) {
      openNotice("ios");
      return;
    }

    const isDesktop =
      /Win/i.test(ua) ||
      (/Macintosh/i.test(ua) && !/iPhone|iPad/i.test(ua)) ||
      (/Linux/i.test(ua) && !/Android/i.test(ua));

    const isTablet =
      /iPad/i.test(ua) || (/Android/i.test(ua) && !/mobile/i.test(ua));

    if (isDesktop || isTablet) {
      openNotice("desktop");
      return;
    }

    openNotice("android");
  };

  return (
    <>
      <style>{css}</style>
      <NoticeOverlay
        notice={notice}
        onClose={closeNotice}
        onAndroidConfirm={triggerDownload}
        scopeRect={scopeRect}
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
