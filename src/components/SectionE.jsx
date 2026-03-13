import { useState, useEffect } from "react";
 
import step1 from '../assets/step_1.webp'; 
import step2 from '../assets/step_2.webp'; 

export default function PandaSectionE() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div
      style={{
        fontFamily: "'Georgia', 'Times New Roman', serif",
        background: "#fff",
        minHeight: "100vh",
        padding: isMobile ? "40px 24px 56px" : "52px 52px 60px",
        marginLeft: isMobile ? "0" : "80px",
        boxSizing: "border-box",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {isMobile ? (
        <>
          {/* Heading */}
          <header style={{ marginBottom: "32px", textAlign: "center", width: "100%" }}>
            <h1 style={{
              fontSize: "clamp(36px, 10vw, 56px)",
              fontFamily: "'Georgia', serif",
              fontWeight: "normal",
              lineHeight: 1.05,
              margin: 0,
              letterSpacing: "-1px",
              color: "#1a1a1a",
            }}>
              How It{" "}
              <span style={{ color: "#00bf63", fontWeight: "700" }}>Works</span>
            </h1>
          </header>

          {/* Card — flat top corners, rounded bottom, inner padding so image breathes */}
          <div style={{
            width: "100%",
            borderRadius: "0 0 20px 20px",
            overflow: "hidden",
            boxShadow: "0 4px 20px rgba(0,0,0,0.10)",
            background: "#f9fafb",
            padding: "10px 10px",
            boxSizing: "border-box",
          }}>
            <img
              src={step1}
              alt="How It Works — Panda App Steps"
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                borderRadius: "8px 8px 0 0",
              }
            }
            />
            <img
              src={step2}
              alt="How It Works — Panda App Steps"
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                borderRadius: "8px 8px 0 0",
              }
             }
            />
          </div>
        </>
      ) : (
        /* ── Desktop — centred, scaled down, not overwhelming ── */
        <>
          <header style={{ marginBottom: "40px", textAlign: "center", width: "100%" }}>
            <h1 style={{
              fontSize: "clamp(48px, 6vw, 80px)",
              fontFamily: "'Georgia', serif",
              fontWeight: "normal",
              lineHeight: 1.05,
              margin: 0,
              letterSpacing: "-1px",
              color: "#1a1a1a",
            }}>
              How It{" "}
              <span style={{ color: "#00bf63", fontWeight: "700" }}>Works</span>
            </h1>
          </header>

          <div style={{
            width: "100%",
            maxWidth: "820px",
            borderRadius: "24px",
            overflow: "hidden",
            boxShadow: "0 12px 48px rgba(0,0,0,0.10), 0 4px 16px rgba(0,0,0,0.06)",
            background: "#f9fafb",
            padding: "24px 24px",
            boxSizing: "border-box",
          }}>
            <img
              src={step1}
              alt="How It Works — Panda App Steps"
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                borderRadius: "14px 14px 0 0",
              }}
            />
            <img
              src={step2}
              alt="How It Works — Panda App Steps"
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                borderRadius: "14px 14px 0 0",
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}