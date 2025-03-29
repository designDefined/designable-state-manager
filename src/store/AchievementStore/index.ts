import { Achievement } from "@entity/achievement/Achievement";
import { create, createHook, Store } from "@library";
import { ContentStore } from "@store/ContentStore";

type AchievementStore = {
  achievement: Achievement;
  toggleAchievement: () => void;
  getMemoContentStore: () => Store<ContentStore>;
};

const AchievementStore = create<{ initialAchievement: Achievement }, AchievementStore>({
  name: "AchievementStore",
}).implement(({ name, key, injected }) => {
  const initialAchievement = injected.initialAchievement;
  const contentStore = ContentStore.inject(
    { initialContent: initialAchievement.type === "MEMO" ? initialAchievement.memo : undefined },
    { additionalKey: [name, key] },
  );

  return {
    store: set => {
      contentStore.client.subscribe(({ content, countContent }) => {
        set(({ achievement }) => {
          if (achievement.type !== "MEMO") {
            throw new Error("Can only write memo MemoAchievement");
          }
          const count = countContent();
          return {
            achievement: {
              ...achievement,
              memo: content,
              done: count >= achievement.achieveTextCount,
            },
          };
        });
      });

      return {
        achievement: initialAchievement,
        toggleAchievement: () => {
          set(({ achievement }) => {
            if (achievement.type !== "TOGGLE") {
              throw new Error("Can only toggle ToggleAchievement");
            }
            return { achievement: { ...achievement, done: !achievement.done } };
          });
        },
        getMemoContentStore: () => contentStore,
      };
    },
    onDestroy: () => {
      contentStore.destroy();
    },
  };
});

const useAchievementStore = createHook(AchievementStore);

export { AchievementStore, useAchievementStore };
