import { useEffect, useState } from "react";
import Reveal from "../components/ui/Reveal";
import { FORM_VISIBLE_HOURS, UPCOMING_EVENT } from "../data/upcomingEvent";

const HOUR_MS = 60 * 60 * 1000;

/** Epoch ms after which the registration form is hidden, or null if no event. */
const closesAt = (event) =>
  event ? new Date(event.startsAt).getTime() + FORM_VISIBLE_HOURS * HOUR_MS : null;

/** Re-renders every minute so the form hides itself without a reload. */
function useNow(intervalMs = 60_000) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);
  return now;
}

function Countdown({ to, now }) {
  const ms = Math.max(0, to - now);
  const parts = [
    [Math.floor(ms / (24 * HOUR_MS)), "days"],
    [Math.floor(ms / HOUR_MS) % 24, "hrs"],
    [Math.floor(ms / 60_000) % 60, "min"],
  ];
  return (
    <div className="flex justify-center gap-3">
      {parts.map(([value, label]) => (
        <div
          key={label}
          className="min-w-[72px] rounded-[16px] bg-white px-4 py-3 text-center shadow-[0_8px_20px_-10px_rgba(0,191,99,0.35)]"
        >
          <p className="text-[28px] leading-none font-bold text-brand">
            {String(value).padStart(2, "0")}
          </p>
          <p className="mt-1 font-sans text-[11px] tracking-[1.5px] text-subtle uppercase">
            {label}
          </p>
        </div>
      ))}
    </div>
  );
}

export default function UpcomingEvents() {
  const now = useNow();
  const until = closesAt(UPCOMING_EVENT);
  const isOpen = until !== null && now < until;
  // Nothing to register for: the section stays hidden.
  if (!isOpen) return null;
  const startsAt = new Date(UPCOMING_EVENT.startsAt).getTime();

  return (
    <section
      id="upcoming"
      className="relative mb-[1rem] overflow-hidden bg-form-bg px-0 py-12 font-body md:pt-[52px] md:pb-[60px]"
    >
      <div className="pointer-events-none absolute -top-20 -left-20 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(0,191,99,0.18),transparent_70%)]" />
      <div className="pointer-events-none absolute -right-16 -bottom-16 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(0,191,99,0.14),transparent_70%)]" />

      <Reveal as="header" className="relative mb-8 px-5 text-center md:mb-10">
        <p className="mb-3 font-sans text-[12px] font-bold tracking-[3px] text-brand uppercase">
          Join the next drive
        </p>
        <h1 className="font-display text-[clamp(36px,10vw,56px)] leading-none font-normal tracking-[-1px] text-ink md:text-[clamp(36px,5vw,72px)]">
          Upcoming <span className="font-bold text-brand italic">Events</span>
        </h1>
      </Reveal>

      <div className="relative">
        <div className="mb-8 px-5 text-center">
          <p className="mb-4 text-[18px] text-ink-soft">
            {UPCOMING_EVENT.title} ·{" "}
            {new Date(startsAt).toLocaleDateString(undefined, {
              weekday: "short",
              day: "numeric",
              month: "long",
            })}
          </p>
          {now < startsAt ? (
            <Countdown to={startsAt} now={now} />
          ) : (
            <p className="font-sans text-[13px] font-bold tracking-[1.5px] text-brand uppercase">
              Happening now · registration still open
            </p>
          )}
        </div>
        <iframe
          src={UPCOMING_EVENT.formUrl}
          title="Panda event registration form"
          frameBorder="0"
          marginHeight="0"
          marginWidth="0"
          scrolling="no"
          className="block h-[2190px] w-full md:h-[1970px]"
        >
          Loading…
        </iframe>
      </div>
    </section>
  );
}
