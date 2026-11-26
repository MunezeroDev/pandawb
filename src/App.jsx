import Hero from "./sections/Hero";
import About from "./sections/About";
import Features from "./sections/Features";
import InAction from "./sections/InAction";
import RecentEvents from "./sections/RecentEvents";
import UpcomingEvents from "./sections/UpcomingEvents";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import ScrollToTopButton from "./components/ui/ScrollToTopButton";
import useHashScroll from "./hooks/useHashScroll";

export default function App() {
  useHashScroll();

  return (
    <div>
      <Header />
      <Hero />
      <About />
      <Features />
      <InAction />
      <RecentEvents />
      <UpcomingEvents />
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
