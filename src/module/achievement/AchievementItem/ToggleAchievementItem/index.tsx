import { Button } from "@flexive/core";
import { useAchievementStore } from "@store/AchievementStore";

export const ToggleAchievementItem = () => {
  const { achievement, toggleAchievement } = useAchievementStore();

  return <Button onClick={toggleAchievement}>{achievement.done ? "done!" : "notDone!"}</Button>;
};
