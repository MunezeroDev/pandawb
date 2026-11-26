import clsx from "clsx";
import aboutUs from "../assets/images/about/about-us.webp";

const inlineLinkClass = "font-medium text-brand no-underline";

function VisionButton() {
  return (
    <button className="cursor-pointer rounded-[6px] border-none bg-brand px-10 py-[14px] font-display text-[13px] font-bold tracking-[2.5px] text-white uppercase [transition:background_0.2s_ease,transform_0.15s_ease] hover:bg-brand-hover hover:[transform:translateY(-1px)]">
      VISION
    </button>
  );
}

/** `centred`: tablet layout, full-width paragraph without the side rule. */
function VisionText({ centred = false }) {
  return (
    <p
      className={clsx(
        "font-display text-[16px] leading-[1.75] text-ink-soft italic md:text-[18px]",
        centred
          ? "w-full text-center"
          : "ml-1 border-l-2 border-brand pl-5 md:pl-7",
      )}
    >
      Our vision is to transform tree-planting into a vibrant global movement
      through a fun, gamified experience that blends artistic collages, picture
      sharing, and the power of social media, towards a future-forward token
      economy that reward real-world environmental action and inspire millions
      to heal the earth and secure a greener future
    </p>
  );
}

export default function About() {
  return (
    <section
      id="about"
      className="overflow-hidden px-6 py-10 font-body md:min-h-[80vh] md:mx-[3.25rem] md:px-0 md:pt-7 md:pb-0 tablet:min-h-0 tablet:pt-6 tablet:pb-4"
    >
      <header className="mb-7 md:mb-10 tablet:mb-6">
        <h1 className="font-display text-[clamp(48px,12vw,80px)] leading-[1.03] font-normal tracking-[-2px] text-ink md:text-[clamp(56px,6vw,80px)]">
          About <span className="text-brand">Panda</span>
        </h1>
      </header>

      <div className="flex flex-col items-start gap-7 md:flex-row md:gap-[60px] tablet:gap-8">
        <div className="w-full shrink-0 md:w-[min(46%,520px)]">
          <img
            src={aboutUs}
            alt="Panders planting trees together"
            className="block aspect-[4/3] w-full rounded-[20px] object-cover"
          />
        </div>

        <div className="flex flex-1 flex-col gap-5 pt-0 md:gap-7 md:pt-2">
          <p className="font-display text-[16px] leading-[1.75] text-muted md:text-[18px]">
            Panda was founded in 2025 to tackle deforestation by redefining
            what tree-planting means in the modern era. Panda brings together a
            vibrant ecosystem — the{" "}
            <a href="#" className={inlineLinkClass}>
              Panda App
            </a>
            , Panda{" "}
            <a href="#" className={inlineLinkClass}>
              Club
            </a>
            , Panda{" "}
            <a href="#" className={inlineLinkClass}>
              Systems
            </a>
            , and our passionate community of{" "}
            <a href="#" className={inlineLinkClass}>
              Panders
            </a>{" "}
            — to make restoring the planet fun, social, and deeply impactful.
          </p>

          <div className="flex flex-col gap-5 md:gap-7 tablet:hidden">
            <div>
              <VisionButton />
            </div>
            <VisionText />
          </div>
        </div>
      </div>

      {/* Tablet: Vision centred under both columns, paragraph full width. */}
      <div className="mt-8 hidden flex-col items-center gap-5 tablet:flex">
        <VisionButton />
        <VisionText centred />
      </div>
    </section>
  );
}
