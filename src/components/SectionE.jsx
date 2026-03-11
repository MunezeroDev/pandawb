import { useState, useEffect } from "react";
 
import step1 from '../assets/step_1.png'; 

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
        padding: isMobile ? "20px 24px" : "28px 0",
        marginLeft: "80px",
        boxSizing: "border-box",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <img
        src={step1}
        alt="How It Works — Panda App Steps"
        style={{
          width: "100%",
          height: "100vh",
          objectFit: "contain",
          objectPosition: "left center",
          display: "block",
        }}
      />
    </div>
  );
}