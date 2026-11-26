import treeUpload from "../assets/images/features/tree-upload.webp";
import collage from "../assets/images/features/collage.webp";
import location from "../assets/images/features/location.webp";
import yourForest from "../assets/images/features/your-forest.webp";
import leaderboard from "../assets/images/features/leaderboard.webp";
import offlineMode from "../assets/images/features/offline-mode.webp";
import eventCreated from "../assets/images/features/event-created.webp";
import impactToken from "../assets/images/features/impact-token.webp";

export const CORE_FEATURES = [
  {
    title: "Fun and Verifiable",
    description:
      "Plant a real tree, upload photos, add a selfie, and give your tree a name — make your impact personal.",
    image: treeUpload,
  },
  {
    title: "Memorable Experience",
    description:
      "Panda instantly turns your tree planting moment into a beautiful shareable collage for social media.",
    image: collage,
  },
  {
    title: "Geo-Tagged Location",
    description:
      "Track exactly where your tree is planted with a geo-mapped pin and revisit your impact on the map anytime.",
    image: location,
  },
  {
    title: "Digital Forest",
    description:
      "Grow your own digital forest as every tree you plant becomes part of your lasting environmental legacy.",
    image: yourForest,
  },
];

export const MORE_FEATURES = [
  {
    title: "Friendly Games",
    description:
      "Climb the leaderboard, challenge friends, and see who can plant the most trees while making a real impact together.",
    image: leaderboard,
  },
  {
    title: "Offline Capability",
    description:
      "No internet? No problem. Capture your tree planting moments offline and sync them instantly when you're back online.",
    image: offlineMode,
  },
  {
    title: "Auto-mated Event Planning",
    description:
      "Easily organize tree planting events, invite participants, and track the collective impact in one place.",
    image: eventCreated,
  },
  {
    title: "Carbon Credits",
    description:
      "Turn your trees into measurable climate impact with verified carbon credits that support a greener future.",
    image: impactToken,
  },
];

/** Phone showcase: every feature in one loop, Memorable Experience first. */
export const ALL_FEATURES = (() => {
  const all = [...CORE_FEATURES, ...MORE_FEATURES];
  const first = all.findIndex((f) => f.title === "Memorable Experience");
  return [all[first], ...all.filter((_, i) => i !== first)];
})();
