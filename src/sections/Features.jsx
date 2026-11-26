import FeatureGrid from "../components/ui/FeatureGrid";
import { CORE_FEATURES } from "../data/features";

export default function Features() {
  return (
    <section
      id="features"
      className="bg-white px-5 py-10 font-body md:min-h-[80vh] md:mx-[3.25rem] md:px-0 md:pt-8 md:pb-5"
    >
      <header className="mb-8 text-center md:mb-12">
        <h1 className="font-display text-[clamp(36px,10vw,56px)] leading-[1.05] font-normal tracking-[-1px] text-ink md:text-[clamp(32px,6vw,70px)]">
          <span className="font-bold text-brand">Panda</span> Features
        </h1>
      </header>

      <FeatureGrid features={CORE_FEATURES} mobileLabelClass="px-4 pt-3 pb-4" />
    </section>
  );
}
