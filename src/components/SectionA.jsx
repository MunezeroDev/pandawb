import { useState, useEffect } from "react";

import logo from '../assets/panda-logo.png';
import phoneMockup from '../assets/panda_app_mockup.png'; 
import underline from '../assets/svg_underline.png'; 

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
      // width: isMobile ? "220px" : "310px",
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
        marginLeft:"80px",
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
          {/*Logo*/}
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

        {/* ── MAIN BODY: two-column on desktop ── */}
        <div style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "flex-start" : "flex-start",
          justifyContent: "space-between",
          gap: isMobile ? "36px" : "0",
        }}>

          {/* LEFT: Headline + subtext + wavy line */}
          <div style={{
            marginTop:"2rem",
            flex: isMobile ? "unset" : "0 0 100%",      
            maxWidth: isMobile ? "100%" : "100%", 
          }}>
            <h1 style={{
              margin: 0,
              fontFamily: "'Georgia', serif",
              fontSize: isMobile ? "clamp(46px, 12vw, 62px)" : "clamp(72px, 7.5vw, 108px)",
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
              fontSize: isMobile ? "clamp(46px, 12vw, 62px)" : "clamp(72px, 7.5vw, 108px)",
              color: "#00bf63",
              lineHeight: 1.03,
              fontFamily: "'Georgia', serif",
              fontWeight: "normal",
              marginBottom:"2rem"
            }}>
              Make memories.
            </h1>

            <p style={{
              marginTop: isMobile ? "20px" : "24px",
              marginBottom: 0,
              fontSize: isMobile ? "clamp(24px, 6vw, 32px)" : "clamp(28px, 3vw, 40px)",
              color: "#8e99a2",
              lineHeight: 1.45,
              fontFamily: "'Georgia', serif",
              fontWeight: "400",
            }}>
              Fun&nbsp; meets climate action<br />
              but it's more than that!
            </p>

            <WavyLine />
          </div>

          {/* RIGHT: Tag + Phone on green blob */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: isMobile ? "center" : "flex-start",
            position: "absolute",
            right:100,
            top:120,
          }}>
            {/* A TREE-PLANTING MOVEMENT */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: isMobile ? "20px" : "24px",
              alignSelf: isMobile ? "center" : "flex-end",
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

            {/* Phone + green circle */}
            <div style={{
              position: "relative",
              marginLeft:"auto",
              width: isMobile ? "260px" : "360px",
              height: isMobile ? "400px" : "560px",
            }}>
              {/* Green radial blob behind phone */}
              <div style={{
                position: "absolute",
                top: 20,
                right: isMobile ? "50%" : "0",
                transform: isMobile ? "translateX(50%)" : "translateX(0)",
                width: isMobile ? "240px" : "460px",
                height: isMobile ? "240px" : "480px",
                background: "linear-gradient(to bottom, #3ecf7a, #6ddba0, #a8edcc, #d4f5e8, #e7f1ed, #fff)",
                borderRadius: "50%",
                zIndex: 1,
              }} />
              <div style={{ position: "relative", zIndex: 2 }}>
                <PhoneMockup isMobile={isMobile} />
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}