import ProgressBar from "../ui/ProgressBar";

/** Detail card for a single planting drive. */
export default function GoalStory({ goal }) {
  return (
    <div className="rounded-[24px] border border-mint-200 bg-mint-100 px-[18px] pt-[22px] pb-6 md:px-[38px] md:pt-8 md:pb-[34px]">
      <div className="flex flex-wrap items-center gap-[10px]">
        <span className="text-[17px] font-bold text-ink">{goal.when}</span>
        <span className="ml-0 rounded-[50px] border border-mint-400 px-[14px] py-[5px] text-[13px] text-brand-deep italic md:ml-auto">
          {goal.platform}
        </span>
      </div>

      <h2 className="mt-[14px] mb-3 max-w-[26ch] text-[clamp(24px,6.5vw,30px)] leading-[1.12] font-normal tracking-[-0.5px] text-ink md:text-[clamp(28px,3vw,40px)]">
        {goal.title}
      </h2>
      <p className="max-w-[70ch] text-[16px] leading-[1.75] text-ink-soft md:text-[18px]">
        {goal.text}
      </p>

      <div className="mt-[18px] mb-[22px] flex flex-wrap gap-2">
        {goal.partners.map((partner) => (
          <span
            key={partner}
            className="rounded-[50px] border border-mint-200 bg-white px-[14px] py-[6px] text-[14px] text-ink"
          >
            {partner}
          </span>
        ))}
      </div>

      <div className="flex max-w-[640px] flex-wrap gap-x-8 gap-y-[18px]">
        <ProgressBar
          label="Trees planted"
          value={goal.planted}
          max={goal.planted}
          strong
        />
        <ProgressBar
          label="Trees tracked on Panda"
          value={goal.tracked}
          max={goal.planted}
        />
      </div>
    </div>
  );
}
