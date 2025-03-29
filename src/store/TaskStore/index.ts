import { Task } from "@entity/task/Task";
import { create, createHook } from "@library";
import { AchievementStore } from "@store/AchievementStore";

type TaskStore = AchievementStore & {
  task: Task;
};

const TaskStore = create<{ initialTask: Task }, TaskStore>({ name: "TaskStore" })
  .extend(AchievementStore)
  .setDefaultKey(({ initialTask }) => ({ taskId: initialTask.id }))
  .implement(({ injected: { initialTask }, extended }) => {
    const {
      client: { getState: getAchievementStore, subscribe: subscribeAchievementStore },
      destroy: destroyAchievementStore,
    } = extended.AchievementStore.inject(
      { initialAchievement: initialTask.achievement },
      { additionalKey: initialTask.id },
    );

    return {
      store: set => {
        subscribeAchievementStore(({ achievement }) => {
          set(prev => ({ achievement, task: { ...prev.task, achievement } }));
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
