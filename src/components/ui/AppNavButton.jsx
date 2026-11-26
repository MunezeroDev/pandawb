import clsx from "clsx";
import { PANDA_APP_URL } from "../../constants/links";

/** Phone outline with a fingertip that keeps tapping the screen. */
function TappingPhoneIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={clsx("overflow-visible", className)}
    >
      <rect x="6" y="2" width="12" height="20" rx="2.5" />
      <path d="M10.5 18.5h3" />
      {/* Ripple + fingertip, scaled around their own centre */}
      <circle
        cx="12"
        cy="10.5"
        r="2.6"
        strokeWidth="1.25"
        className="origin-center animate-tap-ring [transform-box:fill-box] motion-reduce:hidden motion-reduce:animate-none"
      />
      <circle
        cx="12"
        cy="10.5"
        r="1.6"
        fill="currentColor"
        stroke="none"
        className="origin-center animate-tap-dot [transform-box:fill-box] motion-reduce:animate-none"
      />
    </svg>
  );
}

/** Header call to action that opens the Panda app. `compact` is the phone-header size. */
export default function AppNavButton({ compact = false, className = "" }) {
  return (
    <a
      href={PANDA_APP_URL}
      aria-label="Open the Panda App"
      className={clsx(
        "inline-flex shrink-0 items-center rounded-full bg-brand font-display font-bold tracking-[0.02em] whitespace-nowrap text-white no-underline shadow-[0_4px_14px_rgba(0,191,99,0.32)] [transition:background_0.2s_ease,transform_0.18s_ease,box-shadow_0.2s_ease] hover:brightness-110 hover:[transform:translateY(-1px)] hover:shadow-[0_8px_20px_rgba(0,191,99,0.38)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brand-ink motion-reduce:transition-none",
        compact ? "gap-1.5 py-[7px] pr-4 pl-3 text-[14px]" : "gap-2 py-[9px] pr-5 pl-4 text-[15px]",
        className,
      )}
    >
      <TappingPhoneIcon className={compact ? "size-[18px]" : "size-5"} />
      App
    </a>
  );
}
