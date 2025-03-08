import { Div } from "@flexive/core";
import { StoreProvider } from "@library";
import { ContentEditor } from "@module/content/ContentEditor";
import { useAchievementStore } from "@store/AchievementStore";

export const MemoAchievementItem = () => {
  const { getMemoContentStore, achievement } = useAchievementStore();

  return (
    <StoreProvider storeFunctions={[getMemoContentStore]}>
      <Div>{achievement.done ? "done" : "not done"}</Div>
      <ContentEditor />
    </StoreProvider>
  );
};
