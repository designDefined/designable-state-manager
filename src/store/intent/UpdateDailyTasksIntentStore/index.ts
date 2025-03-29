import { Task } from "@entity/task/Task";
import { DateTimestamp } from "@entity/time/Timestamp";
import { createHook } from "@library";
import { TaskRepository } from "@repository/TaskRepository";
import { DailyTasksViewStore } from "@store/view/DailyTasksViewStore";
import { createIntentStore, IntentStore } from "..";

type UpdateDailyTasksIntentStore = IntentStore<{ tasks: Task[] }, unknown>;

const UpdateDailyTasksIntentStore = createIntentStore<UpdateDailyTasksIntentStore, { date: DateTimestamp }>({
  intentName: "UpdateDailyTasks",
  to:
    ({ date }) =>
    ({ tasks }) =>
      TaskRepository.patchTasks({ date, tasks }),
  next: () => [() => DailyTasksViewStore.forEach({ apply: ({ invalidate }) => invalidate() })],
});
const useUpdateDailyTasksIntentStore = createHook(UpdateDailyTasksIntentStore);

export { UpdateDailyTasksIntentStore, useUpdateDailyTasksIntentStore };
