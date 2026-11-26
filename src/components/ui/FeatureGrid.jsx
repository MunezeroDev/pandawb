import { useIsTablet } from "../../hooks/useIsMobile";
import FeatureCard from "./FeatureCard";
import FeatureCarousel from "./FeatureCarousel";

/** Tablets: 3-up carousel. Desktop: equal-width row. (Phones use FeatureShowcase.) */
export default function FeatureGrid({ features }) {
  const isTablet = useIsTablet();

  if (isTablet) return <FeatureCarousel features={features} />;

  return (
    <div className="flex flex-row items-stretch gap-7">
      {features.map((feature) => (
        <FeatureCard key={feature.title} feature={feature} />
      ))}
    </div>
  );
}
