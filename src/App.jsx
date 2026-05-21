import SectionA from "./components/SectionA";
import SectionB from "./components/SectionB";
import SectionC from "./components/SectionC";
import SectionD from "./components/SectionD";
import SectionE from "./components/SectionE";
import SectionG from "./components/SectionG";
import Footer from "./components/XFooter";
import ScrollToTop from "./components/ScrollToTop";

import { useEffect } from "react";

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
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default App;
