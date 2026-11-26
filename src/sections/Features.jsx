import FeatureGrid from "../components/ui/FeatureGrid";
import FeatureShowcase from "../components/ui/FeatureShowcase";
import Reveal from "../components/ui/Reveal";
import useIsMobile from "../hooks/useIsMobile";
import { ALL_FEATURES, CORE_FEATURES } from "../data/features";

export default function Features() {
  const isMobile = useIsMobile();

  return (
    <section
      id="features"
      className="bg-white px-5 py-10 font-body md:min-h-[80vh] md:mx-[3.25rem] md:px-0 md:pt-8 md:pb-5 tablet:min-h-0 tablet:pt-6 tablet:pb-2"
    >
      <Reveal as="header" className="mb-8 text-center md:mb-12 tablet:mb-6">
        <h1 className="font-display text-[clamp(36px,10vw,56px)] leading-[1.05] font-normal tracking-[-1px] text-ink md:text-[clamp(32px,6vw,70px)]">
          <span className="font-bold text-brand">Panda</span> Features
        </h1>
        {isMobile && (
          <p className="mt-3 font-sans text-[13px] tracking-[1px] text-subtle">
            Swipe or sit back and watch
          </p>
        )}
      </Reveal>

      {/* Phones get every feature (core + more) in one auto-playing showcase. */}
      {isMobile ? (
        <FeatureShowcase features={ALL_FEATURES} />
      ) : (
        <FeatureGrid features={CORE_FEATURES} />
      )}
    </section>
  );
}
