import Hero from "./sections/Hero";
import About from "./sections/About";
import Features from "./sections/Features";
import MoreFeatures from "./sections/MoreFeatures";
import HowItWorks from "./sections/HowItWorks";
import InAction from "./sections/InAction";
import HowItWorksInAction from "./sections/HowItWorksInAction";
import RecentEvents from "./sections/RecentEvents";
import UpcomingEvents from "./sections/UpcomingEvents";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import ScrollToTopButton from "./components/ui/ScrollToTopButton";
import useHashScroll from "./hooks/useHashScroll";
import { useIsTablet } from "./hooks/useIsMobile";

export default function App() {
  useHashScroll();
  const isTablet = useIsTablet();

  return (
    <div>
      <Header />
      <Hero />
      <About />
      <Features />
      <MoreFeatures />
      {isTablet ? (
        <HowItWorksInAction />
      ) : (
        <>
          <HowItWorks />
          <InAction />
        </>
      )}
      <RecentEvents />
      <UpcomingEvents />
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
