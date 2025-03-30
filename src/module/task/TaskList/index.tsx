import { Article, Button, Li, Ul } from "@flexive/core";
import { StoreProvider } from "@library";
import { useUpdateDailyTasksIntentStore } from "@store/intent/UpdateDailyTasksIntentStore";
import { TaskStore } from "@store/TaskStore";
import { useDailyTasksViewStore } from "@store/view/DailyTasksViewStore";
import { nanoid } from "nanoid";
import { useMemo } from "react";
import { TaskItem } from "../TaskItem";

export const TaskList = () => {
  const {
    view: { date, tasks },
  } = useDailyTasksViewStore();
  const { intend: updateTasks } = useUpdateDailyTasksIntentStore();

  const taskStores = useMemo(() => {
    const taskStores = tasks.map(task => TaskStore.inject({ initialTask: task }));
    taskStores.forEach(({ client }) => {
      client.subscribe(({ task }) => {
        const newTasks = tasks.map(prevTask => (prevTask.id === task.id ? task : prevTask));
        updateTasks({ tasks: newTasks });
      });
    });
    return taskStores;
  }, [tasks, updateTasks]);

  return (
    <Article>
      <Ul g="1.2rem">
        {taskStores.map(taskStore => (
          <StoreProvider key={taskStore.key} storeFunctions={[() => taskStore]}>
            <Li>
              {taskStore.key}
              <TaskItem />
            </Li>
          </StoreProvider>
        ))}
        <Button
          onClick={() => {
            updateTasks({
              tasks: [
                ...tasks,
                {
                  id: nanoid(),
                  name: "New Task",
                  date,
                  achievement: { type: "TOGGLE", done: false },
                },
              ],
            });
          }}
        >
          Add Task
        </Button>
      </Ul>
    </Article>
  );
};
