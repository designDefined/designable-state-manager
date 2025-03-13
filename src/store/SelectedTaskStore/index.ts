import { Task } from "@entity/task/Task";
import { create, createHook, Store } from "@library";
import { TaskStore } from "@store/TaskStore";

type SelectedTaskStore = {
  selectedTask?: Task;
  getTaskStore?: () => Store<TaskStore>;
  selectTask: (task: Task) => void;
  clearSelectedTask: () => void;
};

const SelectedTaskStore = create({ name: "SelectedTaskStore" }).implement<object, SelectedTaskStore>(() => ({
  store: set => ({
    selectTask: task =>
      set(prev => {
        prev.getTaskStore?.()?.destroy();
        const newStore = TaskStore.inject({ taskId: task.id, _task: task });
        return {
          selectedTask: task,
          getTaskStore: () => newStore,
        };
      }),
    clearSelectedTask: () =>
      set(prev => {
        prev.getTaskStore?.()?.destroy();
        return { selectedTask: undefined, getTaskStore: undefined };
      }),
  }),
}));

const useSelectedTaskStore = createHook(SelectedTaskStore);

export { SelectedTaskStore, useSelectedTaskStore };
