import { useState, useEffect } from "react";

export default function EmbeddedForm() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div
      id="form"
      style={{
        fontFamily: "'Georgia', 'Times New Roman', serif",
        background: "#E1F6EB",
        minHeight: "content-fit",
        // padding: isMobile ? "40px 20px 56px" : "52px 52px 60px",
        padding: isMobile ? "32px 0 56px" : "52px 0 60px",
        // marginLeft: isMobile ? "0" : "80px",
        marginLeft: "0",
        marginBottom: "-3rem",
        boxSizing: "border-box",
        overflow: "hidden",
        marginBottom: "1rem",
      }}
    >
      {/* Header */}
      <header
        style={{
          marginBottom: isMobile ? "16px" : "32px",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: isMobile
              ? "clamp(36px, 10vw, 56px)"
              : "clamp(32px, 4vw, 72px)",
            fontFamily: "'Georgia', serif",
            fontWeight: "normal",
            lineHeight: 1,
            margin: 0,
            letterSpacing: "-1px",
            color: "#1a1a1a",
          }}
        >
          Google{" "}
          <span
            style={{ color: "#00bf63", fontWeight: "700", fontStyle: "italic" }}
          >
            Form
          </span>
        </h1>
      </header>

      {/* Form  */}
      <iframe
        src="https://docs.google.com/forms/d/e/1FAIpQLSePewoKFrXQudYzC_P36UHWxX8iTyGIEraxJ3FzmXNUGIfa4w/viewform?embedded=true"
        width="100%"
        height={isMobile ? "2150px" : "1970"}
        frameBorder="0"
        marginHeight="0"
        marginWidth="0"
        scrolling="no"
        style={{ display: "block" }}
      >
        Loading…
      </iframe>
    </div>
  );
}
