import useCountUp from "../../hooks/useCountUp";

/** Number that counts up from 0 when it scrolls into view. */
export default function AnimatedCounter({ to }) {
  const [ref, value] = useCountUp(to);
  return <span ref={ref}>{value}</span>;
}
