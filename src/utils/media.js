import { dropboxRaw } from "./dropbox";

/** A media entry is either a URL (or null) or an object with `src` and extras (poster, ratio, kind…). */
const toEntry = (v) => (v && typeof v === "object" ? v : { src: v });

/** Flattens events into one media list: all videos first, then all photos. */
export const collectMedia = (events) => [
  ...events.flatMap((g) =>
    g.videos.map((v) => {
      const entry = toEntry(v);
      return { ...entry, type: "video", src: dropboxRaw(entry.src) };
    }),
  ),
  ...events.flatMap((g) =>
    g.images.map((v) => {
      const entry = toEntry(v);
      return { ...entry, type: "image", src: dropboxRaw(entry.src) };
    }),
  ),
];
