import { Article, Li, Ul } from "@flexive/core";
import { StoreProvider } from "@library";
import { TaskStore } from "@store/TaskStore";
import { useTasksViewStore } from "@store/ViewStore/tasks";
import { TaskItem } from "../TaskItem";

export const TaskList = () => {
  const { view: tasks } = useTasksViewStore();

  return (
    <Article>
      task:
      <Ul>
        {tasks.map(task => (
          <StoreProvider
            key={task.id}
            storeFunctions={[() => TaskStore.inject({ initialTask: task }, { local: true })]}
          >
            <Li>
              <TaskItem />
            </Li>
          </StoreProvider>
        ))}
      </Ul>
    </Article>
  );
};
