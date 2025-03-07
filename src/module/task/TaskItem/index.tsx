import { Div } from "@flexive/core";
import { AchievementItem } from "@module/achievement/AchievementItem";
import { useTaskStore } from "@store/TaskStore";

export const TaskItem = () => {
  const { task } = useTaskStore();
  return (
    <Div row>
      <Div f>{task.label}</Div>
      <AchievementItem />
    </Div>
  );
};
