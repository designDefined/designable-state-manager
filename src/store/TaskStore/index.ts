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
      destroy: destroyAchievementStore,
    } = extended.AchievementStore.inject({ initialAchievement: initialTask.achievement }, { local: true });

    return {
      store: set => {
        subscribeAchievementStore(({ achievement }) => {
          set({ achievement });
        });
        return {
          ...getAchievementStore(),
          task: initialTask,
        };
      },
      onDestroy: () => {
        destroyAchievementStore();
      },
    };
  });

const useTaskStore = createHook(TaskStore);

export { TaskStore, useTaskStore };
