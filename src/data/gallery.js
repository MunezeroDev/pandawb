/*
 * Gallery photos, generated from png_jpg/gallery/ by scripts/to-webp.mjs
 * (which also writes manifest.json with each image's size).
 * Each folder under src/assets/images/gallery/ is one gallery tab; files are
 * shown in filename order unless an explicit order is given.
 */
import manifest from "../assets/images/gallery/manifest.json";

const files = import.meta.glob("../assets/images/gallery/*/*.webp", {
  eager: true,
  import: "default",
});

const entries = Object.entries(files)
  .map(([path, src]) => {
    const [folder, file] = path.split("/").slice(-2);
    const name = file.replace(/\.webp$/, "");
    const [w, h] = manifest[`${folder}/${name}`] ?? [1, 1];
    return { folder, name, src, ratio: h / w };
  })
  .sort((a, b) => a.name.localeCompare(b.name));

/** App screenshots shown in a phone frame: everything in `features` ("What's New!"). */
const isScreen = (e) => e.folder === "features";

/**
 * Photos in `folder` as `{ src, ratio, kind, name }` (ratio = height / width),
 * excluding video thumbnails (`*_thumbnail`). Names in `order` come first, in
 * that order; the rest follow in filename order.
 */
export const galleryImages = (folder, order = []) => {
  const list = entries.filter((e) => e.folder === folder && !e.name.endsWith("_thumbnail"));
  const rank = (e) => {
    const i = order.indexOf(e.name);
    return i === -1 ? order.length : i;
  };
  return [...list]
    .sort((a, b) => rank(a) - rank(b))
    .map((e) => ({ src: e.src, ratio: e.ratio, name: e.name, kind: isScreen(e) ? "screen" : "photo" }));
};

/** URL of a single file in `folder`, e.g. a video thumbnail. */
export const galleryFile = (folder, name) =>
  entries.find((e) => e.folder === folder && e.name === name)?.src ?? null;

/** Height / width of a single file in `folder`. */
export const galleryRatio = (folder, name) =>
  entries.find((e) => e.folder === folder && e.name === name)?.ratio ?? 1;
