import { useState, useEffect } from "react";

import aboutUs from '../assets/AboutUs.jpg'; 

const blackSans =  `@import url('https://fonts.cdnfonts.com/css/black-sans');`;

export default function PandaSectionB() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <div
        style={{
          fontFamily: "'Georgia', 'Times New Roman', serif",
          // background: "#f5f5f0",
          paddingTop:"6rem", // to be deleted
          minHeight: "100vh",
          padding: isMobile ? "20px 24px 0" : "28px 52px 0",
          marginLeft: "80px",
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
        {/* ── HEADER ── */}
        <header style={{ marginBottom: isMobile ? "28px" : "40px" }}>
          <h1
            style={{
              fontSize: isMobile ? "clamp(48px,12vw,80px)" : "clamp(64px,8vw,110px)",
              fontFamily: "'Georgia', serif",
              fontWeight: "normal",
              lineHeight: 1.03,
              margin: 0,
              letterSpacing: "-2px",
              color: "#1a1a1a",
            }}
          >
            About{" "}
            <span style={{  color: "#00bf63" }}>Panda</span>
          </h1>
        </header>

        {/* ── MAIN CONTENT ── */}
        <main
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? "32px" : "60px",
            alignItems: "flex-start",
          }}
        >
          {/* LEFT — photo */}
          <div
            style={{
              flexShrink: 0,
              width: isMobile ? "100%" : "min(46%, 520px)",
            }}
          >
            <img
              src={aboutUs}
              alt="Panders planting trees together"
              style={{
                width: "100%",
                aspectRatio: "4/3",
                objectFit: "cover",
                borderRadius: "20px",
                display: "block",
              }}
            />
          </div>

          {/* RIGHT — text + button */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: "28px",
              paddingTop: isMobile ? "0" : "8px",
            }}
          >
            {/* Part A — intro paragraph */}
            <p
              style={{
                margin: 0,
                fontSize: isMobile ? "16px" : "18px",
                lineHeight: "1.75",
                color: "#555",
                fontFamily: "'Georgia', serif",
              }}
            >
              Panda was founded in 2025 to tackle deforestation by redefining
              what tree-planting means in the modern era. Panda brings together
              a vibrant ecosystem — the{" "}
              <a href="#" style={linkStyle}>Panda App</a>,{" "}
              Panda{" "}
              <a href="#" style={linkStyle}>Club</a>,{" "}
              Panda{" "}
              <a href="#" style={linkStyle}>Systems</a>,{" "}
              and our passionate community of{" "}
              <a href="#" style={linkStyle}>Panders</a>{" "}
              — to make restoring the planet fun, social, and deeply impactful.
            </p>

            {/* VISION button */}
            <div>
              <button
                style={{
                  background: "#00bf63",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "6px",
                  padding: "14px 40px",
                  fontSize: "13px",
                  fontWeight: "700",
                  letterSpacing: "2.5px",
                  textTransform: "uppercase",
                  fontFamily: "'Georgia', serif",
                  cursor: "pointer",
                  transition: "background 0.2s ease, transform 0.15s ease",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "#46cd6e";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "#00bf63";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                VISION
              </button>
            </div>

            {/* Part B — vision paragraph */}
            <p
              style={{
                margin: 0,
                fontSize: isMobile ? "16px" : "18px",
                lineHeight: "1.75",
                color: "#2c2c2c",
                fontFamily: "'Georgia', serif",
              }}
            >
              Our vision is to transform tree-planting into a vibrant global
              movement through a fun, gamified experience that blends artistic
              collages, picture sharing, and the power of social media, towards
              a future-forward token economy that reward real-world
              environmental action and inspire millions to heal the earth and
              secure a greener future
            </p>
          </div>
        </main>
      </div>
    </>
  );
}

const linkStyle = {
  color: "#00bf63",
  textDecoration: "none",
  fontWeight: "500",
};