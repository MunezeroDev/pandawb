import FeatureGrid from "../components/ui/FeatureGrid";
import { CORE_FEATURES } from "../data/features";

export default function Features() {
  return (
    <section
      id="features"
      className="min-h-[80vh] bg-white px-5 pt-[25px] pb-14 font-body md:ml-20 md:px-[52px] md:pt-8 md:pb-5"
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
