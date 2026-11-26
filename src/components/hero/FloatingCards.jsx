import clsx from "clsx";
import collage from "../../assets/images/features/collage.webp";
import { SproutIcon } from "./icons";

const shell =
  "absolute z-10 flex items-center bg-white font-display shadow-[0_12px_32px_rgba(15,45,28,0.14)] animate-float-card motion-reduce:animate-none";

/** A zoomed crop of the planting collage, used for the avatar and thumbnail. */
const CollageCrop = ({ className, size, position }) => (
  <span
    aria-hidden="true"
    className={clsx("block shrink-0 bg-no-repeat", className)}
    style={{
      backgroundImage: `url(${collage})`,
      backgroundSize: size,
      backgroundPosition: position,
    }}
  />
);

export function ActivityCard({ compact, className }) {
  return (
    <div
      className={clsx(
        shell,
        "rounded-2xl",
        compact ? "max-w-[150px] gap-2 p-2" : "max-w-[230px] gap-3 p-3 tablet:max-w-[180px] tablet:p-2",
        className,
      )}
    >
      <CollageCrop
        size="560% auto"
        position="22% 63%"
        className={clsx(
          "rounded-full",
          compact ? "size-7" : "size-10 tablet:size-8",
        )}
      />
      <div className="min-w-0">
        <p
          className={clsx(
            "m-0 leading-[1.25] font-bold text-ink",
            compact ? "text-[11px]" : "text-[14px] tablet:text-[12px]",
          )}
        >
          Amara planted a mango tree
        </p>
        <p
          className={clsx(
            "m-0 mt-0.5 text-subtle",
            compact ? "text-[10px]" : "text-[12px] tablet:text-[11px]",
          )}
        >
          Nairobi · 2 min ago
        </p>
      </div>
    </div>
  );
}

export function MilestoneCard({ compact, className }) {
  return (
    <div
      className={clsx(
        shell,
        compact ? "rounded-2xl" : "rounded-full tablet:rounded-2xl",
        "font-bold text-ink [animation-delay:-2s]",
        compact
          ? "gap-1.5 px-3 py-1.5 text-[11px]"
          : "gap-2 px-4 py-2 text-[14px] tablet:px-3 tablet:text-[12px]",
        className,
      )}
    >
      <span className="flex shrink-0 items-center justify-center text-brand-ink">
        <SproutIcon className={compact ? "size-3.5" : "size-4"} />
      </span>
      <span
        className={
          compact
            ? "max-w-[110px] leading-[1.25]"
            : "whitespace-nowrap tablet:max-w-[120px] tablet:leading-[1.25] tablet:whitespace-normal"
        }
      >
        Your oak just turned 6 months
      </span>
    </div>
  );
}

export function MemoryCard({ compact, className }) {
  return (
    <div
      className={clsx(
        shell,
        "rounded-2xl [animation-delay:-4s]",
        compact ? "gap-2 p-2" : "gap-3 p-3 tablet:p-2",
        className,
      )}
    >
      <CollageCrop
        size="210% auto"
        position="96% 6%"
        className={clsx(
          "rounded-xl",
          compact ? "size-8 rounded-lg" : "size-14 tablet:size-11",
        )}
      />
      <div>
        <p
          className={clsx(
            "m-0 font-bold tracking-[1.5px] text-brand-ink",
            compact ? "text-[9px]" : "text-[11px] tablet:text-[10px]",
          )}
        >
          MEMORY SAVED
        </p>
        <p
          className={clsx(
            "m-0 mt-0.5 leading-[1.25] font-bold whitespace-nowrap text-ink",
            compact ? "text-[11px]" : "text-[14px] tablet:text-[12px]",
          )}
        >
          Class of &apos;26 grove
        </p>
        <p
          className={clsx(
            "m-0 mt-0.5 whitespace-nowrap text-subtle",
            compact ? "text-[10px]" : "text-[12px] tablet:text-[11px]",
          )}
        >
          12 friends · 12 trees
        </p>
      </div>
    </div>
  );
}
