import { useState, useEffect, useRef } from "react";

import logo from "../assets/panda-logo.webp";
import phoneMockup from "../assets/panda_app_mockup.webp";
import underline from "../assets/svg_underline.webp";
import seedlingIcon from "../assets/seedling_img.jpg";
import DownloadButton from "./DownloadButton";

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
      // TODO: the size of mockup(if neccessary)
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

  // scrolling state: when user scrolls past SectionA(Home)
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // user effect : scrolling
  useEffect(() => {
    const onScroll = () => {
      // 0.6 - reduced this for speed
      const pastSectionA = window.scrollY > window.innerHeight * 0.2;
      setScrolled(pastSectionA);
      if (pastSectionA) setMenuOpen(false);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [menuOpen, setMenuOpen] = useState(false);
  const homeSectionRef = useRef(null);
  const rightColumnRef = useRef(null);

  const navItems = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Features", id: "features" },
    { label: "Using Panda", id: "usingPanda" },
    { label: "In Action", id: "inAction" },
    { label: "Form", id: "form" },
  ];

  return (
    <>
      <style>{norwesterStyle}</style>
      <div
        id="home"
        ref={homeSectionRef}
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
            /* HAMBURGER */
            style={{
              // position: "absolute",
              position: "fixed",
              top: "20px",
              right: "24px",
              // zIndex: 50,
              zIndex: 150,
              opacity: scrolled ? 0 : 1,
              pointerEvents: scrolled ? "none" : "auto",
              transition: "opacity 0.3s ease",
            }}
          >
            {/* Mobile DropDown Button */}
            <button
              onClick={() => setMenuOpen((o) => !o)}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: "8px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "5px",
                width: "40px",
                height: "40px",
              }}
            >
              <span
                style={{
                  display: "block",
                  width: "24px",
                  height: "2.5px",
                  background: "#00bf63",
                  borderRadius: "2px",
                  transition: "all 0.3s ease",
                  transform: menuOpen
                    ? "rotate(45deg) translate(5px, 5px)"
                    : "none",
                }}
              />
              <span
                style={{
                  display: "block",
                  width: "24px",
                  height: "2.5px",
                  background: "#00bf63",
                  borderRadius: "2px",
                  transition: "all 0.3s ease",
                  opacity: menuOpen ? 0 : 1,
                }}
              />
              <span
                style={{
                  display: "block",
                  width: "24px",
                  height: "2.5px",
                  background: "#00bf63",
                  borderRadius: "2px",
                  transition: "all 0.3s ease",
                  transform: menuOpen
                    ? "rotate(-45deg) translate(5px, -5px)"
                    : "none",
                }}
              />
            </button>

            {/* Dropdown Div For Mobile Navbar*/}

            {/* Dropdown Div For Mobile Navbar: CJ STYLE */}
            <div
              style={{
                position: "fixed",
                top: "110px",
                left: 0,
                width: "100vw",
                // height: menuOpen ? "100vh" : "0",
                height: menuOpen ? "fit-content" : "0",
                background: "#7ad3aa",
                overflow: "hidden",
                opacity: menuOpen ? 1 : 0,
                transition: "height 0.35s ease, opacity 0.28s ease",
                zIndex: 100,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-start",
                padding: menuOpen ? "0 36px" : "0",
              }}
            >
              {navItems.map(({ label, id, icon }, i) => (
                <a
                  /* CJ STYLE ON NAVITEMS */
                  key={id}
                  href={`#${id}`}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    // padding: "18px 0",
                    padding: "13px 0",
                    fontFamily: "'Georgia', serif",
                    // fontSize: "22px",
                    fontSize: "16px",
                    color: "#ffffff",
                    textDecoration: "none",
                    fontWeight: "700",
                    textTransform: "uppercase",
                    letterSpacing: "2px",
                    borderBottom: "1px solid rgba(255,255,255,0.25)",
                    width: "100%",
                    transition: "opacity 0.18s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = "0.7";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = "1";
                  }}
                >
                  <span style={{ fontSize: "16px" }}>{icon}</span>
                  <span>{label}</span>
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
            /* Adjusted for CJ Style        
              display: "flex",
              alignItems: "center",
              gap: "0.2rem",
              marginBottom: isMobile ? "28px" : "36px",
              //change the bottom margin for mobile a bit
             */
            display: "flex",
            alignItems: "center",
            gap: "0.2rem",
            marginBottom: isMobile ? "28px" : "36px",
            position: "relative",
            zIndex: 120,
            // index: 200(was)
            // background: "yellow",
            width: "fit-content",
            // padding: "20px",
          }}
        >
          <img
            src={logo}
            alt="Panda Logo"
            // style={{ width: "clamp(110px, 18vw, 170px)" }}
            // NOTE: width is subject to change
            style={{ width: isMobile ? "85px" : "clamp(110px, 18vw, 170px)" }}
          />
          <span
            style={{
              fontFamily: "'Norwester', 'Georgia', serif",
              // fontSize: isMobile ? "28px" : "48px",
              // NOTE: fontSize is subject to change
              fontSize: isMobile ? "22px" : "48px",
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
            {/* Headlines For Landing Page */}
            {/* <div style={{ marginTop: "1rem" }}> */}
            <div style={{ marginTop: "0rem" }}>
              <h1
                style={{
                  margin: 0,
                  fontFamily: "'Georgia', serif",
                  // fontSize: "clamp(46px, 12vw, 62px)",
                  fontSize: "clamp(36px, 10vw, 50px)",
                  fontWeight: "normal",
                  color: "#1a1a1a",
                  lineHeight: 1.03,
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                Plant trees<span style={{ fontSize: "1em" }}>🌱</span>
              </h1>

              <h1
                style={{
                  margin: "0 0 1rem",
                  // fontSize: "clamp(46px, 12vw, 62px)",
                  fontSize: "clamp(36px, 10vw, 50px)",
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
                  // marginTop: "16px",
                  marginTop: "-12px",
                  // marginBottom: 0,
                  marginBottom: "-4px",
                  // fontSize: "clamp(22px, 6vw, 30px)",
                  fontSize: "clamp(18px, 4.5vw, 22px)",
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
                {/* <WavyLine /> */}
                {/* Download Button */}
                <div style={{ marginTop: "24px" }}>
                  <DownloadButton scopeRef={homeSectionRef} />
                </div>
              </div>
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
              ref={rightColumnRef}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                position: "absolute",
                right: 100,
                // Original
                // top: 120,
                // Accomodate download btn
                top: 120,
              }}
            >
              {/* Download Button */}

              <DownloadButton scopeRef={rightColumnRef} />
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
