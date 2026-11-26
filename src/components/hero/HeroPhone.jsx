import clsx from "clsx";
import appMockup from "../../assets/images/hero/app-mockup.webp";
import { ActivityCard, MemoryCard, MilestoneCard } from "./FloatingCards";

/**
 * Phone mockup on a solid green circle with floating activity cards.
 * `compact` is the mobile variant: it keeps the original mobile stage
 * (260px wide, 320px circle, 180px phone) and uses smaller cards.
 */
export default function HeroPhone({ compact = false }) {
  return (
    <div
      className={clsx(
        "relative flex justify-center self-center",
        compact
          ? "w-[260px]"
          : "w-full max-w-[480px] items-center tablet:max-w-[340px]",
      )}
    >
      {/* Solid soft-green circle + accent dots */}
      <div
        aria-hidden="true"
        className={clsx(
          "absolute z-[1] rounded-full bg-mint-300",
          compact
            ? "top-5 left-1/2 size-[320px] -translate-x-1/2"
            : "top-1/2 left-1/2 size-[480px] -translate-1/2 tablet:size-[340px]",
        )}
      >
        <span className="absolute top-[12%] right-[10%] size-3 rounded-full bg-brand" />
        <span className="absolute bottom-[14%] left-[8%] size-5 rounded-full bg-mint" />
      </div>

      <div
        className={clsx(
          "relative z-[2] shrink-0",
          compact ? "w-[180px]" : "w-[300px] tablet:w-[220px]",
        )}
      >
        <img
          src={appMockup}
          alt="The Panda app welcome screen: logo, Rooted in Action, Get Started and Login"
          className="block h-auto w-full drop-shadow-[0_24px_48px_rgba(0,0,0,0.22)]"
        />
        {/* Hides the stats strip baked into the mockup's screen. */}
        <span
          aria-hidden="true"
          className="absolute top-[83.5%] right-[5%] bottom-[4.5%] left-[5%] rounded-b-[12%_28%] bg-[linear-gradient(to_bottom,#060d12,#0a171b_40%,#0a1619)]"
        />

        <ActivityCard
          compact={compact}
          className={
            compact
              ? "top-[10%] -left-[22%]"
              : "top-[11%] -left-[26%] tablet:-left-[30%]"
          }
        />
        <MilestoneCard
          compact={compact}
          className={
            compact
              ? "top-[38%] -right-[30%]"
              : "top-[36%] -right-[34%] tablet:-right-[18%]"
          }
        />
        <MemoryCard
          compact={compact}
          className={
            compact
              ? "bottom-[6%] -right-[24%]"
              : "bottom-[7%] -right-[22%] tablet:-right-[20%]"
          }
        />
      </div>
    </div>
  );
}
