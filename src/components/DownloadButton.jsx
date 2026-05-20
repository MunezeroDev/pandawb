import { useRef } from "react";

const keyframes = `
  @import url('https://fonts.cdnfonts.com/css/black-han-sans');
  @keyframes cascade {
    0%   { opacity: 0; transform: translateY(-5px); }
    30%  { opacity: 1; transform: translateY(0); }
    60%  { opacity: 0.3; transform: translateY(3px); }
    100% { opacity: 0; transform: translateY(6px); }
  }
  @keyframes bounce-icon {
    0%, 100% { transform: translateY(0); }
    50%       { transform: translateY(3px); }
  }
  @keyframes ripple-out {
    from { width: 0; height: 0; opacity: 1; }
    to   { width: 220px; height: 220px; opacity: 0; }
  }
  .dl-ripple { 
    position: absolute; border-radius: 50%;
    background: rgba(255,255,255,0.22);
    width: 0; height: 0;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
  }
  .dl-ripple.active { animation: ripple-out 0.5s ease-out forwards; }
`;

export default function DownloadButton() {
  const rippleRef = useRef(null);

  const triggerRipple = () => {
    const el = rippleRef.current;
    if (!el) return;
    el.classList.remove("active");
    void el.offsetWidth;
    el.classList.add("active");
  };

  return (
    <>
      <style>{keyframes}</style>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: "8px",
          //   background: "yellow",
        }}
      >
        {[0, 0.25].map((delay, i) => (
          <span
            key={i}
            style={{
              display: "block",
              color: "#00bf63",
              fontSize: "22px",
              lineHeight: "1",
              opacity: 0,
              animation: `cascade 1.6s ease-in-out ${delay}s infinite`,
            }}
          >
            ⌄
          </span>
        ))}

        {/* Button */}
        <button
          onClick={triggerRipple}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "#00bf63",
            color: "#fff",
            border: "none",
            borderRadius: "999px",
            padding: "11px 26px",
            fontFamily: "'Black Han Sans', 'Georgia', sans-serif",
            fontSize: "0.75rem",
            letterSpacing: "2px",
            cursor: "pointer",
            position: "relative",
            overflow: "hidden",
            whiteSpace: "nowrap",
            transition:
              "transform 0.18s cubic-bezier(0.34,1.56,0.64,1), background 0.18s ease, box-shadow 0.18s ease",
            boxShadow: "0 5px 0px #007a3d, 0 8px 20px rgba(0,191,99,0.28)",
            marginTop: "1rem",
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
          <span
            style={{
              fontSize: "0.9rem",
              animation: "bounce-icon 2s ease-in-out infinite",
            }}
          >
            ⬇
          </span>
          <span>CLICK TO DOWNLOAD THE APP</span>
        </button>

        {/* Subtle tagline */}
        <p
          style={{
            fontFamily: "'Georgia', serif",
            fontSize: "9px",
            letterSpacing: "1.8px",
            color: "#8e99a2",
            margin: "16px 0 0",
            textTransform: "uppercase",
          }}
        >
          free to plant · free to grow
        </p>

        {/* Cascading chevrons */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0px",
            marginBottom: "8px",
          }}
        >
          {/*           {[0, 0.15, 0.3].map((delay, i) => (
            <span
              key={i}
              style={{
                color: "#00bf63",
                fontSize: "13px",
                opacity: 0,
                lineHeight: 1.1,
                animation: `cascade 1.4s ease-in-out ${delay}s infinite`,
              }}
            >
              ⌄
            </span>
          ))} */}
        </div>
      </div>
    </>
  );
}
