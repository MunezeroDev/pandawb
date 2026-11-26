import { useRef } from "react";
import Navbar from "../components/layout/Navbar";
import DownloadButton from "../components/ui/DownloadButton";
import useIsMobile from "../hooks/useIsMobile";
import logo from "../assets/images/hero/panda-logo.webp";
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

function MobileHero({ scopeRef }) {
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
        <div className="w-[80%] overflow-hidden">
          <div className="mt-6">
            <DownloadButton scopeRef={scopeRef} />
          </div>
        </div>
      </div>

      {/* Phone on a green blob, centred */}
      <div className="relative mb-0 h-[380px] w-[260px] self-center">
        <div
          className={`absolute top-5 left-1/2 z-[1] h-[320px] w-[320px] -translate-x-1/2 rounded-[50%] ${BLOB_GRADIENT}`}
        />
        <div className="absolute top-0 left-1/2 z-[2] -translate-x-1/2">
          <PhoneMockup className="w-[180px]" />
        </div>
      </div>
    </div>
  );
}

function DesktopHero() {
  const rightColumnRef = useRef(null);

  return (
    <div className="flex flex-row items-start justify-between">
      <div className="mt-[2rem] max-w-full flex-[0_0_100%]">
        <h1 className="flex flex-wrap items-center font-display text-[clamp(72px,7.5vw,108px)] leading-[1.03] font-normal text-ink">
          Plant trees&nbsp;
          <SeedlingIcon src={seedling} />
        </h1>
        <h1 className="mb-[2rem] font-display text-[clamp(72px,7.5vw,108px)] leading-[1.03] font-normal text-brand">
          Make memories.
        </h1>
        <p className="mt-6 mb-0 font-display text-[clamp(28px,3vw,40px)] leading-[1.45] font-normal text-slate">
          <Tagline />
        </p>
        <img src={wavyUnderline} alt="" />
      </div>

      {/* Download button + phone on a green blob, pinned to the right */}
      <div
        ref={rightColumnRef}
        className="absolute top-[120px] right-[100px] flex flex-col items-start"
      >
        <DownloadButton scopeRef={rightColumnRef} />
        <div className="relative ml-auto h-[560px] w-[360px]">
          <div
            className={`absolute top-5 right-0 z-[1] h-[480px] w-[460px] rounded-[50%] ${BLOB_GRADIENT}`}
          />
          <div className="relative z-[2]">
            <PhoneMockup className="w-[260px]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const isMobile = useIsMobile();
  const heroRef = useRef(null);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen overflow-hidden bg-white px-6 pt-5 pb-0 font-body md:ml-20 md:px-[52px] md:pt-7"
    >
      <Navbar isMobile={isMobile} />

      {/* Logo + wordmark */}
      <div className="relative z-[120] mb-7 flex w-fit items-center gap-[0.2rem] md:mb-9">
        <img
          src={logo}
          alt="Panda Logo"
          className="w-[85px] md:w-[clamp(110px,18vw,170px)]"
        />
        <span className="self-end pt-[2px] font-wordmark text-[22px] leading-none font-normal tracking-[2px] text-brand md:text-[48px]">
          Panda
        </span>
      </div>

      {isMobile ? <MobileHero scopeRef={heroRef} /> : <DesktopHero />}
    </section>
  );
}
