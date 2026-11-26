import { useCallback, useState } from "react";
import ImpactSummary from "../components/goal-report/ImpactSummary";
import GoalStory from "../components/goal-report/GoalStory";
import GoalOverview from "../components/goal-report/GoalOverview";
import TabPills from "../components/ui/TabPills";
import MediaGallery from "../components/media/MediaGallery";
import Lightbox from "../components/media/Lightbox";
import useIsMobile from "../hooks/useIsMobile";
import { collectMedia } from "../utils/media";
import {
  GOALS,
  GOALS_NEWEST_FIRST,
  TOTAL_PLANTED,
  TOTAL_TRACKED,
} from "../data/goals";

const ALL_TAB = "All";
const TABS = [ALL_TAB, ...GOALS_NEWEST_FIRST.map((g) => g.tab)];

export default function GoalReport() {
  const isMobile = useIsMobile();
  const [tab, setTab] = useState(ALL_TAB);
  const [lightbox, setLightbox] = useState(null); // { items, i } | null

  const activeGoal = GOALS.find((g) => g.tab === tab);

  const closeLightbox = useCallback(() => setLightbox(null), []);
  const moveLightbox = useCallback(
    (step) =>
      setLightbox(
        (s) => s && { ...s, i: (s.i + step + s.items.length) % s.items.length },
      ),
    [],
  );

  return (
    <section
      id="goals"
      className="bg-white px-5 py-10 font-body md:min-h-[80vh] md:mx-[3.25rem] md:px-0 md:pt-7 md:pb-14"
    >
      <header className="mb-7 text-center md:mb-10">
        <h1 className="text-[clamp(36px,10vw,56px)] leading-[1.05] font-normal tracking-[-1px] text-ink md:text-[clamp(32px,6vw,70px)]">
          <span className="font-bold text-brand">Panda</span> Goal Report
        </h1>
      </header>

      <ImpactSummary
        planted={TOTAL_PLANTED}
        tracked={TOTAL_TRACKED}
        drives={GOALS.length}
      />

      <TabPills tabs={TABS} activeTab={tab} onChange={setTab} />

      <div className="mt-[14px]">
        {activeGoal ? (
          <GoalStory goal={activeGoal} />
        ) : (
          <GoalOverview goals={GOALS_NEWEST_FIRST} onPick={setTab} />
        )}
        <MediaGallery
          key={tab}
          items={collectMedia(activeGoal ? [activeGoal] : GOALS_NEWEST_FIRST)}
          isMobile={isMobile}
          onOpen={(items, i) => setLightbox({ items, i })}
        />
      </div>

      <Lightbox state={lightbox} onClose={closeLightbox} onMove={moveLightbox} />
    </section>
  );
}
