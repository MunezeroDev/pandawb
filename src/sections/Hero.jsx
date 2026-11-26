import AppLinkButton from "../components/ui/AppLinkButton";
import useIsMobile from "../hooks/useIsMobile";
import appMockup from "../assets/images/hero/app-mockup.webp";
import wavyUnderline from "../assets/images/hero/wavy-underline.webp";
import seedling from "../assets/images/hero/seedling.jpg";
import seedlingMobile from "../assets/images/hero/seedling-mobile.png";

const BLOB_GRADIENT =
  "bg-[linear-gradient(to_bottom,#3ecf7a,#6ddba0,#a8edcc,#d4f5e8,#e7f1ed,#fff)]";

const Tagline = () => (
  <>
    Fun&nbsp;meets climate action
    <br />
    but it&apos;s more than that!
  </>
);

const PhoneMockup = ({ className }) => (
  <img
    src={appMockup}
    alt="Panda App Mockup"
    className={`relative z-[2] h-auto shrink-0 object-contain drop-shadow-[0_24px_48px_rgba(0,0,0,0.22)] ${className}`}
  />
);

const SeedlingIcon = ({ src }) => (
  <img
    src={src}
    alt="seedlingIcon"
    className="ml-[6px] h-[1em] w-auto align-middle"
  />
);

function MobileHero() {
  return (
    <div className="flex flex-col">
      <div>
        <h1 className="flex flex-wrap items-center font-display text-[clamp(36px,10vw,50px)] leading-[1.03] font-normal text-ink">
          Plant trees
          <span>
            <SeedlingIcon src={seedlingMobile} />
          </span>
        </h1>
        <h1 className="mb-[1rem] font-display text-[clamp(36px,10vw,50px)] leading-[1.03] font-normal text-brand">
          Make memories.
        </h1>
        <p className="-mt-3 -mb-1 font-display text-[clamp(18px,4.5vw,22px)] leading-[1.45] font-normal text-slate">
          <Tagline />
        </p>
        <div className="mt-6 mb-8">
          <AppLinkButton />
        </div>
      </div>

      {/* Phone on a green blob, centred; the stage is as tall as the phone. */}
      <div className="relative flex w-[260px] justify-center self-center">
        <div
          className={`absolute top-5 left-1/2 z-[1] h-[320px] w-[320px] -translate-x-1/2 rounded-[50%] ${BLOB_GRADIENT}`}
        />
        <PhoneMockup className="w-[180px]" />
      </div>
    </div>
  );
}

/**
 * Two real columns (no absolute positioning) so the phone can never cover the
 * headline; type and phone both step down on smaller tablets.
 */
function DesktopHero() {
  return (
    <div className="flex flex-row items-center justify-between gap-6 lg:gap-10">
      <div className="min-w-0 flex-1">
        <h1 className="flex flex-wrap items-center font-display text-[clamp(44px,6.2vw,96px)] leading-[1.03] font-normal text-ink">
          Plant trees&nbsp;
          <SeedlingIcon src={seedling} />
        </h1>
        <h1 className="mb-[2rem] font-display text-[clamp(44px,6.2vw,96px)] leading-[1.03] font-normal text-brand">
          Make memories.
        </h1>
        <p className="mt-6 mb-0 font-display text-[clamp(20px,2.4vw,36px)] leading-[1.45] font-normal text-slate">
          <Tagline />
        </p>
        <img src={wavyUnderline} alt="" className="max-w-full" />
      </div>

      {/* Button + phone on a green blob, flush with the right gutter */}
      <div className="flex shrink-0 flex-col items-center gap-8">
        <AppLinkButton />
        <div className="relative flex w-[230px] justify-center lg:w-[300px] xl:w-[400px]">
          <div
            className={`absolute top-5 right-0 z-[1] h-[240px] w-full rounded-[50%] lg:h-[320px] xl:h-[420px] ${BLOB_GRADIENT}`}
          />
          <PhoneMockup className="w-[170px] lg:w-[210px] xl:w-[250px]" />
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const isMobile = useIsMobile();

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-white px-6 pt-8 pb-10 font-body md:mx-[3.25rem] md:px-0 md:pt-10 md:pb-16"
    >
      {isMobile ? <MobileHero /> : <DesktopHero />}
    </section>
  );
}
