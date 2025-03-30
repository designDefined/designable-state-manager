import { Selectable } from "@component/Selectable";
import { ToggleCheck } from "@component/ToggleCheck";
import { ToggleChevron } from "@component/ToggleChevron";
import { Task } from "@entity/task/Task";
import { Div } from "@flexive/core";
import { AchievementItem } from "@module/achievement/AchievementItem";
import { useSelectedTaskStore } from "@store/SelectedTaskStore";
import { useTaskStore } from "@store/TaskStore";
import { cn } from "@style/utility";

export const TaskItem = () => {
  const { task } = useTaskStore();
  const { selectTask, clearSelectedTask, selectedTask } = useSelectedTaskStore();

  return (
    <Selectable
      className={cn("border-3", "text-5", { "theme-success": task.achievement.done })}
      selectedClassName="text-7"
      onSelect={() => selectTask(task)}
      onCancel={() => clearSelectedTask()}
      selected={task.id === selectedTask?.id}
      rad={12}
    >
      {isSimpleContentTask(task) ? (
        <SimpleContent task={task} />
      ) : (
        <DetailContent task={task} expanded={task.id === selectedTask?.id} />
      )}
    </Selectable>
  );
};

const SimpleContent = ({ task }: { task: Task }) => {
  return (
    <Div row alignC p="1.6rem" pr="2.4rem">
      <Div f>{task.name}</Div>
      <Div onClick={e => e.stopPropagation()}>
        <AchievementItem />
      </Div>
    </Div>
  );
};

const DetailContent = ({ task, expanded }: { task: Task; expanded?: boolean }) => {
  return (
    <Div p="1.6rem" pr="2.4rem" g="1.2rem">
      <Div row g={4}>
        <ToggleChevron className="text-4" toggled={expanded} />
        <Div f>{task.name}</Div>
        <ToggleCheck toggled={task.achievement.done} disabled />
      </Div>
      {expanded && (
        <Div onClick={e => e.stopPropagation()}>
          <AchievementItem />
        </Div>
      )}
    </Div>
  );
};

const isSimpleContentTask = (task: Task) => {
  if (task.achievement.type === "TOGGLE") return true;
  return false;
};
