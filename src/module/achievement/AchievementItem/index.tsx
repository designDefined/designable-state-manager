import { useAchievementStore } from "@store/AchievementStore";
import { ToggleAchievementItem } from "./ToggleAchievementItem";
import { MemoAchievementItem } from "./MemoAchievementItem";

export const AchievementItem = () => {
  const { achievement } = useAchievementStore();

  switch (achievement.type) {
    case "TOGGLE":
      return <ToggleAchievementItem />;
    case "MEMO":
      return <MemoAchievementItem />;
    default:
      return null;
  }
};
