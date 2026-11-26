/** Feature card for tablet/desktop: cropped image, title + description, lift-on-hover. */
export default function FeatureCard({ feature }) {
  return (
    <div className="flex h-full min-w-0 flex-[1_1_0] cursor-pointer flex-col overflow-hidden rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.10)] [transform:translateY(0)_scale(1)] [transition:transform_0.32s_cubic-bezier(0.34,1.56,0.64,1),box-shadow_0.32s_ease] hover:shadow-[0_28px_60px_rgba(0,191,99,0.22),0_8px_24px_rgba(0,0,0,0.18)] hover:[transform:translateY(-10px)_scale(1.025)] tablet:hover:[transform:translateY(-6px)]">
      <div className="flex h-[300px] items-center justify-center bg-placeholder font-sans text-[13px] tracking-[0.5px] text-[#999] tablet:h-[260px]">
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
