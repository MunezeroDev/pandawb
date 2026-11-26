import { dropboxRaw } from "./dropbox";

/** Flattens goals into one media list: all videos first, then all photos. */
export const collectMedia = (goals) => [
  ...goals.flatMap((g) =>
    g.videos.map((src) => ({ type: "video", src: dropboxRaw(src) })),
  ),
  ...goals.flatMap((g) =>
    g.images.map((src) => ({ type: "image", src: dropboxRaw(src) })),
  ),
];
