import useIsMobile from "../../hooks/useIsMobile";
import FeatureCard from "./FeatureCard";

/** Column of cards on mobile, equal-width row on desktop. */
export default function FeatureGrid({ features, mobileLabelClass }) {
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col items-center gap-5 md:flex-row md:items-stretch md:gap-7">
      {features.map((feature) => (
        <FeatureCard
          key={feature.title}
          feature={feature}
          isMobile={isMobile}
          mobileLabelClass={mobileLabelClass}
        />
      ))}
    </div>
  );
}
