import { useState } from "react";
import clsx from "clsx";
import useScrollPast from "../../hooks/useScrollPast";
import { NAV_ITEMS } from "../../data/navigation";

const barClass =
  "block h-[2.5px] w-6 rounded-[2px] bg-brand [transition:all_0.3s_ease]";

/** Hamburger + full-width dropdown. Hidden once the user scrolls down. */
function MobileMenu({ open, setOpen, scrolled }) {
  return (
    <div
      className={clsx(
        "fixed top-5 right-6 z-[150] [transition:opacity_0.3s_ease]",
        scrolled ? "pointer-events-none opacity-0" : "pointer-events-auto opacity-100",
      )}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        className="flex h-10 w-10 cursor-pointer flex-col items-center justify-center gap-[5px] border-none bg-transparent p-2"
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
          "fixed top-[110px] left-0 z-[100] flex w-screen flex-col items-start justify-center overflow-hidden bg-mint [transition:height_0.35s_ease,opacity_0.28s_ease]",
          open ? "h-fit px-9 opacity-100" : "h-0 opacity-0",
        )}
      >
        {NAV_ITEMS.map(({ label, id }) => (
          <a
            key={id}
            href={`#${id}`}
            onClick={() => setOpen(false)}
            className="flex w-full items-center border-b border-[rgba(255,255,255,0.25)] py-[13px] font-display text-[16px] font-bold tracking-[2px] text-white uppercase no-underline [transition:opacity_0.18s_ease] hover:opacity-70"
          >
            <span>{label}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

function DesktopNav() {
  return (
    <nav className="absolute top-7 right-[52px] z-0 flex items-center gap-1">
      {NAV_ITEMS.map(({ label, id }) => (
        <a
          key={id}
          href={`#${id}`}
          className="rounded-[50px] border border-transparent px-4 py-[7px] font-display text-[14px] font-medium tracking-[0.3px] text-subtle no-underline [transition:all_0.22s_ease] hover:border-mint-300 hover:bg-mint-50 hover:text-brand hover:[transform:translateY(-1px)]"
        >
          {label}
        </a>
      ))}
    </nav>
  );
}

export default function Navbar({ isMobile }) {
  // Lives here (not in MobileMenu) so it keeps tracking across breakpoint changes.
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = useScrollPast(0.2, () => setMenuOpen(false));

  return isMobile ? (
    <MobileMenu open={menuOpen} setOpen={setMenuOpen} scrolled={scrolled} />
  ) : (
    <DesktopNav />
  );
}
