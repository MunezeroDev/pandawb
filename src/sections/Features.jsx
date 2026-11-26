import FeatureCarousel from "../components/ui/FeatureCarousel";
import FeatureShowcase from "../components/ui/FeatureShowcase";
import Reveal from "../components/ui/Reveal";
import useIsMobile, { useIsTablet } from "../hooks/useIsMobile";
import useMediaQuery from "../hooks/useMediaQuery";
import { ALL_FEATURES } from "../data/features";

export default function Features() {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  // Small tablets (768px class): descriptions sit on the image as an overlay.
  const isNarrowTablet = useMediaQuery("(min-width: 768px) and (max-width: 899px)");

  return (
    <section
      id="features"
      className="bg-white px-5 py-10 font-body md:mx-[3.25rem] md:px-0 md:pt-8 md:pb-10 tablet:pt-6 tablet:pb-6"
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

      {/* Every feature in one carousel: auto-playing showcase on phones, 3/4-up on larger screens. */}
      {isMobile ? (
        <FeatureShowcase features={ALL_FEATURES} />
      ) : (
        <FeatureCarousel
          features={ALL_FEATURES}
          visible={isTablet ? 3 : 4}
          overlay={isNarrowTablet}
        />
      )}
    </section>
  );
}
