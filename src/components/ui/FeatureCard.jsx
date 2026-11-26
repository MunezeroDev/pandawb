import clsx from "clsx";

const lift =
  "cursor-pointer overflow-hidden rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.10)] [transform:translateY(0)_scale(1)] [transition:transform_0.32s_cubic-bezier(0.34,1.56,0.64,1),box-shadow_0.32s_ease] hover:shadow-[0_28px_60px_rgba(0,191,99,0.22),0_8px_24px_rgba(0,0,0,0.18)] hover:[transform:translateY(-10px)_scale(1.025)] tablet:hover:[transform:translateY(-6px)]";

/**
 * Details layer shared by the phone showcase and small-tablet cards: brand
 * green fading up into the screenshot, so the image stays visible above it.
 */
export function FeatureDetails({ feature, open, size = "md" }) {
  return (
    <div
      className={clsx(
        "absolute inset-0 flex flex-col justify-end bg-linear-to-t from-brand from-0% via-brand/90 via-40% to-transparent to-75% [transition:opacity_0.5s_ease,transform_0.5s_cubic-bezier(0.22,1,0.36,1)]",
        size === "lg" ? "px-6 pb-7" : "px-4 pb-5",
        open ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0",
      )}
    >
      <span className="mb-3 h-[3px] w-10 rounded-full bg-white/80" />
      <h3
        className={clsx(
          "font-display leading-[1.15] font-bold text-white",
          size === "lg" ? "text-[24px]" : "text-[18px]",
        )}
      >
        {feature.title}
      </h3>
      <p
        className={clsx(
          "mt-2 font-display leading-[1.55] text-white/95",
          size === "lg" ? "text-[15px]" : "text-[13px]",
        )}
      >
        {feature.description}
      </p>
    </div>
  );
}

/**
 * Feature card for tablet/desktop: cropped image, title + description,
 * lift-on-hover. `overlay` (small tablets) puts the description over the
 * image; it slides up once `revealed` and then stays.
 */
export default function FeatureCard({ feature, overlay = false, revealed = false }) {
  if (overlay) {
    return (
      <div className={clsx(lift, "relative w-full bg-navy")}>
        <div className="aspect-[4/5]">
          <img
            src={feature.image}
            alt={feature.title}
            className="block h-full w-full object-contain"
          />
        </div>
        {/* Title bar until the details arrive */}
        <div
          className={clsx(
            "absolute inset-x-0 bottom-0 bg-brand px-4 py-3 [transition:opacity_0.35s_ease,transform_0.35s_ease]",
            revealed ? "translate-y-full opacity-0" : "translate-y-0 opacity-100",
          )}
        >
          <h3 className="text-center font-display text-[16px] leading-[1.2] font-bold text-white">
            {feature.title}
          </h3>
        </div>
        <FeatureDetails feature={feature} open={revealed} />
      </div>
    );
  }

  return (
    <div className={clsx(lift, "flex h-full w-full min-w-0 flex-col")}>
      <div className="flex h-[300px] shrink-0 items-center justify-center bg-placeholder font-sans text-[13px] tracking-[0.5px] text-[#999] tablet:h-[260px]">
        <img
          src={feature.image}
          alt={feature.title}
          className="block h-full w-full object-cover"
        />
      </div>
      <div className="flex-1 bg-brand px-[22px] pt-[22px] pb-7">
        <h3 className="mb-2 font-display text-[clamp(16px,1.5vw,20px)] leading-[1.2] font-bold text-white">
          {feature.title}
        </h3>
        <p className="font-display text-[clamp(13px,1vw,15px)] leading-[1.6] text-[rgba(255,255,255,0.88)]">
          {feature.description}
        </p>
      </div>
    </div>
  );
}
