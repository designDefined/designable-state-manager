import { useAchievementStore } from "@store/AchievementStore";
import { MemoAchievementItem } from "./MemoAchievementItem";
import { ToggleAchievementItem } from "./ToggleAchievementItem";

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
