import { Task } from "@entity/task/Task";
import { create, createHook } from "@library";
import { AchievementStore } from "@store/AchievementStore";

type TaskStore = AchievementStore & {
  task: Task;
};

const TaskStore = create({ name: "TaskStore" })
  .extend(AchievementStore)
  .implement<{ initialTask: Task }, TaskStore>(({ injected, extended }) => {
    const initialTask = injected.initialTask;
    const {
      store: { getState: getAchievementStore, subscribe: subscribeAchievementStore },
    } = extended.AchievementStore.inject({ initialAchievement: initialTask.achievement }, { local: true });

    return set => {
      subscribeAchievementStore(({ achievement }) => {
        set({ achievement });
      });
      return {
        ...getAchievementStore(),
        task: initialTask,
      };
    };
  });

const useTaskStore = createHook(TaskStore);

export { TaskStore, useTaskStore };
