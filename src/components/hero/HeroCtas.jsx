import { PANDA_APP_URL } from "../../constants/links";
import { ArrowRightIcon, PlayCircleIcon } from "./icons";

const shared =
  "group inline-flex min-h-[48px] items-center gap-2 rounded-full font-display text-[16px] font-bold whitespace-nowrap no-underline [transition:transform_0.18s_ease,box-shadow_0.18s_ease,background_0.18s_ease] hover:[transform:translateY(-2px)] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-brand-ink motion-reduce:transition-none motion-reduce:hover:transform-none";

/** Primary + (optional) secondary hero calls to action. */
export default function HeroCtas({ className = "", showSecondary = true }) {
  return (
    <div className={`flex flex-wrap items-center gap-3 md:gap-4 ${className}`}>
      <a
        href={PANDA_APP_URL}
        className={`${shared} bg-brand-ink px-7 text-white shadow-[0_8px_24px_rgba(0,191,99,0.35)] hover:shadow-[0_12px_28px_rgba(0,191,99,0.42)]`}
      >
        Plant your First Tree
        <ArrowRightIcon className="size-5 [transition:transform_0.2s_ease] group-hover:translate-x-1 motion-reduce:transition-none" />
      </a>
      {showSecondary && (
        <a
          href="#inAction"
          className={`${shared} border-2 border-solid border-brand-ink bg-white px-6 text-brand-ink hover:bg-mint-50`}
        >
          <PlayCircleIcon />
          See how it works
        </a>
      )}
    </div>
  );
}
