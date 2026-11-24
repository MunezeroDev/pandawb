import SectionA from "./components/SectionA";
import SectionB from "./components/SectionB";
import SectionC from "./components/SectionC";
import SectionD from "./components/SectionD";
import SectionE from "./components/SectionE";
import SectionG from "./components/SectionG";
import Footer from "./components/XFooter";
import ScrollToTop from "./components/ScrollToTop";
import EmbeddedForm from "./components/EmbeddedForm";
import GoalReport from "./components/GoalReport";

import { useEffect } from "react";

function App() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, []);
  return (
    <div>
      <SectionA />
      <SectionB />
      <SectionC />
      <SectionD />
      <SectionE />
      <SectionG />
      <GoalReport />
      <EmbeddedForm />
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default App;
