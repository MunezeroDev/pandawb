import { useState, useEffect } from "react";

import logo from "../assets/panda-logo.webp";
import phoneMockup from "../assets/panda_app_mockup.webp";
import underline from "../assets/svg_underline.webp";
import seedlingIcon from "../assets/seedling_img.jpg";

const norwesterStyle = `
  @import url('https://fonts.cdnfonts.com/css/norwester');
`;

const blackSans = `@import url('https://fonts.cdnfonts.com/css/black-sans');`;

const WavyLine = () => <img src={underline} alt="" />;

const PhoneMockup = ({ isMobile }) => (
  <img
    src={phoneMockup}
    alt="Panda App Mockup"
    style={{
      width: isMobile ? "180px" : "260px",
      height: "auto",
      objectFit: "contain",
      position: "relative",
      zIndex: 2,
      flexShrink: 0,
      filter: "drop-shadow(0 24px 48px rgba(0,0,0,0.22))",
    }}
  />
);

const SproutIcon = () => (
  <img
    src={seedlingIcon}
    alt="seedlingIcon"
    style={{
      height: "1em",
      width: "auto",
      verticalAlign: "middle",
      marginLeft: "6px",
    }}
  />
);

export default function PandaSectionA() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", id: "home", icon: "🌍" },
    { label: "About", id: "about", icon: "🐼" },
    { label: "Features", id: "features", icon: "✨" },
    { label: "Using Panda", id: "usingPanda", icon: "📱" },
    { label: "In Action", id: "inAction", icon: "🌿" },
    { label: "Contact", id: "contact", icon: "📬" },
  ];

  return (
    <>
      <style>{norwesterStyle}</style>
      <div
        id="home"
        style={{
          fontFamily: "'Georgia', 'Times New Roman', serif",
          background: "#ffffff",
          minHeight: "100vh",
          padding: isMobile ? "20px 24px 0" : "28px 52px 0",
          marginLeft: isMobile ? "0" : "80px",
          boxSizing: "border-box",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* ── NAVBAR ── */}
        {isMobile ? (
          <div
            style={{
              position: "absolute",
              top: "20px",
              right: "24px",
              zIndex: 50,
            }}
          >
            {/* button  */}
            <button
              onClick={() => setMenuOpen((o) => !o)}
              style={{
                background: menuOpen ? "#009e52" : "#00bf63",
                border: "none",
                borderRadius: "50px",
                padding: "9px 20px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                boxShadow: "0 4px 18px rgba(0,191,99,0.4)",
                transition: "all 0.2s ease",
                transform: menuOpen ? "scale(0.97)" : "scale(1)",
              }}
            >
              <span
                style={{
                  fontSize: "15px",
                  transition: "transform 0.3s",
                  transform: menuOpen ? "rotate(90deg)" : "rotate(0deg)",
                }}
              >
                🌿
              </span>
              <span
                style={{
                  fontFamily: "'Georgia', serif",
                  fontSize: "11px",
                  fontWeight: "700",
                  color: "#fff",
                  letterSpacing: "2px",
                }}
              >
                {menuOpen ? "CLOSE" : "MENU"}
              </span>
            </button>

            {/* Dropdown */}
            <div
              style={{
                position: "absolute",
                top: "52px",
                right: 0,
                background: "#fff",
                borderRadius: "18px",
                boxShadow: "0 12px 40px rgba(0,0,0,0.13)",
                border: "1px solid #e0f5ec",
                minWidth: "200px",
                overflow: "hidden",
                maxHeight: menuOpen ? "500px" : "0",
                opacity: menuOpen ? 1 : 0,
                transition: "max-height 0.35s ease, opacity 0.25s ease",
              }}
            >
              {navItems.map(({ label, id, icon }, i) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontFamily: "'Georgia', serif",
                    fontSize: "13.5px",
                    color: "#3d6b52", // deep forest green — elegant, not loud
                    textDecoration: "none",
                    fontWeight: "600",
                    padding: "7px 18px",
                    borderRadius: "50px",
                    letterSpacing: "0.6px",
                    border: "1.5px solid transparent",
                    background: "transparent",
                    position: "relative",
                    transition: "all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#ffffff";
                    e.currentTarget.style.background = "#00bf63";
                    e.currentTarget.style.border = "1.5px solid #00a854";
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow =
                      "0 6px 20px rgba(0,191,99,0.30)";
                    e.currentTarget.style.letterSpacing = "0.8px";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#3d6b52";
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.border = "1.5px solid transparent";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.letterSpacing = "0.6px";
                  }}
                >
                  <span style={{ fontSize: "18px" }}>{icon}</span>
                  <span style={{ fontWeight: "500" }}>{label}</span>
                </a>
              ))}
            </div>
          </div>
        ) : (
          /* Desktop links */
          <div
            style={{
              position: "absolute",
              top: "28px",
              right: "52px",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              zIndex: 0,
            }}
          >
            {navItems.map(({ label, id }) => (
              <a
                key={id}
                href={`#${id}`}
                style={{
                  fontFamily: "'Georgia', serif",
                  fontSize: "14px",
                  color: "#666",
                  textDecoration: "none",
                  fontWeight: "500",
                  padding: "7px 16px",
                  borderRadius: "50px",
                  border: "1px solid transparent",
                  transition: "all 0.22s ease",
                  letterSpacing: "0.3px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#00bf63";
                  e.currentTarget.style.background = "#f0faf5";
                  e.currentTarget.style.border = "1px solid #c8f0dc";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#666";
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.border = "1px solid transparent";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {label}
              </a>
            ))}
          </div>
        )}

        {/* Logo + Panda */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            marginBottom: isMobile ? "28px" : "36px",
          }}
        >
          <img
            src={logo}
            alt="Panda Logo"
            style={{ width: "clamp(110px, 18vw, 170px)" }}
          />
          <span
            style={{
              fontFamily: "'Norwester', 'Georgia', serif",
              fontSize: isMobile ? "28px" : "48px",
              fontWeight: "400",
              color: "#00bf63",
              letterSpacing: "2px",
              lineHeight: 1,
              paddingTop: "2px",
              alignSelf: "flex-end",
            }}
          >
            Panda
          </span>
        </div>
        {/* ── MOBILE LAYOUT: single column ── */}
        {isMobile ? (
          <div style={{ display: "flex", flexDirection: "column" }}>
            {/* Headline */}
            <div style={{ marginTop: "1rem" }}>
              <h1
                style={{
                  margin: 0,
                  fontFamily: "'Georgia', serif",
                  fontSize: "clamp(46px, 12vw, 62px)",
                  fontWeight: "normal",
                  color: "#1a1a1a",
                  lineHeight: 1.03,
                }}
              >
                Plant trees<span style={{ fontSize: "1em" }}>🌱</span>
              </h1>
              <h1
                style={{
                  margin: "0 0 1rem",
                  fontSize: "clamp(46px, 12vw, 62px)",
                  color: "#00bf63",
                  lineHeight: 1.03,
                  fontFamily: "'Georgia', serif",
                  fontWeight: "normal",
                }}
              >
                Make memories.
              </h1>
              <p
                style={{
                  marginTop: "16px",
                  marginBottom: 0,
                  fontSize: "clamp(22px, 6vw, 30px)",
                  color: "#8e99a2",
                  lineHeight: 1.45,
                  fontFamily: "'Georgia', serif",
                  fontWeight: "400",
                }}
              >
                Fun&nbsp;meets climate action
                <br />
                but it's more than that!
              </p>
              <div style={{ width: "80%", overflow: "hidden" }}>
                <WavyLine />
              </div>
            </div>

            {/* "A TREE-PLANTING MOVEMENT" badge */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                marginTop: "32px",
                marginBottom: "16px",
              }}
            >
              <style>{blackSans}</style>
              <span
                style={{
                  fontSize: "1.1rem",
                  fontWeight: "700",
                  color: "#00bf63",
                  letterSpacing: "1.5px",
                  fontFamily: "'Black Han Sans', sans-serif",
                  textAlign: "center",
                }}
              >
                A TREE-PLANTING MOVEMENT
              </span>
              <span style={{ fontSize: "2rem" }}>🌍</span>
            </div>

            {/* Phone + green blob — centred */}
            <div
              style={{
                position: "relative",
                width: "260px",
                height: "380px",
                alignSelf: "center",
                marginBottom: "0",
              }}
            >
              {/* Green radial blob */}
              <div
                style={{
                  position: "absolute",
                  top: 20,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "320px",
                  height: "320px",
                  background:
                    "linear-gradient(to bottom, #3ecf7a, #6ddba0, #a8edcc, #d4f5e8, #e7f1ed, #fff)",
                  borderRadius: "50%",
                  zIndex: 1,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: "50%",
                  transform: "translateX(-50%)",
                  zIndex: 2,
                }}
              >
                <PhoneMockup isMobile={true} />
              </div>
            </div>
          </div>
        ) : (
          /* ── DESKTOP LAYOUT: unchanged ── */
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            {/* LEFT: Headline + subtext + wavy line */}
            <div
              style={{
                marginTop: "2rem",
                flex: "0 0 100%",
                maxWidth: "100%",
              }}
            >
              <h1
                style={{
                  margin: 0,
                  fontFamily: "'Georgia', serif",
                  fontSize: "clamp(72px, 7.5vw, 108px)",
                  fontWeight: "normal",
                  color: "#1a1a1a",
                  lineHeight: 1.03,
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                Plant trees&nbsp;
                {/* seedlingIcon */}
                {/* <span style={{ fontSize: "1em" }}>🌱</span> */}
                <SproutIcon />
              </h1>

              <h1
                style={{
                  margin: 0,
                  fontSize: "clamp(72px, 7.5vw, 108px)",
                  color: "#00bf63",
                  lineHeight: 1.03,
                  fontFamily: "'Georgia', serif",
                  fontWeight: "normal",
                  marginBottom: "2rem",
                }}
              >
                Make memories.
              </h1>

              <p
                style={{
                  marginTop: "24px",
                  marginBottom: 0,
                  fontSize: "clamp(28px, 3vw, 40px)",
                  color: "#8e99a2",
                  lineHeight: 1.45,
                  fontFamily: "'Georgia', serif",
                  fontWeight: "400",
                }}
              >
                Fun&nbsp;meets climate action
                <br />
                but it's more than that!
              </p>

              <WavyLine />
            </div>

            {/* RIGHT: Tag + Phone on green blob (absolute, desktop only) */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                position: "absolute",
                right: 100,
                top: 120,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "24px",
                  alignSelf: "flex-end",
                }}
              >
                <style>{blackSans}</style>
                <span
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "700",
                    color: "#00bf63",
                    letterSpacing: "1.5px",
                    fontFamily: "'Black Han Sans', sans-serif",
                  }}
                >
                  A TREE-PLANTING MOVEMENT
                </span>
                <span style={{ fontSize: "3rem" }}>🌍</span>
              </div>

              <div
                style={{
                  position: "relative",
                  marginLeft: "auto",
                  width: "360px",
                  height: "560px",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 20,
                    right: "0",
                    width: "460px",
                    height: "480px",
                    background:
                      "linear-gradient(to bottom, #3ecf7a, #6ddba0, #a8edcc, #d4f5e8, #e7f1ed, #fff)",
                    borderRadius: "50%",
                    zIndex: 1,
                  }}
                />
                <div style={{ position: "relative", zIndex: 2 }}>
                  <PhoneMockup isMobile={false} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
