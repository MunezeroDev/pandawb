import VideoPlayer from "../components/media/VideoPlayer";
import { IN_ACTION_VIDEO_URL } from "../constants/links";
import thumbnail from "../assets/images/video/in-action-thumbnail.webp";

export const InActionTitle = ({ className = "" }) => (
  <h1
    className={`text-center font-display text-[clamp(32px,9vw,52px)] leading-[1.1] font-normal tracking-[-1px] text-ink md:text-[clamp(32px,6vw,70px)] tablet:text-[clamp(32px,5vw,48px)] ${className}`}
  >
    Panda in <span className="text-brand italic">Action.</span>
  </h1>
);

export const InActionVideo = () => (
  <VideoPlayer src={IN_ACTION_VIDEO_URL} poster={thumbnail} />
);

export default function InAction() {
  return (
    <section
      id="inAction"
      className="flex flex-col items-center justify-center overflow-hidden bg-white px-6 py-10 font-body md:mx-[3.25rem] md:min-h-[80vh] md:px-0 md:py-[22px]"
    >
      <InActionTitle className="mb-9" />
      <InActionVideo />
    </section>
  );
}
