import { galleryFile, galleryImages, galleryRatio } from "./gallery";
import { WHATS_NEW_CAPTIONS } from "./whatsNew";

/*
 * Planting events shown in Recent Events.
 *
 * Photos come from src/assets/images/gallery/<folder>/ (see src/data/gallery.js).
 * Videos: paste a Dropbox share link (e.g. "https://www.dropbox.com/...?dl=0")
 * into a video's `src`; it is converted to a direct URL automatically. Until
 * then the tile shows its poster and the lightbox says "coming soon".
 */
const octoberPoster = (name) => ({
  poster: galleryFile("2026-october", name),
  ratio: galleryRatio("2026-october", name),
});

export const EVENTS = [
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
    videos: [],
    images: galleryImages("2025"),
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
    images: galleryImages("2026-july"),
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
    videos: [],
    images: galleryImages("2026-sept"),
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
    videos: [
      { src: null, ...octoberPoster("video1_thumbnail") }, // video1.mp4
      { src: null, ...octoberPoster("video2_thumbnail") }, // video2.mp4
    ],
    // People first; the three near-identical banner group photos are spread
    // across later slides, and the app screenshots come last.
    images: galleryImages("2026-october", [
      "04-volunteer-holding-seedling",
      "05-volunteer-with-seedling-smile",
      "07-watering-new-tree",
      "08-planting-portrait-black-tee",
      "09-planting-portrait-blue-sweater",
      "10-planting-portrait-green-jacket",
      "11-planting-portrait-orange-jacket",
      "01-mazingira-day-group-photo",
      "06-planting-together",
      "12-planting-portrait-blue-hoodie",
      "13-planting-blue-visor",
      "02-mazingira-day-group-photo-wide",
      "14-planting-by-the-bridge",
      "03-mazingira-day-group-photo-alt",
    ]),
  },
];

/** Extra gallery tab (not an event): a phone wall of the app's latest screens. */
export const FEATURES_GALLERY = {
  tab: "What's New!",
  when: "What's New!",
  layout: "phones",
  videos: [],
  images: galleryImages("features").map((img) => {
    const [emoji, caption] = WHATS_NEW_CAPTIONS[img.name] ?? ["✨", ""];
    return { ...img, emoji, caption };
  }),
};

export const EVENTS_NEWEST_FIRST = [...EVENTS].reverse();
export const TOTAL_PLANTED = EVENTS.reduce((sum, e) => sum + e.planted, 0);
export const TOTAL_TRACKED = EVENTS.reduce((sum, e) => sum + e.tracked, 0);
/** Distinct partners across all events ("+6 student clubs" counts as 6). */
export const TOTAL_PARTNERS = [
  ...new Set(EVENTS.flatMap((e) => e.partners)),
].reduce((sum, p) => sum + (Number(p.match(/^\+(\d+)/)?.[1]) || 1), 0);

/** Gradient colours for placeholder gallery tiles. */
export const TILE_TINTS = [
  "#00bf63",
  "rgba(0,191,99,0.85)",
  "rgba(0,191,99,0.6)",
  "rgba(0,191,99,0.75)",
  "rgba(0,191,99,0.95)",
  "rgba(0,191,99,0.5)",
];
