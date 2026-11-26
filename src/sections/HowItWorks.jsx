import step1 from "../assets/images/how-it-works/step-1.webp";
import step2 from "../assets/images/how-it-works/step-2.webp";

const STEPS = [step1, step2];

export default function HowItWorks() {
  return (
    <section
      id="usingPanda"
      className="flex flex-col items-center justify-center overflow-hidden bg-white px-6 py-10 font-body md:min-h-[80vh] md:mx-[3.25rem] md:px-0 md:pt-[22px] md:pb-[60px]"
    >
      <header className="mb-8 w-full text-center md:mt-[2rem] md:mb-6">
        <h1 className="font-display text-[clamp(36px,10vw,56px)] leading-[1.05] font-normal tracking-[-1px] text-ink md:text-[clamp(24px,6vw,60px)]">
          How It <span className="font-bold text-brand">Works</span>
        </h1>
      </header>

      {/* Mobile: flat top corners with a shadow. Desktop: rounded, narrower, no shadow. */}
      <div className="w-full overflow-hidden rounded-b-[20px] bg-surface p-[10px] shadow-[0_4px_20px_rgba(0,0,0,0.10)] md:max-w-[550px] md:rounded-[24px] md:p-[2rem] md:shadow-none">
        {STEPS.map((src) => (
          <img
            key={src}
            src={src}
            alt="How It Works — Panda App Steps"
            className="block h-auto w-full rounded-t-[8px] md:rounded-t-[14px]"
          />
        ))}
      </div>
    </section>
  );
}
