import clsx from "clsx";
import useInView from "../../hooks/useInView";

/** Fades and slides its children up the first time they scroll into view. */
export default function Reveal({ as = "div", delay = 0, className, children, ...rest }) {
  const [ref, inView] = useInView();
  const Tag = as;

  return (
    <Tag
      ref={ref}
      style={inView && delay ? { animationDelay: `${delay}ms` } : undefined}
      className={clsx(
        inView ? "animate-fade-up" : "opacity-0",
        "motion-reduce:animate-none motion-reduce:opacity-100",
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
