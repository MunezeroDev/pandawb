import { dropboxRaw } from "./dropbox";

/** Flattens events into one media list: all videos first, then all photos. */
export const collectMedia = (events) => [
  ...events.flatMap((g) =>
    g.videos.map((src) => ({ type: "video", src: dropboxRaw(src) })),
  ),
  ...events.flatMap((g) =>
    g.images.map((src) => ({ type: "image", src: dropboxRaw(src) })),
  ),
];
