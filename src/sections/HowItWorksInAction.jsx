import Reveal from "../components/ui/Reveal";
import { HowItWorksSteps, HowItWorksTitle } from "./HowItWorks";
import { InActionTitle, InActionVideo } from "./InAction";

/**
 * Tablet-only (768–1039px): How It Works on the left, Panda in Action on the
 * right, in one section. Each half keeps its own id so header links still land.
 */
export default function HowItWorksInAction() {
  return (
    <section className="mx-[3.25rem] grid grid-cols-2 items-start gap-8 bg-white pt-8 pb-10 font-body">
      <Reveal id="usingPanda" className="flex flex-col items-center">
        <header className="mb-5 text-center">
          <HowItWorksTitle />
        </header>
        <HowItWorksSteps className="md:p-5" />
      </Reveal>

      <Reveal
        id="inAction"
        delay={120}
        className="flex flex-col items-center md:sticky md:top-[5.5rem]"
      >
        <InActionTitle className="mb-5" />
        <InActionVideo />
      </Reveal>
    </section>
  );
}
