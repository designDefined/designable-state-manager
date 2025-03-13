import { Article, Li, Ul } from "@flexive/core";
import { StoreProvider } from "@library";
import { TaskStore } from "@store/TaskStore";
import { useTasksViewStore } from "@store/ViewStore/tasks";
import { TaskItem } from "../TaskItem";

export const TaskList = () => {
  const { view: tasks } = useTasksViewStore();

  return (
    <Article>
      <Ul g="1.2rem">
        {tasks.map(task => (
          <StoreProvider key={task.id} storeFunctions={[() => TaskStore.inject({ taskId: task.id, _task: task })]}>
            <Li>
              <TaskItem />
            </Li>
          </StoreProvider>
        ))}
      </Ul>
    </Article>
  );
};
