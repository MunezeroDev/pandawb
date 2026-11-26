import { useRef, useState } from "react";
import clsx from "clsx";
import formatTime from "../../utils/formatTime";

const CONTROLS_HIDE_DELAY_MS = 2500;

const iconButtonClass =
  "cursor-pointer border-none bg-transparent p-1";

/** CSS triangle used as a play icon. */
const PlayTriangle = ({ className }) => (
  <div
    className={clsx(
      "h-0 w-0 border-y-transparent border-l-white",
      className,
    )}
  />
);

/**
 * Custom video player: big centre play button, auto-hiding controls bar
 * with seek/buffer bar, volume, time and fullscreen. Portrait videos are
 * shown narrower (9:16) than landscape ones (16:9).
 */
export default function VideoPlayer({ src, poster }) {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const hideTimerRef = useRef(null);

  const [isPortrait, setIsPortrait] = useState(null); // unknown until metadata loads
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);

  const togglePlay = () =>
    playing ? videoRef.current.pause() : videoRef.current.play();

  const handleMouseMove = () => {
    setShowControls(true);
    clearTimeout(hideTimerRef.current);
    hideTimerRef.current = setTimeout(() => {
      if (playing) setShowControls(false);
    }, CONTROLS_HIDE_DELAY_MS);
  };

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = ratio * duration;
  };

  const toggleMute = () => {
    setMuted((m) => !m);
    videoRef.current.muted = !muted;
  };

  const handleVolume = (e) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    setMuted(v === 0);
    videoRef.current.volume = v;
    videoRef.current.muted = v === 0;
  };

  const toggleFullscreen = () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else containerRef.current?.requestFullscreen();
  };

  const playedPct = duration ? (currentTime / duration) * 100 : 0;
  const bufferedPct = duration ? (buffered / duration) * 100 : 0;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        if (playing) setShowControls(false);
      }}
      className={clsx(
        "relative w-full overflow-hidden rounded-[20px] bg-video-bg",
        showControls ? "cursor-default" : "cursor-none",
        isPortrait === true
          ? "aspect-[9/16] max-w-[85%] md:max-w-[340px]"
          : "aspect-[16/9] max-w-[900px]",
      )}
    >
      <video
        ref={videoRef}
        src={src}
        playsInline
        poster={poster}
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onLoadedMetadata={() => {
          const vid = videoRef.current;
          if (!vid) return;
          setIsPortrait(vid.videoHeight > vid.videoWidth);
          setDuration(vid.duration);
        }}
        onTimeUpdate={() => {
          const vid = videoRef.current;
          if (!vid) return;
          setCurrentTime(vid.currentTime);
          if (vid.buffered.length > 0)
            setBuffered(vid.buffered.end(vid.buffered.length - 1));
        }}
        onClick={togglePlay}
        className="block h-full w-full bg-black object-contain"
      />

      {/* Big centre play button (before playback starts / while paused) */}
      {!playing && (
        <div
          onClick={() => videoRef.current?.play()}
          className="absolute inset-0 flex cursor-pointer items-center justify-center"
        >
          <div className="flex h-20 w-20 items-center justify-center rounded-[50%] bg-[rgba(0,191,99,0.9)] shadow-[0_0_0_12px_rgba(0,191,99,0.2)] [transition:transform_0.15s_ease,box-shadow_0.15s_ease] hover:shadow-[0_0_0_18px_rgba(0,191,99,0.15)] hover:[transform:scale(1.1)]">
            <PlayTriangle className="ml-[6px] border-y-[14px] border-l-[24px]" />
          </div>
        </div>
      )}

      {/* Controls bar */}
      <div
        className={clsx(
          "absolute right-0 bottom-0 left-0 flex flex-col gap-[10px] bg-[linear-gradient(transparent,rgba(0,0,0,0.82))] px-5 pt-10 pb-4 [transition:opacity_0.3s_ease,transform_0.3s_ease]",
          showControls
            ? "pointer-events-auto opacity-100 [transform:translateY(0)]"
            : "pointer-events-none opacity-0 [transform:translateY(6px)]",
        )}
      >
        {/* Progress bar */}
        <div
          onClick={handleSeek}
          className="relative h-1 cursor-pointer rounded-[2px] bg-[rgba(255,255,255,0.15)] hover:h-1.5"
        >
          <div
            className="absolute inset-0 rounded-[2px] bg-[rgba(255,255,255,0.25)]"
            style={{ width: `${bufferedPct}%` }}
          />
          <div
            className="absolute inset-0 rounded-[2px] bg-[linear-gradient(90deg,#00bf63,#00e676)] shadow-[0_0_8px_rgba(0,191,99,0.6)]"
            style={{ width: `${playedPct}%` }}
          />
          <div
            className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-brand shadow-[0_0_6px_rgba(0,191,99,0.8)]"
            style={{ left: `${playedPct}%` }}
          />
        </div>

        <div className="flex items-center gap-[14px]">
          <button
            onClick={togglePlay}
            aria-label={playing ? "Pause" : "Play"}
            className={clsx(iconButtonClass, "flex items-center justify-center")}
          >
            {playing ? (
              <div className="flex gap-[3px]">
                <div className="h-4 w-[3px] rounded-[2px] bg-white" />
                <div className="h-4 w-[3px] rounded-[2px] bg-white" />
              </div>
            ) : (
              <PlayTriangle className="ml-[2px] border-y-[9px] border-l-[15px]" />
            )}
          </button>

          <button
            onClick={toggleMute}
            aria-label={muted ? "Unmute" : "Mute"}
            className={clsx(iconButtonClass, "text-[15px]")}
          >
            {muted || volume === 0 ? "🔇" : volume < 0.5 ? "🔉" : "🔊"}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={muted ? 0 : volume}
            onChange={handleVolume}
            aria-label="Volume"
            className="h-[3px] w-[72px] cursor-pointer rounded-[2px] accent-brand"
          />

          <span className="ml-[2px] font-mono text-[12px] whitespace-nowrap text-[rgba(255,255,255,0.8)]">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>

          <div className="flex-1" />

          <button
            onClick={toggleFullscreen}
            aria-label="Fullscreen"
            className={clsx(
              iconButtonClass,
              "flex items-center text-[14px] text-white",
            )}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <polyline points="15 3 21 3 21 9" />
              <polyline points="9 21 3 21 3 15" />
              <line x1="21" y1="3" x2="14" y2="10" />
              <line x1="3" y1="21" x2="10" y2="14" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
