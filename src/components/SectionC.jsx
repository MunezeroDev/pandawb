import { useState, useEffect } from "react";
import treeUpload from "../assets/pandawimages/treeupload.jpg" 
import collages from "../assets/pandawimages/collage.jpg" 
import location from "../assets/pandawimages/location.png" 
import your_forest from "../assets/pandawimages/your_forest.png" 

const features = [
  {
    title: "Fun and Verifiable",
    description: "Plant a real tree, upload photos, add a selfie, and give your tree a name — make your impact personal.",
    image: treeUpload, 
  },
  {
    title: "Memorable Tree Plan Experience",
    description: "Panda instantly turns your tree planting moment into a beautiful shareable collage for social media.",
    image: collages,
  },
  
  {
    title: "Geo-Mapped Location",
    description: "Track exactly where your tree is planted with a geo-mapped pin and revisit your impact on the map anytime.",
    image: location,
  },
  {
    title: "Digital Forest",
    description: "Grow your own digital forest as every tree you plant becomes part of your lasting environmental legacy.",
    image: your_forest,
  },
];

const FeatureCard = ({ feature, isMobile }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: "20px",
        overflow: "hidden",
        flex: isMobile ? "none" : "1 1 0",
        minWidth: 0,
        cursor: "pointer",
        transform: hovered ? "translateY(-10px) scale(1.025)" : "translateY(0) scale(1)",
        boxShadow: hovered
          ? "0 28px 60px rgba(0,191,99,0.22), 0 8px 24px rgba(0,0,0,0.18)"
          : "0 4px 20px rgba(0,0,0,0.10)",
        transition: "transform 0.32s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.32s ease",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Dummy image placeholder — replace src here */}
      <div style={{
        background: "#d0d0d0",
        height: isMobile ? "200px" : "300px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#999",
        fontSize: "13px",
        fontFamily: "sans-serif",
        letterSpacing: "0.5px",
      }}>
        {/* Replace this img tag with your actual image */}
        <img
          src={feature.image}  // ← was hardcoded before
          alt={feature.title}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </div>

      {/* Green label area */}
      <div style={{
        background: "#00bf63",
        padding: isMobile ? "20px 20px 24px" : "22px 22px 28px",
        flex: 1,
      }}>
        <h3 style={{
          margin: "0 0 8px",
          fontFamily: "'Georgia', serif",
          fontWeight: "700",
          fontSize: isMobile ? "18px" : "clamp(16px, 1.5vw, 20px)",
          color: "#fff",
          lineHeight: 1.2,
        }}>
          {feature.title}
        </h3>
        <p style={{
          margin: 0,
          fontSize: isMobile ? "14px" : "clamp(13px, 1vw, 15px)",
          color: "rgba(255,255,255,0.88)",
          lineHeight: 1.6,
          fontFamily: "'Georgia', serif",
        }}>
          {feature.description}
        </p>
      </div>
    </div>
  );
};

export default function PandaSectionC() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div style={{
      fontFamily: "'Georgia', 'Times New Roman', serif",
      background: "#ffffff",
      minHeight: "100vh",
      padding: isMobile ? "40px 20px" : "52px 52px 60px",
      marginLeft: isMobile ? "0" : "80px",
      boxSizing: "border-box",
    }}>

      {/* Header */}
      <header style={{ marginBottom: isMobile ? "32px" : "48px", textAlign: "center" }}>
        <h1 style={{
          fontSize: isMobile ? "clamp(36px, 10vw, 56px)" : "clamp(48px, 6vw, 80px)",
          fontFamily: "'Georgia', serif",
          fontWeight: "normal",
          lineHeight: 1.05,
          margin: 0,
          letterSpacing: "-1px",
          color: "#1a1a1a",
        }}>
          <span style={{ color: "#00bf63", fontWeight: "700" }}>Panda</span>
          {" "}Features
        </h1>
      </header>

      {/* Cards */}
      <div style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        gap: isMobile ? "24px" : "28px",
        alignItems: "stretch",
      }}>
        {features.map((feature) => (
          <FeatureCard key={feature.title} feature={feature} isMobile={isMobile} />
        ))}
      </div>

    </div>
  );
}