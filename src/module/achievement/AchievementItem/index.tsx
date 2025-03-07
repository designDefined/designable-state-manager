import { useAchievementStore } from "@store/AchievementStore";
import { ToggleAchievementItem } from "./ToggleAchievementItem";

export const AchievementItem = () => {
  const { achievement, toggleAchievement } = useAchievementStore();

  switch (achievement.type) {
    case "TOGGLE":
      return <ToggleAchievementItem achievement={achievement} toggle={toggleAchievement} />;
    default:
      return null;
  }
};
