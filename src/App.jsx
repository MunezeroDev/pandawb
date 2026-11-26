import Hero from "./sections/Hero";
import About from "./sections/About";
import Features from "./sections/Features";
import MoreFeatures from "./sections/MoreFeatures";
import HowItWorks from "./sections/HowItWorks";
import InAction from "./sections/InAction";
import GoalReport from "./sections/GoalReport";
import RegistrationForm from "./sections/RegistrationForm";
import Footer from "./components/layout/Footer";
import ScrollToTopButton from "./components/ui/ScrollToTopButton";
import useHashScroll from "./hooks/useHashScroll";

export default function App() {
  useHashScroll();

  return (
    <div>
      <Hero />
      <About />
      <Features />
      <MoreFeatures />
      <HowItWorks />
      <InAction />
      <GoalReport />
      <RegistrationForm />
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
