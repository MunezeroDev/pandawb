import { useState, useEffect } from "react";

import logo from '../assets/panda-logo.webp';
import phoneMockup from '../assets/panda_app_mockup.webp'; 
import underline from '../assets/svg_underline.webp'; 

const norwesterStyle = `
  @import url('https://fonts.cdnfonts.com/css/norwester');
`;

const blackSans =  `@import url('https://fonts.cdnfonts.com/css/black-sans');`

const WavyLine = () => (
 <img src={underline} alt="" />
);

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


export default function PandaSectionA() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <style>{norwesterStyle}</style>
      <div style={{
        fontFamily: "'Georgia', 'Times New Roman', serif",
        background: "#ffffff",
        minHeight: "100vh",
        padding: isMobile ? "20px 24px 0" : "28px 52px 0",
        marginLeft: isMobile ? "0" : "80px",
        boxSizing: "border-box",
        overflow: "hidden",
      }}>

        {/* Logo + Panda */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
          marginBottom: isMobile ? "28px" : "36px",
        }}>
          <img
            src={logo}
            alt="Panda Logo"
            style={{ width: "clamp(110px, 18vw, 170px)"}}
          />
          <span style={{
            fontFamily: "'Norwester', 'Georgia', serif",
            fontSize: isMobile ? "28px" : "48px",
            fontWeight: "400",
            color: "#00bf63",
            letterSpacing: "2px",
            lineHeight: 1,
            paddingTop: "2px",
            alignSelf: "flex-end",
          }}>
            Panda
          </span>
        </div>

        {/* ── MOBILE LAYOUT: single column ── */}
        {isMobile ? (
          <div style={{ display: "flex", flexDirection: "column" }}>

            {/* Headline */}
            <div style={{ marginTop: "1rem" }}>
              <h1 style={{
                margin: 0,
                fontFamily: "'Georgia', serif",
                fontSize: "clamp(46px, 12vw, 62px)",
                fontWeight: "normal",
                color: "#1a1a1a",
                lineHeight: 1.03,
              }}>
                Plant trees<span style={{ fontSize: "1em" }}>🌱</span>
              </h1>
              <h1 style={{
                margin: "0 0 1rem",
                fontSize: "clamp(46px, 12vw, 62px)",
                color: "#00bf63",
                lineHeight: 1.03,
                fontFamily: "'Georgia', serif",
                fontWeight: "normal",
              }}>
                Make memories.
              </h1>
             <p style={{
                marginTop: "16px",
                marginBottom: 0,
                fontSize: "clamp(22px, 6vw, 30px)",
                color: "#8e99a2",
                lineHeight: 1.45,
                fontFamily: "'Georgia', serif",
                fontWeight: "400",
              }}>
                Fun&nbsp;meets climate action<br />
                but it's more than that!
              </p>
              <div style={{ width: "80%", overflow: "hidden" }}>
                <WavyLine />
              </div>
            </div>

            {/* "A TREE-PLANTING MOVEMENT" badge */}
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              marginTop: "32px",
              marginBottom: "16px",
            }}>
              <style>{blackSans}</style>
              <span style={{
                fontSize: "1.1rem",
                fontWeight: "700",
                color: "#00bf63",
                letterSpacing: "1.5px",
                fontFamily: "'Black Han Sans', sans-serif",
                textAlign: "center",
              }}>
                A TREE-PLANTING MOVEMENT
              </span>
              <span style={{ fontSize: "2rem" }}>🌍</span>
            </div>

            {/* Phone + green blob — centred */}
            <div style={{
              position: "relative",
              width: "260px",
              height: "380px",
              alignSelf: "center",
              marginBottom: "0",
            }}>
              {/* Green radial blob */}
              <div style={{
                position: "absolute",
                top: 20,
                left: "50%",
                transform: "translateX(-50%)",
                width: "320px",
                height: "320px",
                background: "linear-gradient(to bottom, #3ecf7a, #6ddba0, #a8edcc, #d4f5e8, #e7f1ed, #fff)",
                borderRadius: "50%",
                zIndex: 1,
              }} />
              <div style={{
                position: "absolute",
                top: 0,
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 2,
              }}>
                <PhoneMockup isMobile={true} />
              </div>
            </div>

          </div>
        ) : (
          /* ── DESKTOP LAYOUT: unchanged ── */
          <div style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "space-between",
          }}>

            {/* LEFT: Headline + subtext + wavy line */}
            <div style={{
              marginTop: "2rem",
              flex: "0 0 100%",      
              maxWidth: "100%", 
            }}>
              <h1 style={{
                margin: 0,
                fontFamily: "'Georgia', serif",
                fontSize: "clamp(72px, 7.5vw, 108px)",
                fontWeight: "normal",
                color: "#1a1a1a",
                lineHeight: 1.03,
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
              }}>
                Plant trees&nbsp;
                <span style={{ fontSize: "1em" }}>🌱</span>
              </h1>

              <h1 style={{
                margin: 0,
                fontSize: "clamp(72px, 7.5vw, 108px)",
                color: "#00bf63",
                lineHeight: 1.03,
                fontFamily: "'Georgia', serif",
                fontWeight: "normal",
                marginBottom: "2rem",
              }}>
                Make memories.
              </h1>

              <p style={{
                marginTop: "24px",
                marginBottom: 0,
                fontSize: "clamp(28px, 3vw, 40px)",
                color: "#8e99a2",
                lineHeight: 1.45,
                fontFamily: "'Georgia', serif",
                fontWeight: "400",
              }}>
                Fun&nbsp;meets climate action<br />
                but it's more than that!
              </p>

              <WavyLine />
            </div>

            {/* RIGHT: Tag + Phone on green blob (absolute, desktop only) */}
            <div style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              position: "absolute",
              right: 100,
              top: 120,
            }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "24px",
                alignSelf: "flex-end",
              }}>
                <style>{blackSans}</style>
                <span style={{
                  fontSize: "1.5rem",
                  fontWeight: "700",
                  color: "#00bf63",
                  letterSpacing: "1.5px",
                  fontFamily: "'Black Han Sans', sans-serif",
                }}>
                  A TREE-PLANTING MOVEMENT
                </span>
                <span style={{ fontSize: "3rem" }}>🌍</span>
              </div>

              <div style={{
                position: "relative",
                marginLeft: "auto",
                width: "360px",
                height: "560px",
              }}>
                <div style={{
                  position: "absolute",
                  top: 20,
                  right: "0",
                  width: "460px",
                  height: "480px",
                  background: "linear-gradient(to bottom, #3ecf7a, #6ddba0, #a8edcc, #d4f5e8, #e7f1ed, #fff)",
                  borderRadius: "50%",
                  zIndex: 1,
                }} />
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