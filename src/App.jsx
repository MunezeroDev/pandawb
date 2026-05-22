import SectionA from "./components/SectionA";
import SectionB from "./components/SectionB";
import SectionC from "./components/SectionC";
import SectionD from "./components/SectionD";
import SectionE from "./components/SectionE";
import SectionG from "./components/SectionG";
import Footer from "./components/XFooter";
import ScrollToTop from "./components/ScrollToTop";
import EmbeddedForm from "./components/EmbeddedForm";

import { useEffect } from "react";

useEffect(() => {
  const hash = window.location.hash;
  if (hash) {
    setTimeout(() => {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 500);
  }
}, []);

function App() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);
  return (
    <div>
      <SectionA />
      <SectionB />
      <SectionC />
      <SectionD />
      <SectionE />
      <SectionG />
      <EmbeddedForm />
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default App;
