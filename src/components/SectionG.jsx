import { useState, useEffect, useRef } from "react";

import pandaVideo from '../assets/videos/bv_2025_planting.mp4';
import pandaThumbnail from '../assets/videos/Thumbnail.jpg';
// const pandaThumbnail = pandaThumbnail;

export default function PandaSectionG() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isPortrait, setIsPortrait] = useState(null); // null = unknown until video loads
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [buffered, setBuffered] = useState(0);
  const controlsTimerRef = useRef(null);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Detect orientation once video metadata is available
  const handleLoadedMetadata = () => {
    const vid = videoRef.current;
    if (!vid) return;
    setIsPortrait(vid.videoHeight > vid.videoWidth);
  };

  const formatTime = (s) => {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const handleMouseMove = () => {
    setShowControls(true);
    clearTimeout(controlsTimerRef.current);
    controlsTimerRef.current = setTimeout(() => {
      if (playing) setShowControls(false);
    }, 2500);
  };

  // Portrait: cap width so it doesn't stretch wall-to-wall
  const containerStyle = isPortrait === true
    //Changed(might reverse)
    // ? { maxWidth: isMobile ? "320px" : "420px", aspectRatio: "9/16" }
    // : { maxWidth: "1100px", aspectRatio: "16/9" };

    ? { maxWidth: isMobile ? "260px" : "340px", aspectRatio: "9/16" }  // ← slightly smaller portrait
    : { maxWidth: "900px", aspectRatio: "16/9" }; 

  return (
    <div
      style={{
        fontFamily: "'Georgia', 'Times New Roman', serif",
        background: "#ffffff",
        minHeight: "100vh",
        padding: isMobile ? "40px 24px" : "52px 52px",
        marginLeft: "80px",
        boxSizing: "border-box",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* ── HEADING ── */}
      <h1
        style={{
          margin: "0 0 36px",
          fontFamily: "'Georgia', serif",
          fontWeight: "normal",
          fontSize: isMobile ? "clamp(32px, 9vw, 52px)" : "clamp(48px, 6vw, 80px)",
          color: "#1a1a1a",
          textAlign: "center",
          letterSpacing: "-1px",
          lineHeight: 1.1,
        }}
      >
        Panda in{" "}
        <span style={{ color: "#00bf63", fontStyle: "italic" }}>Action.</span>
      </h1>

      {/* ── VIDEO CONTAINER ── */}
<div
  onMouseMove={handleMouseMove}
  onMouseLeave={() => { if (playing) setShowControls(false); }}
  style={{
    width: "100%",
    borderRadius: "20px",
    overflow: "hidden",
    background: "#0a0f1a",
    boxShadow: "0 32px 80px rgba(0,0,0,0.18), 0 8px 24px rgba(0,0,0,0.12)",
    position: "relative",
    cursor: showControls ? "default" : "none",
    ...containerStyle,
  }}
>
  {pandaVideo ? (
    <>
      <video
        ref={videoRef}
        src={pandaVideo}
        playsInline
        poster={pandaThumbnail || undefined}
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onLoadedMetadata={() => {
          const vid = videoRef.current;
          if (!vid) return;
          setIsPortrait(vid.videoHeight > vid.videoWidth);
          setDuration(vid.duration);
        }}
        onTimeUpdate={() => {
          const vid = videoRef.current;
          if (!vid) return;
          setCurrentTime(vid.currentTime);
          if (vid.buffered.length > 0)
            setBuffered(vid.buffered.end(vid.buffered.length - 1));
        }}
        onClick={() => playing ? videoRef.current.pause() : videoRef.current.play()}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          display: "block",
          background: "#000",
        }}
      />

      {/* ── BIG CENTRE PLAY BUTTON (pre-play only) ── */}
      {!playing && (
        <div
          onClick={() => videoRef.current?.play()}
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            // background: "rgba(0,0,0,0.3)",
          }}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "rgba(0,191,99,0.9)",
              boxShadow: "0 0 0 12px rgba(0,191,99,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "transform 0.15s ease, box-shadow 0.15s ease",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "scale(1.1)";
              e.currentTarget.style.boxShadow = "0 0 0 18px rgba(0,191,99,0.15)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 0 0 12px rgba(0,191,99,0.2)";
            }}
          >
            <div style={{
              width: 0, height: 0,
              borderTop: "14px solid transparent",
              borderBottom: "14px solid transparent",
              borderLeft: "24px solid #fff",
              marginLeft: "6px",
            }} />
          </div>
        </div>
      )}

      {/* ── CONTROLS BAR ── */}
      <div
        style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          padding: "40px 20px 16px",
          background: "linear-gradient(transparent, rgba(0,0,0,0.82))",
          opacity: showControls ? 1 : 0,
          transform: showControls ? "translateY(0)" : "translateY(6px)",
          transition: "opacity 0.3s ease, transform 0.3s ease",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          pointerEvents: showControls ? "all" : "none",
        }}
      >

        {/* ── PROGRESS BAR ── */}
        <div
          style={{ position: "relative", height: "4px", borderRadius: "2px", background: "rgba(255,255,255,0.15)", cursor: "pointer" }}
          onClick={e => {
            const rect = e.currentTarget.getBoundingClientRect();
            const ratio = (e.clientX - rect.left) / rect.width;
            videoRef.current.currentTime = ratio * duration;
          }}
          onMouseEnter={e => e.currentTarget.style.height = "6px"}
          onMouseLeave={e => e.currentTarget.style.height = "4px"}
        >
          {/* buffered */}
          <div style={{
            position: "absolute", inset: 0, borderRadius: "2px",
            background: "rgba(255,255,255,0.25)",
            width: `${duration ? (buffered / duration) * 100 : 0}%`,
          }} />
          {/* played */}
          <div style={{
            position: "absolute", inset: 0, borderRadius: "2px",
            background: "linear-gradient(90deg, #00bf63, #00e676)",
            width: `${duration ? (currentTime / duration) * 100 : 0}%`,
            boxShadow: "0 0 8px rgba(0,191,99,0.6)",
          }} />
          {/* thumb */}
          <div style={{
            position: "absolute",
            top: "50%", transform: "translate(-50%, -50%)",
            left: `${duration ? (currentTime / duration) * 100 : 0}%`,
            width: "12px", height: "12px",
            borderRadius: "50%",
            background: "#00bf63",
            boxShadow: "0 0 6px rgba(0,191,99,0.8)",
          }} />
        </div>

        {/* ── BOTTOM ROW ── */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>

          {/* Play / Pause */}
          <button
            onClick={() => playing ? videoRef.current.pause() : videoRef.current.play()}
            style={{
              background: "none", border: "none", cursor: "pointer",
              padding: "4px", display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            {playing ? (
              /* Pause icon */
              <div style={{ display: "flex", gap: "3px" }}>
                <div style={{ width: "3px", height: "16px", background: "#fff", borderRadius: "2px" }} />
                <div style={{ width: "3px", height: "16px", background: "#fff", borderRadius: "2px" }} />
              </div>
            ) : (
              /* Play icon */
              <div style={{
                width: 0, height: 0,
                borderTop: "9px solid transparent",
                borderBottom: "9px solid transparent",
                borderLeft: "15px solid #fff",
                marginLeft: "2px",
              }} />
            )}
          </button>

          {/* Volume */}
          <button
            onClick={() => {
              setMuted(m => !m);
              videoRef.current.muted = !muted;
            }}
            style={{ background: "none", border: "none", cursor: "pointer", padding: "4px", fontSize: "15px" }}
          >
            {muted || volume === 0 ? "🔇" : volume < 0.5 ? "🔉" : "🔊"}
          </button>
          <input
            type="range" min={0} max={1} step={0.05} value={muted ? 0 : volume}
            onChange={e => {
              const v = parseFloat(e.target.value);
              setVolume(v);
              setMuted(v === 0);
              videoRef.current.volume = v;
              videoRef.current.muted = v === 0;
            }}
            style={{
              width: "72px", accentColor: "#00bf63", cursor: "pointer",
              height: "3px", borderRadius: "2px",
            }}
          />

          {/* Time */}
          <span style={{
            color: "rgba(255,255,255,0.8)",
            fontSize: "12px", fontFamily: "monospace", marginLeft: "2px", whiteSpace: "nowrap",
          }}>
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>

          {/* Spacer */}
          <div style={{ flex: 1 }} />

          {/* Fullscreen */}
          <button
            onClick={() => {
              const el = videoRef.current?.closest("div[style]");
              if (document.fullscreenElement) document.exitFullscreen();
              else el?.requestFullscreen();
            }}
            style={{
              background: "none", border: "none", cursor: "pointer",
              padding: "4px", color: "#fff", fontSize: "14px",
              display: "flex", alignItems: "center",
            }}
          >
            {/* Fullscreen icon */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
              <polyline points="15 3 21 3 21 9" />
              <polyline points="9 21 3 21 3 15" />
              <line x1="21" y1="3" x2="14" y2="10" />
              <line x1="3" y1="21" x2="10" y2="14" />
            </svg>
          </button>

        </div>
      </div>
    </>
  ) : (
    /* ── NO-VIDEO STATE ── */
    <div
      style={{
        width: "100%", height: "100%", minHeight: "200px",
        background: "#0d1525",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        gap: "12px", padding: "40px 24px",
        boxSizing: "border-box", textAlign: "center",
      }}
    >
      <div style={{ fontSize: "40px" }}>🎬</div>
      <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px", fontFamily: "sans-serif", margin: 0 }}>
        Import your video and replace <code style={{ color: "#00bf63" }}>pandaVideo</code>
      </p>
    </div>
  )}
</div>
    </div>
  );
}