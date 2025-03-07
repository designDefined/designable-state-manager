import { Achievement } from "@entity/achievement/Achievement";
import { create, createHook } from "@library";

type AchievementStore = {
  achievement: Achievement;
  toggleAchievement: () => void;
};

const AchievementStore = create({ name: "AchievementStore" }).implement<
  { initialAchievement: Achievement },
  AchievementStore
>(({ injected }) => (set, get) => ({
  achievement: injected.initialAchievement,
  toggleAchievement: () => {
    const { achievement } = get();
    if (achievement.type !== "TOGGLE") {
      throw new Error("Can only toggle ToggleAchievement");
    }
    set({ achievement: { ...achievement, done: !achievement.done } });
  },
}));

const useAchievementStore = createHook(AchievementStore);

export { AchievementStore, useAchievementStore };
