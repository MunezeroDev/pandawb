/** While balancing columns, a video counts this many times its height, so its column takes fewer photos and the video comes out large. */
export const VIDEO_WEIGHT = 2.4;

const ratioOf = (item) => item.ratio ?? 1;

/**
 * Packs one slide's items into columns so every tile keeps its photo's exact
 * shape and every column ends level.
 *
 * A column whose height/width ratios sum to S, drawn at width w, is w·S tall.
 * Giving each column width ∝ 1/S makes all columns the same height, and the
 * slide's height/width becomes 1 / Σ(1/S). Of the given column counts, the
 * one whose height/width is closest to `target` wins.
 *
 * @param items        slide items ({ type, ratio, … })
 * @param columnCounts column counts to try, e.g. [3, 4, 5]
 * @param target       preferred slide height ÷ width
 * @returns {{ columns: { entries: { item, i }[], S: number }[], hOverW: number }}
 */
export function packSlide(items, columnCounts, target) {
  let best = null;

  for (const count of columnCounts) {
    if (count > items.length && best) continue;
    const cols = Array.from({ length: Math.min(count, items.length) }, () => ({
      entries: [],
      S: 0,
      load: 0,
    }));
    const place = (col, entry, weight) => {
      col.entries.push(entry);
      col.S += ratioOf(entry.item);
      col.load += weight * ratioOf(entry.item);
    };
    const lightest = () => cols.reduce((a, b) => (b.load < a.load ? b : a));

    const entries = items.map((item, i) => ({ item, i }));
    // Videos first, each into the lightest column, so they spread out and sit on top.
    entries
      .filter((e) => e.item.type === "video")
      .forEach((e) => place(lightest(), e, VIDEO_WEIGHT));
    entries
      .filter((e) => e.item.type !== "video")
      .forEach((e) => place(lightest(), e, 1));

    const columns = cols.filter((c) => c.entries.length);
    const hOverW = 1 / columns.reduce((sum, c) => sum + 1 / c.S, 0);
    const score = Math.abs(Math.log(hOverW / target));
    if (!best || score < best.score) best = { columns, hOverW, score };
  }

  return { columns: best.columns, hOverW: best.hOverW };
}
