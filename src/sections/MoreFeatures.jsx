import FeatureGrid from "../components/ui/FeatureGrid";
import { MORE_FEATURES } from "../data/features";

export default function MoreFeatures() {
  return (
    <section className="bg-white px-6 py-10 font-body md:min-h-[80vh] md:mx-[3.25rem] md:px-0 md:pt-7 md:pb-0">
      <header className="mb-8 text-center md:mb-12">
        <h1 className="font-display text-[clamp(36px,10vw,56px)] leading-[1.05] font-normal tracking-[-1px] text-ink md:text-[clamp(48px,6vw,80px)]">
          More <span className="font-bold text-brand">Features</span>
        </h1>
      </header>

      <FeatureGrid
        features={MORE_FEATURES}
        mobileLabelClass="px-5 pt-[18px] pb-[22px]"
      />
    </section>
  );
}
