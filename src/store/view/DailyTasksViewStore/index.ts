import { Task } from "@entity/task/Task";
import { DateTimestamp } from "@entity/time/Timestamp";
import { createHook } from "@library";
import { TaskRepository } from "@repository/TaskRepository";
import { createViewStore, ViewStore } from "..";

type DailyTasksViewStore = ViewStore<{ date: DateTimestamp; tasks: Task[] }>;

const DailyTasksViewStore = createViewStore<DailyTasksViewStore, { date: DateTimestamp }>({
  viewName: "DailyTasks",
  from: ({ date }) => ({
    date,
    tasks: TaskRepository.getTasks({ date }),
  }),
});

const useDailyTasksViewStore = createHook(DailyTasksViewStore);

export { DailyTasksViewStore, useDailyTasksViewStore };
