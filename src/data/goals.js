import { emptySlots } from "../utils/dropbox";

/*
 * Planting drives shown in the Goal Report.
 *
 * Adding media: paste each Dropbox share link into `videos` / `images`
 * (e.g. "https://www.dropbox.com/...?dl=0"), replacing a `null` slot.
 * Links are converted to direct URLs automatically; any slot still null
 * renders a "coming soon" tile.
 */
export const GOALS = [
  {
    n: 1,
    when: "2025",
    tab: "2025",
    platform: "Panda Android App",
    title: "82 trees planted & 63 tracked on the Panda Android Mobile App",
    text: "Partnered with Whispers (a Kibera seedling farmer) and the BV Nairobi West hub for a real-world planting drive. Together we planted 82 trees and uploaded 63 onto Panda for live tracking.",
    partners: ["Whispers", "BV Nairobi West"],
    planted: 82,
    tracked: 63,
    videos: [null], // founder video
    images: emptySlots(20),
  },
  {
    n: 2,
    when: "July 2026",
    tab: "July 2026",
    platform: "Panda Android App v3",
    title: "98 trees planted on Panda Android App Version 3",
    text: "Partnered with Rotaract Eco-Warriors and JEMA (JKUAT Environmental) Club and planted 98 trees at JKUAT Primary School.",
    partners: ["Rotaract Eco-Warriors", "JEMA Club JKUAT"],
    planted: 98,
    tracked: 98,
    videos: [],
    images: emptySlots(20),
  },
  {
    n: 3,
    when: "September 2026 · Mazingira Day",
    tab: "Sept 2026",
    platform: "Panda PWA",
    title: "87 trees planted and tracked on our new cross-platform PWA",
    text: "Planted and tracked 87 trees in collaboration with WhisperChampions, maida_cbo and the BV Nairobi Westlands Local Hub. This was our first cross-platform MVP, working for both Android and iPhone users.",
    partners: ["WhisperChampions", "maida_cbo", "BV Nairobi Westlands"],
    planted: 87,
    tracked: 87,
    videos: [null, null],
    images: emptySlots(20),
  },
  {
    n: 4,
    when: "October 2026 · Mazingira Day",
    tab: "Oct 2026",
    platform: "Panda PWA",
    title: "213 trees planted and 118 tracked on the PWA",
    text: "Partnered with JEMA Club JKUAT, UCESCO JKUAT and about 6 more student clubs and organisations to plant 213 trees and track 118 in our most successful planting event yet. A big day with an MC and snacks to keep the planting fun and interactive.",
    partners: ["JEMA Club JKUAT", "UCESCO JKUAT", "+6 student clubs"],
    planted: 213,
    tracked: 118,
    videos: [null, null],
    images: emptySlots(20),
  },
];

export const GOALS_NEWEST_FIRST = [...GOALS].reverse();
export const TOTAL_PLANTED = GOALS.reduce((sum, g) => sum + g.planted, 0);
export const TOTAL_TRACKED = GOALS.reduce((sum, g) => sum + g.tracked, 0);

/** Gradient colours for placeholder gallery tiles. */
export const TILE_TINTS = [
  "#00bf63",
  "#2fd085",
  "#6ddba0",
  "#46cd6e",
  "#1fa968",
  "#8be3b4",
];
