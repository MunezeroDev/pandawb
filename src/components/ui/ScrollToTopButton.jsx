import clsx from "clsx";
import useScrollPast from "../../hooks/useScrollPast";

export default function ScrollToTopButton() {
  const visible = useScrollPast(0.6);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      className={clsx(
        "fixed right-1 bottom-8 z-[150] flex h-8 w-8 cursor-pointer items-center justify-center rounded-[50%] border-none bg-brand shadow-[0_4px_16px_rgba(0,191,99,0.35)] [transition:opacity_0.3s_ease]",
        visible ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </button>
  );
}
