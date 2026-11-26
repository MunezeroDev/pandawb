import { useCallback, useLayoutEffect, useRef, useState } from "react";
import clsx from "clsx";
import useIsMobile from "../../hooks/useIsMobile";
import useScrollPast from "../../hooks/useScrollPast";
import useActiveSection from "../../hooks/useActiveSection";
import { NAV_ITEMS } from "../../data/navigation";

const NAV_IDS = NAV_ITEMS.map((item) => item.id);

// Same artwork at three resolutions; the browser picks the one that fits the
// rendered size and the screen's pixel density.
const base = import.meta.env.BASE_URL;
const LOGO_SRCSET = [512, 1024, 2048]
  .map((w) => `${base}logo-transparent-${w}.png ${w}w`)
  .join(", ");

function Brand() {
  return (
    <a
      href="#home"
      aria-label="Panda home"
      className="flex items-center gap-2 no-underline"
    >
      <img
        src={`${base}logo-transparent-512.png`}
        srcSet={LOGO_SRCSET}
        sizes="(min-width: 768px) 3.5rem, 2.75rem"
        alt=""
        className="h-[2.75rem] w-auto md:h-[3.5rem]"
      />
      <span className="font-wordmark text-[1.375rem] leading-none font-normal tracking-[0.08em] text-brand md:text-[1.75rem]">
        Panda
      </span>
    </a>
  );
}

const barClass =
  "block h-[2.5px] w-6 rounded-[2px] bg-brand [transition:all_0.3s_ease]";

/** Hamburger + full-width dropdown that opens under the header. */
function MobileMenu() {
  const [open, setOpen] = useState(false);
  useScrollPast(0.2, () => setOpen(false));

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        className="-mr-2 flex h-10 w-10 cursor-pointer flex-col items-center justify-center gap-[5px] border-none bg-transparent p-2"
      >
        <span
          className={clsx(
            barClass,
            open && "[transform:rotate(45deg)_translate(5px,5px)]",
          )}
        />
        <span className={clsx(barClass, open ? "opacity-0" : "opacity-100")} />
        <span
          className={clsx(
            barClass,
            open && "[transform:rotate(-45deg)_translate(5px,-5px)]",
          )}
        />
      </button>

      <div
        className={clsx(
          "absolute top-[calc(100%+1px)] left-0 flex w-full flex-col items-start justify-center overflow-hidden bg-mint [transition:height_0.35s_ease,opacity_0.28s_ease]",
          open ? "h-fit px-9 opacity-100" : "h-0 opacity-0",
        )}
      >
        {NAV_ITEMS.map(({ label, id }) => (
          <a
            key={id}
            href={`#${id}`}
            onClick={() => setOpen(false)}
            tabIndex={open ? 0 : -1}
            className="flex w-full items-center border-b border-[rgba(255,255,255,0.25)] py-[13px] font-display text-[16px] font-bold tracking-[2px] text-white uppercase no-underline [transition:opacity_0.18s_ease] hover:opacity-70"
          >
            <span>{label}</span>
          </a>
        ))}
      </div>
    </>
  );
}

/**
 * Text links with one green underline that glides beneath the hovered/focused
 * link and settles back under the section in view.
 */
function DesktopNav() {
  const activeId = useActiveSection(NAV_IDS);
  const [hoverId, setHoverId] = useState(null);
  const linkRefs = useRef({});
  const indicatorRef = useRef(null);

  const targetId = hoverId ?? activeId;

  // Positions the indicator straight on the DOM (no re-render needed).
  const measure = useCallback(() => {
    const indicator = indicatorRef.current;
    const el = targetId && linkRefs.current[targetId];
    if (!indicator) return;
    indicator.style.opacity = el ? "1" : "0";
    if (el) {
      indicator.style.transform = `translateX(${el.offsetLeft}px)`;
      indicator.style.width = `${el.offsetWidth}px`;
    }
  }, [targetId]);

  useLayoutEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  return (
    <nav
      className="relative flex items-center gap-5 lg:gap-7 tablet:gap-[14px]"
      onMouseLeave={() => setHoverId(null)}
    >
      {NAV_ITEMS.map(({ label, id }) => (
        <a
          key={id}
          ref={(el) => (linkRefs.current[id] = el)}
          href={`#${id}`}
          data-label={label}
          onMouseEnter={() => setHoverId(id)}
          onFocus={() => setHoverId(id)}
          onBlur={() => setHoverId(null)}
          aria-current={activeId === id ? "location" : undefined}
          className={clsx(
            // The invisible bold copy reserves the bold width so the active
            // state never shifts neighbouring links.
            "inline-flex flex-col items-center rounded-[4px] font-display text-[0.875rem] tracking-[0.01em] lg:text-[0.9375rem] no-underline outline-none [transition:color_0.2s_ease] after:invisible after:h-0 after:overflow-hidden after:font-semibold after:content-[attr(data-label)] hover:text-brand focus-visible:text-brand focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-4",
            activeId === id ? "font-semibold text-brand" : "font-medium text-muted",
          )}
        >
          {label}
        </a>
      ))}

      <span
        ref={indicatorRef}
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[0.45rem] left-0 h-[2px] opacity-0 [transition:transform_350ms_cubic-bezier(0.22,1,0.36,1),width_350ms_cubic-bezier(0.22,1,0.36,1),opacity_0.2s_ease] motion-reduce:transition-none"
      >
        {/* Re-keyed per target so the underline grows from the centre on each move. */}
        <span
          key={targetId}
          className="block h-full w-full animate-stem-grow rounded-full bg-brand motion-reduce:animate-none"
        />
      </span>
    </nav>
  );
}

/** Sticky site header: logo + wordmark on the left, navigation on the right. */
export default function Header() {
  const isMobile = useIsMobile();
  const scrolled = useScrollPast(0.02);

  return (
    <header
      className={clsx(
        "sticky top-0 z-[150] w-full border-b border-divider bg-white font-body [transition:box-shadow_0.2s_ease]",
        scrolled && "shadow-[0_1px_8px_rgba(0,0,0,0.06)]",
      )}
    >
      <div className="flex h-[3.75rem] items-center justify-between px-6 md:h-[4.5rem] md:px-[3.25rem]">
        <Brand />
        {isMobile ? <MobileMenu /> : <DesktopNav />}
      </div>
    </header>
  );
}
