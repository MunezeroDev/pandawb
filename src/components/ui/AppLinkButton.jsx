import { useRef } from "react";
import { PANDA_APP_URL } from "../../constants/links";

/** "Use the Panda App" call to action: links to the live Panda system. */
export default function AppLinkButton({ className = "" }) {
  const rippleRef = useRef(null);

  // Restart the CSS ripple animation on every click.
  const playRipple = () => {
    const el = rippleRef.current;
    if (!el) return;
    el.classList.remove("is-active");
    void el.offsetWidth;
    el.classList.add("is-active");
  };

  return (
    <a
      href={PANDA_APP_URL}
      onClick={playRipple}
      className={`group relative inline-flex cursor-pointer items-center gap-[10px] overflow-hidden rounded-[999px] border-none bg-brand px-7 py-[13px] font-display text-[1rem] font-bold tracking-[0.4px] whitespace-nowrap text-white no-underline shadow-[0_5px_0px_#007a3d,0_8px_20px_rgba(0,191,99,0.28)] select-none [-webkit-tap-highlight-color:transparent] [transition:transform_0.18s_cubic-bezier(0.34,1.56,0.64,1),background_0.18s_ease,box-shadow_0.18s_ease] hover:bg-brand-bright hover:shadow-[0_7px_0px_#007a3d,0_12px_28px_rgba(0,191,99,0.32)] hover:[transform:translateY(-2px)] active:bg-brand-pressed active:shadow-[0_2px_0px_#007a3d,0_4px_10px_rgba(0,191,99,0.2)] active:[transform:translateY(3px)] ${className}`}
    >
      <span ref={rippleRef} className="ripple" />
      <span>Use the Panda App</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#ffffff"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="shrink-0 [transition:transform_0.2s_ease] group-hover:translate-x-1 motion-reduce:transition-none"
        aria-hidden="true"
      >
        <path d="M4 12h15" />
        <path d="M14 6l6 6-6 6" />
      </svg>
    </a>
  );
}
