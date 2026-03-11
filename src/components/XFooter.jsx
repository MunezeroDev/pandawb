import { useState, useEffect } from "react";

export default function PandaFooter() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <footer
      style={{
        fontFamily: "'Georgia', 'Times New Roman', serif",
        background: "#ffffff",
        padding: isMobile ? "40px 24px 24px" : "56px 52px 28px",
        boxSizing: "border-box",
        borderTop: "1px solid #e8ede9",
      }}
    >
      {/* ── TOP ROW ── */}
      <div style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        justifyContent: "space-between",
        alignItems: isMobile ? "flex-start" : "center",
        marginBottom: "48px",
        gap: isMobile ? "20px" : "0",
      }}>
        {/* Logo text-only fallback */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: "40px", height: "40px", borderRadius: "50%",
            background: "#00bf63", display: "flex", alignItems: "center",
            justifyContent: "center", fontSize: "20px",
          }}>🐼</div>
          <span style={{
            fontSize: "26px", fontWeight: "700", color: "#00bf63",
            letterSpacing: "1px", fontFamily: "'Georgia', serif",
          }}>Panda</span>
        </div>

        <p style={{
          margin: 0, fontSize: isMobile ? "15px" : "17px",
          color: "#6b7280", fontStyle: "italic",
        }}>
          Plant trees. Make memories. Change the world. 🌍
        </p>
      </div>

      {/* ── MIDDLE ROW ── */}
      <div style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        gap: isMobile ? "36px" : "0",
        justifyContent: "space-between",
        marginBottom: "48px",
      }}>
        {/* Company */}
        <div>
          <h4 style={{ margin: "0 0 16px", fontSize: "13px", fontWeight: "700", color: "#1a1a1a", fontFamily: "sans-serif", textTransform: "uppercase", letterSpacing: "1px" }}>
            Company
          </h4>
          {["About Us", "Our Mission", "Blog", "Careers", "Press"].map((item) => (
            <div key={item} style={{ marginBottom: "10px" }}>
              <a href="#"
                style={{ color: "#6b7280", fontSize: "14px", textDecoration: "none", fontFamily: "sans-serif" }}
                onMouseEnter={e => e.target.style.color = "#00bf63"}
                onMouseLeave={e => e.target.style.color = "#6b7280"}
              >{item}</a>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div>
          <h4 style={{ margin: "0 0 16px", fontSize: "13px", fontWeight: "700", color: "#1a1a1a", fontFamily: "sans-serif", textTransform: "uppercase", letterSpacing: "1px" }}>
            Navigation
          </h4>
          {["Features", "How It Works", "Token Economy", "Community", "Leaderboard"].map((item) => (
            <div key={item} style={{ marginBottom: "10px" }}>
              <a href="#"
                style={{ color: "#6b7280", fontSize: "14px", textDecoration: "none", fontFamily: "sans-serif" }}
                onMouseEnter={e => e.target.style.color = "#00bf63"}
                onMouseLeave={e => e.target.style.color = "#6b7280"}
              >{item}</a>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div>
          <h4 style={{ margin: "0 0 16px", fontSize: "14px", fontWeight: "700", color: "#1a1a1a", fontFamily: "sans-serif", textTransform: "uppercase", letterSpacing: "1px" }}>
            Contact
          </h4>
          {[
            { icon: "✉️", text: "pandamtii@gmail.com" },
            { icon: "✉️", text: "williammunezero1@gmail.com" },
            { icon: "📞", text: "+254 794 949130" },
            { icon: "📍", text: "Nairobi, Kenya" },
          ].map(({ icon, text }) => (
            <div key={text} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <span style={{ fontSize: "16px" }}>{icon}</span>
              <span style={{ color: "#6b7280", fontSize: "14px", fontFamily: "sans-serif" }}>{text}</span>
            </div>
          ))}
        </div>

        {/* Socials */}
        <div>
          <h4 style={{ margin: "0 0 16px", fontSize: "13px", fontWeight: "700", color: "#1a1a1a", fontFamily: "sans-serif", textTransform: "uppercase", letterSpacing: "1px" }}>
            Follow Us
          </h4>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            {[
              { label: "in", title: "LinkedIn" },
              { label: "ig", title: "Instagram" },
              { label: "fb", title: "Facebook" },
              { label: "yt", title: "YouTube" },
              { label: "𝕏", title: "X / Twitter" },
            ].map(({ label, title }) => (
              <a key={title} href="#" title={title}
                style={{
                  width: "38px", height: "38px", borderRadius: "50%",
                  border: "1.5px solid #d1d5db", display: "flex",
                  alignItems: "center", justifyContent: "center",
                  fontSize: "13px", fontWeight: "700", color: "#6b7280",
                  textDecoration: "none", fontFamily: "sans-serif",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#00bf63"; e.currentTarget.style.color = "#00bf63"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#d1d5db"; e.currentTarget.style.color = "#6b7280"; }}
              >{label}</a>
            ))}
          </div>
        </div>
      </div>

      {/* ── BOTTOM ROW ── */}
      <div style={{
        borderTop: "1px solid #e8ede9",
        paddingTop: "24px",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        justifyContent: "space-between",
        alignItems: isMobile ? "flex-start" : "center",
        gap: isMobile ? "12px" : "0",
      }}>
        <p style={{ margin: 0, fontSize: "13px", color: "#9ca3af", fontFamily: "sans-serif" }}>
          © 2025 Panda. All rights reserved.
        </p>
        <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
          {["Terms & Conditions", "Privacy Policy", "Cookies"].map((item) => (
            <a key={item} href="#"
              style={{ color: "#9ca3af", fontSize: "13px", textDecoration: "none", fontFamily: "sans-serif" }}
              onMouseEnter={e => e.target.style.color = "#00bf63"}
              onMouseLeave={e => e.target.style.color = "#9ca3af"}
            >{item}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}