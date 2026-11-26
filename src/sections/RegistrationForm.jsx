import { GOOGLE_FORM_URL } from "../constants/links";

export default function RegistrationForm() {
  return (
    <section
      id="form"
      className="mb-[1rem] overflow-hidden bg-form-bg px-0 py-10 font-body md:pt-[52px] md:pb-[60px]"
    >
      <header className="mb-4 text-center md:mb-8">
        <h1 className="font-display text-[clamp(36px,10vw,56px)] leading-none font-normal tracking-[-1px] text-ink md:text-[clamp(32px,4vw,72px)]">
          Google <span className="font-bold text-brand italic">Form</span>
        </h1>
      </header>

      <iframe
        src={GOOGLE_FORM_URL}
        title="Panda registration form"
        frameBorder="0"
        marginHeight="0"
        marginWidth="0"
        scrolling="no"
        className="block h-[2190px] w-full md:h-[1970px]"
      >
        Loading…
      </iframe>
    </section>
  );
}
