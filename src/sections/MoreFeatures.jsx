import FeatureGrid from "../components/ui/FeatureGrid";
import Reveal from "../components/ui/Reveal";
import useIsMobile from "../hooks/useIsMobile";
import { MORE_FEATURES } from "../data/features";

export default function MoreFeatures() {
  const isMobile = useIsMobile();
  // On phones these features are part of the Features showcase.
  if (isMobile) return null;

  return (
    <section className="bg-white px-6 py-10 font-body md:min-h-[80vh] md:mx-[3.25rem] md:px-0 md:pt-7 md:pb-0 tablet:min-h-0 tablet:pt-6 tablet:pb-2">
      <Reveal as="header" className="mb-8 text-center md:mb-12 tablet:mb-6">
        <h1 className="font-display text-[clamp(36px,10vw,56px)] leading-[1.05] font-normal tracking-[-1px] text-ink md:text-[clamp(48px,6vw,80px)]">
          More <span className="font-bold text-brand">Features</span>
        </h1>
      </Reveal>

      <FeatureGrid features={MORE_FEATURES} />
    </section>
  );
}
