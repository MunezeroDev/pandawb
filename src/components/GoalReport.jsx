import { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────────────────────────
   HOW TO ADD YOUR DROPBOX MEDIA
   Paste each Dropbox share link inside dbx("...").
   Replace the `null` slots in `videos` and `images` one by one.
   Anything still null shows a "coming soon" tile, so the section
   works today and fills in as you add links.
   ───────────────────────────────────────────────────────────── */
const dbx = (url) =>
  url
    ? url
        .replace(/[?&]dl=[01]/, "")
        .concat(url.includes("?") ? "&raw=1" : "?raw=1")
    : null;
const slots = (n) => Array(n).fill(null);

const goals = [
  {
    n: 1,
    when: "2025",
    tab: "2025",
    platform: "Panda Android App",
    title: "82 trees planted & 63 tracked on the Panda Android Mobile App",
    text: "Partnered with Whispers (a Kibera seedling farmer) and the BV Nairobi West hub for a real-world planting drive. Together we planted 82 trees and uploaded 63 onto Panda for live tracking.",
    partners: ["Whispers", "BV Nairobi West"],
    planted: 82,
    tracked: 63,
    videos: [null], // founder video, e.g. dbx("https://www.dropbox.com/...?dl=0")
    images: slots(20),
  },
  {
    n: 2,
    when: "July 2026",
    tab: "July 2026",
    platform: "Panda Android App v3",
    title: "98 trees planted on Panda Android App Version 3",
    text: "Partnered with Rotaract Eco-Warriors and JEMA (JKUAT Environmental) Club and planted 98 trees at JKUAT Primary School.",
    partners: ["Rotaract Eco-Warriors", "JEMA Club JKUAT"],
    planted: 98,
    tracked: 98,
    videos: [],
    images: slots(20),
  },
  {
    n: 3,
    when: "September 2026 · Mazingira Day",
    tab: "Sept 2026",
    platform: "Panda PWA",
    title: "87 trees planted and tracked on our new cross-platform PWA",
    text: "Planted and tracked 87 trees in collaboration with WhisperChampions, maida_cbo and the BV Nairobi Westlands Local Hub. This was our first cross-platform MVP, working for both Android and iPhone users.",
    partners: ["WhisperChampions", "maida_cbo", "BV Nairobi Westlands"],
    planted: 87,
    tracked: 87,
    videos: [null, null],
    images: slots(20),
  },
  {
    n: 4,
    when: "October 2026 · Mazingira Day",
    tab: "Oct 2026",
    platform: "Panda PWA",
    title: "213 trees planted and 118 tracked on the PWA",
    text: "Partnered with JEMA Club JKUAT, UCESCO JKUAT and about 6 more student clubs and organisations to plant 213 trees and track 118 in our most successful planting event yet. A big day with an MC and snacks to keep the planting fun and interactive.",
    partners: ["JEMA Club JKUAT", "UCESCO JKUAT", "+6 student clubs"],
    planted: 213,
    tracked: 118,
    videos: [null, null],
    images: slots(20),
  },
];

const newestFirst = [...goals].reverse();
const totalPlanted = goals.reduce((s, g) => s + g.planted, 0);
const totalTracked = goals.reduce((s, g) => s + g.tracked, 0);

const tints = [
  "#00bf63",
  "#2fd085",
  "#6ddba0",
  "#46cd6e",
  "#1fa968",
  "#8be3b4",
];

/* ── count-up that starts when scrolled into view ── */
function Counter({ to }) {
  const ref = useRef(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (t) => {
          const p = Math.min((t - t0) / 1400, 1);
          setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to]);
  return <span ref={ref}>{n}</span>;
}

/* ── one tile of the mosaic gallery ── */
function Tile({ item, index, big, extra, onClick }) {
  const bg = `linear-gradient(135deg, ${tints[index % tints.length]}, ${
    tints[(index + 2) % tints.length]
  })`;
  const isVideo = item.type === "video";
  return (
    <button
      onClick={onClick}
      aria-label={isVideo ? "Play video" : "Open photo"}
      style={{
        position: "relative",
        padding: 0,
        border: "none",
        cursor: "pointer",
        overflow: "hidden",
        borderRadius: "14px",
        background: isVideo && !item.src ? "#0a0f1a" : bg,
        aspectRatio: "1 / 1",
        width: "100%",
        display: "block",
      }}
    >
      {item.src && !isVideo && (
        <img
          src={item.src}
          alt=""
          loading="lazy"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      )}
      {item.src && isVideo && (
        <video
          src={`${item.src}#t=0.5`}
          preload="metadata"
          muted
          playsInline
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      )}
      {!item.src && (
        <span
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "4px",
            color: "rgba(255,255,255,0.9)",
            fontFamily: "'Georgia', serif",
            fontSize: big ? "15px" : "12px",
            fontStyle: "italic",
          }}
        >
          <span style={{ fontSize: big ? "34px" : "22px" }}>
            {isVideo ? "🎬" : "🌳"}
          </span>
          {isVideo ? "Video coming soon" : "Photo coming soon"}
        </span>
      )}

      {isVideo && (
        <span
          style={{
            position: "absolute",
            left: big ? "16px" : "10px",
            bottom: big ? "16px" : "10px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(0,0,0,0.55)",
            color: "#fff",
            borderRadius: "50px",
            padding: big ? "8px 16px 8px 8px" : "5px 10px 5px 5px",
            fontFamily: "'Georgia', serif",
            fontSize: big ? "14px" : "12px",
          }}
        >
          <span
            style={{
              width: big ? "30px" : "20px",
              height: big ? "30px" : "20px",
              borderRadius: "50%",
              background: "#00bf63",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                borderTop: "5px solid transparent",
                borderBottom: "5px solid transparent",
                borderLeft: "8px solid #fff",
                marginLeft: "2px",
              }}
            />
          </span>
          Watch
        </span>
      )}

      {extra > 0 && (
        <span
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,40,20,0.62)",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'Georgia', serif",
            fontSize: "clamp(22px, 3vw, 32px)",
            fontWeight: 700,
          }}
        >
          +{extra} more
        </span>
      )}
    </button>
  );
}

function Gallery({ items, isMobile, onOpen }) {
  const step = isMobile ? 8 : 12;
  const [count, setCount] = useState(step);
  const shown = items.slice(0, count);
  const left = items.length - shown.length;
  const nVideos = items.filter((i) => i.type === "video").length;

  return (
    <div style={{ marginTop: "28px" }}>
      <p style={{ margin: "0 0 14px", fontSize: "16px", color: "#555" }}>
        {nVideos > 0 ? `${nVideos} video${nVideos > 1 ? "s" : ""} and ` : ""}
        {items.length - nVideos} photos
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
          gap: isMobile ? "10px" : "16px",
        }}
      >
        {shown.map((item, i) => (
          <Tile
            key={i}
            item={item}
            index={i}
            onClick={() => onOpen(items, i)}
          />
        ))}
      </div>
      {left > 0 && (
        <div style={{ textAlign: "center", marginTop: "24px" }}>
          <button
            onClick={() => setCount((c) => c + step)}
            style={{
              background: "#fff",
              border: "1.5px solid #00bf63",
              color: "#00bf63",
              borderRadius: "50px",
              padding: "11px 28px",
              fontFamily: "'Georgia', serif",
              fontSize: "15px",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Show more ({left} left)
          </button>
        </div>
      )}
    </div>
  );
}

/* ── full-screen viewer for photos and videos ── */
function Lightbox({ state, onClose, onMove }) {
  useEffect(() => {
    if (!state) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onMove(1);
      if (e.key === "ArrowLeft") onMove(-1);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [state, onClose, onMove]);

  if (!state) return null;
  const item = state.items[state.i];

  const navBtn = (side, dir, label) => (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onMove(dir);
      }}
      aria-label={label}
      style={{
        position: "absolute",
        top: "50%",
        [side]: "12px",
        transform: "translateY(-50%)",
        width: "44px",
        height: "44px",
        borderRadius: "50%",
        border: "none",
        background: "rgba(255,255,255,0.16)",
        color: "#fff",
        fontSize: "22px",
        cursor: "pointer",
      }}
    >
      {dir > 0 ? "›" : "‹"}
    </button>
  );

  return (
    <div
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 300,
        background: "rgba(4,20,12,0.94)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "56px 64px",
        boxSizing: "border-box",
      }}
    >
      <button
        onClick={onClose}
        aria-label="Close"
        style={{
          position: "absolute",
          top: "14px",
          right: "14px",
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          border: "none",
          background: "#00bf63",
          color: "#fff",
          fontSize: "20px",
          cursor: "pointer",
        }}
      >
        ✕
      </button>

      <div
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: "100%", maxHeight: "100%", display: "flex" }}
      >
        {!item.src ? (
          <p
            style={{
              color: "#fff",
              fontFamily: "'Georgia', serif",
              fontStyle: "italic",
              fontSize: "18px",
            }}
          >
            {item.type === "video"
              ? "This video is coming soon."
              : "This photo is coming soon."}
          </p>
        ) : item.type === "video" ? (
          <video
            key={item.src}
            src={item.src}
            controls
            autoPlay
            playsInline
            style={{
              maxWidth: "100%",
              maxHeight: "80vh",
              borderRadius: "14px",
              background: "#000",
            }}
          />
        ) : (
          <img
            src={item.src}
            alt=""
            style={{
              maxWidth: "100%",
              maxHeight: "80vh",
              borderRadius: "14px",
              objectFit: "contain",
            }}
          />
        )}
      </div>

      {state.items.length > 1 && navBtn("left", -1, "Previous")}
      {state.items.length > 1 && navBtn("right", 1, "Next")}

      <span
        style={{
          position: "absolute",
          bottom: "16px",
          left: 0,
          right: 0,
          textAlign: "center",
          color: "rgba(255,255,255,0.75)",
          fontFamily: "'Georgia', serif",
          fontSize: "14px",
        }}
      >
        {state.i + 1} / {state.items.length}
      </span>
    </div>
  );
}

function Bar({ label, value, max, strong }) {
  const pct = Math.round((value / max) * 100);
  return (
    <div style={{ flex: 1, minWidth: "180px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontFamily: "'Georgia', serif",
          fontSize: "14px",
          color: "#555",
          marginBottom: "6px",
        }}
      >
        <span>{label}</span>
        <span style={{ color: "#1a1a1a", fontWeight: 700 }}>{value}</span>
      </div>
      <div
        style={{ height: "8px", borderRadius: "8px", background: "#d3ecdf" }}
      >
        <div
          style={{
            width: `${pct}%`,
            height: "100%",
            borderRadius: "8px",
            background: strong ? "#00bf63" : "#6ddba0",
          }}
        />
      </div>
    </div>
  );
}

function Pills({ tabs, tab, onChange, isMobile }) {
  return (
    <div
      role="tablist"
      style={{
        display: "flex",
        flexWrap: isMobile ? "nowrap" : "wrap",
        justifyContent: isMobile ? "flex-start" : "center",
        gap: "10px",
        overflowX: "auto",
        padding: "4px 4px 14px",
        scrollbarWidth: "none",
      }}
    >
      {tabs.map((t) => {
        const on = t === tab;
        return (
          <button
            key={t}
            role="tab"
            aria-selected={on}
            onClick={() => onChange(t)}
            style={{
              flexShrink: 0,
              whiteSpace: "nowrap",
              cursor: "pointer",
              fontFamily: "'Georgia', serif",
              fontSize: "15px",
              fontWeight: on ? 700 : 400,
              padding: "10px 22px",
              borderRadius: "50px",
              border: on ? "1px solid #00bf63" : "1px solid #e3ece7",
              background: on ? "#00bf63" : "#fff",
              color: on ? "#fff" : "#555",
              boxShadow: on ? "0 4px 14px rgba(0,191,99,0.35)" : "none",
              transition:
                "background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease",
            }}
          >
            {t}
          </button>
        );
      })}
    </div>
  );
}

function Story({ goal, isMobile }) {
  return (
    <div
      style={{
        background: "#f4fbf7",
        border: "1px solid #d3ecdf",
        borderRadius: "24px",
        padding: isMobile ? "22px 18px 24px" : "32px 38px 34px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <span style={{ fontSize: "17px", color: "#1a1a1a", fontWeight: 700 }}>
          {goal.when}
        </span>
        <span
          style={{
            marginLeft: isMobile ? 0 : "auto",
            border: "1px solid #b5e3cb",
            color: "#1fa968",
            fontStyle: "italic",
            fontSize: "13px",
            borderRadius: "50px",
            padding: "5px 14px",
          }}
        >
          {goal.platform}
        </span>
      </div>
      <h2
        style={{
          margin: "14px 0 12px",
          fontWeight: "normal",
          fontSize: isMobile
            ? "clamp(24px, 6.5vw, 30px)"
            : "clamp(28px, 3vw, 40px)",
          lineHeight: 1.12,
          letterSpacing: "-0.5px",
          color: "#1a1a1a",
          maxWidth: "26ch",
        }}
      >
        {goal.title}
      </h2>
      <p
        style={{
          margin: 0,
          fontSize: isMobile ? "16px" : "18px",
          lineHeight: 1.75,
          color: "#2c2c2c",
          maxWidth: "70ch",
        }}
      >
        {goal.text}
      </p>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
          margin: "18px 0 22px",
        }}
      >
        {goal.partners.map((p) => (
          <span
            key={p}
            style={{
              background: "#fff",
              border: "1px solid #d3ecdf",
              borderRadius: "50px",
              padding: "6px 14px",
              fontSize: "14px",
              color: "#1a1a1a",
            }}
          >
            {p}
          </span>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "18px 32px",
          maxWidth: "640px",
        }}
      >
        <Bar
          label="Trees planted"
          value={goal.planted}
          max={goal.planted}
          strong
        />
        <Bar
          label="Trees tracked on Panda"
          value={goal.tracked}
          max={goal.planted}
        />
      </div>
    </div>
  );
}

function Overview({ onPick, isMobile }) {
  return (
    <div
      style={{
        background: "#f4fbf7",
        border: "1px solid #d3ecdf",
        borderRadius: "24px",
        padding: isMobile ? "10px 16px" : "14px 34px",
      }}
    >
      {/* {goals.map((g, i) => ( */}
      {newestFirst.map((g, i) => (
        <button
          key={g.tab}
          onClick={() => onPick(g.tab)}
          style={{
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "baseline",
            justifyContent: "space-between",
            gap: "4px 16px",
            textAlign: "left",
            background: "none",
            border: "none",
            borderTop: i ? "1px solid #d3ecdf" : "none",
            padding: "16px 0",
            cursor: "pointer",
            fontFamily: "'Georgia', serif",
          }}
        >
          <span
            style={{ fontSize: isMobile ? "17px" : "20px", color: "#1a1a1a" }}
          >
            {g.when}
          </span>
          <span style={{ fontSize: "15px", color: "#555" }}>
            <b style={{ color: "#00bf63" }}>{g.planted}</b> planted ·{" "}
            <b style={{ color: "#1fa968" }}>{g.tracked}</b> tracked
          </span>
        </button>
      ))}
    </div>
  );
}

const mediaOf = (list) => [
  ...list.flatMap((g) =>
    g.videos.map((src) => ({ type: "video", src: dbx(src) })),
  ),
  ...list.flatMap((g) =>
    g.images.map((src) => ({ type: "image", src: dbx(src) })),
  ),
];

export default function GoalReport() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [lb, setLb] = useState(null);
  const [tab, setTab] = useState("All");

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const move = (d) =>
    setLb((s) => s && { ...s, i: (s.i + d + s.items.length) % s.items.length });

  //   const tabs = ["All", ...goals.map((g) => g.tab)];
  const tabs = ["All", ...newestFirst.map((g) => g.tab)];
  const active = goals.find((g) => g.tab === tab);

  return (
    <div
      id="goals"
      style={{
        fontFamily: "'Georgia', 'Times New Roman', serif",
        background: "#ffffff",
        minHeight: "80vh",
        padding: isMobile ? "25px 20px 48px" : "28px 52px 56px",
        marginLeft: isMobile ? "0" : "80px",
        boxSizing: "border-box",
      }}
    >
      <header
        style={{
          marginBottom: isMobile ? "28px" : "40px",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: isMobile
              ? "clamp(36px, 10vw, 56px)"
              : "clamp(32px, 6vw, 70px)",
            fontWeight: "normal",
            lineHeight: 1.05,
            margin: 0,
            letterSpacing: "-1px",
            color: "#1a1a1a",
          }}
        >
          <span style={{ color: "#00bf63", fontWeight: "700" }}>Panda</span>{" "}
          Goal Report
        </h1>
      </header>

      {/* Goal 1: total since Year 1 */}
      <section
        aria-label="Goal 1: total trees planted since Year 1"
        style={{
          background: "#00bf63",
          borderRadius: "24px",
          padding: isMobile ? "26px 20px" : "36px 44px",
          marginBottom: isMobile ? "24px" : "32px",
          color: "#fff",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "flex-start" : "center",
          gap: isMobile ? "20px" : "48px",
        }}
      >
        <div>
          <p
            style={{
              margin: 0,
              fontSize: isMobile ? "16px" : "18px",
              opacity: 0.95,
            }}
          >
            <b>Goal 1:</b> Total trees planted since Year 1
          </p>
          <p
            style={{
              margin: "4px 0 0",
              fontSize: isMobile ? "72px" : "clamp(84px, 9vw, 128px)",
              lineHeight: 1,
              fontWeight: 700,
              letterSpacing: "-3px",
            }}
          >
            <Counter to={totalPlanted} />
          </p>
        </div>
        <div
          style={{
            display: "flex",
            gap: isMobile ? "28px" : "44px",
            flexWrap: "wrap",
            marginLeft: isMobile ? 0 : "auto",
          }}
        >
          <div>
            <p
              style={{
                margin: 0,
                fontSize: "clamp(32px, 4vw, 48px)",
                fontWeight: 700,
              }}
            >
              <Counter to={totalTracked} />
            </p>
            <p style={{ margin: 0, fontSize: "15px", opacity: 0.9 }}>
              tracked on Panda
            </p>
          </div>
          <div>
            <p
              style={{
                margin: 0,
                fontSize: "clamp(32px, 4vw, 48px)",
                fontWeight: 700,
              }}
            >
              <Counter to={goals.length} />
            </p>
            <p style={{ margin: 0, fontSize: "15px", opacity: 0.9 }}>
              planting drives
            </p>
          </div>
        </div>
      </section>

      <Pills tabs={tabs} tab={tab} onChange={setTab} isMobile={isMobile} />

      <div style={{ marginTop: "14px" }}>
        {active ? (
          <Story goal={active} isMobile={isMobile} />
        ) : (
          <Overview onPick={setTab} isMobile={isMobile} />
        )}
        <Gallery
          key={tab}
          //   items={mediaOf(active ? [active] : goals)}
          items={mediaOf(active ? [active] : newestFirst)}
          isMobile={isMobile}
          onOpen={(items, i) => setLb({ items, i })}
        />
      </div>

      <Lightbox state={lb} onClose={() => setLb(null)} onMove={move} />
    </div>
  );
}
