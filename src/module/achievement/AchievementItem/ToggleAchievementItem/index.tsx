import { ToggleCheck } from "@component/ToggleCheck";
import { useAchievementStore } from "@store/AchievementStore";

export const ToggleAchievementItem = () => {
  const { achievement, toggleAchievement } = useAchievementStore();

  return <ToggleCheck toggled={achievement.done} onClick={toggleAchievement} />;
};
