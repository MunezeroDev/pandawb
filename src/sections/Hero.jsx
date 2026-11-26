import useIsMobile from "../hooks/useIsMobile";
import HeroBadge from "../components/hero/HeroBadge";
import HeroCtas from "../components/hero/HeroCtas";
import HeroStats from "../components/hero/HeroStats";
import HeroPhone from "../components/hero/HeroPhone";
import BrushUnderline from "../components/hero/BrushUnderline";
import SproutVine from "../components/hero/Sprout";

const SUBHEADLINE =
  "Plant with friends, watch every tree you grow, and turn each one into a memory you can share — climate action that feels like fun.";

/**
 * "Make memories." with a brush-stroke underline drawn in code. With `sprout`,
 * a vine grows out of the period into the gap beside the headline. It only
 * shows from 1200px, where that gap is wide, and steps up in size with it
 * (about 110px of free space at 1200px, 170px at 1366px, 500px+ at 1600px),
 * so it never reaches the phone's green circle or the floating cards.
 */
const MakeMemories = ({ className = "", sprout = false }) => (
  <span className={`relative block w-fit text-brand-pressed ${className}`}>
    Make memories.
    <BrushUnderline className="absolute top-[90%] left-[1%] h-[0.26em] w-[97%] md:h-[0.22em]" />
    {sprout && (
      <SproutVine className="absolute top-[calc(100%-0.25em)] left-[calc(100%-0.17em)] hidden w-[1.35em] -translate-x-[2%] -translate-y-[31%] min-[1200px]:block min-[1366px]:w-[1.95em] min-[1600px]:w-[2.4em]" />
    )}
  </span>
);

/** Mobile: headline, subheadline and the primary CTA only (no badge, secondary CTA or stats). */
function MobileHero() {
  return (
    <div className="flex flex-col">
      <div>
        <h1 className="mt-2 font-display text-[clamp(36px,10vw,50px)] leading-[1.03] font-normal text-ink">
          <span className="block">Plant trees.</span>
          <MakeMemories className="mt-1" />
        </h1>
        <p className="mt-8 mb-0 font-display text-[clamp(18px,4.5vw,22px)] leading-[1.45] font-normal text-muted">
          {SUBHEADLINE}
        </p>
        <div className="mt-6 mb-8">
          <HeroCtas showSecondary={false} />
        </div>
      </div>

      <HeroPhone compact />
    </div>
  );
}

/**
 * Two columns (55/45), vertically centred: message left, phone right.
 * Tablet uses the same grid with a smaller phone and type.
 */
function DesktopHero() {
  return (
    <div className="grid grid-cols-[55fr_45fr] items-center gap-12 px-[3.25rem]">
      <div className="min-w-0">
        <HeroBadge />
        <h1 className="mt-6 mb-0 font-display text-[clamp(48px,5.6vw,80px)] leading-[1.03] font-normal text-ink">
          <span className="block">Plant trees.</span>
          <MakeMemories sprout />
        </h1>
        <p className="mt-10 mb-0 max-w-[34rem] font-display text-[clamp(18px,1.6vw,22px)] leading-[1.5] font-normal text-muted">
          {SUBHEADLINE}
        </p>
        <HeroCtas className="mt-8" />
        <HeroStats className="mt-10 tablet:mt-8" />
      </div>

      <div className="flex min-w-0 justify-center">
        <HeroPhone />
      </div>
    </div>
  );
}

export default function Hero() {
  const isMobile = useIsMobile();

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-white px-6 pt-8 pb-10 font-body md:px-0 md:pt-12 md:pb-14"
    >
      {isMobile ? <MobileHero /> : <DesktopHero />}
    </section>
  );
}
