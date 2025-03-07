import { Button } from "@flexive/core";
import { ToggleAchievement } from "@entity/achievement/Achievement";

type ToggleAchievementItemProps = {
  achievement: ToggleAchievement;
  toggle: () => void;
};

export const ToggleAchievementItem = ({ achievement, toggle }: ToggleAchievementItemProps) => {
  return <Button onClick={toggle}>{achievement.done ? "done!" : "notDone!"}</Button>;
};
