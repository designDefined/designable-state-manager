import { Task } from "@entity/task/Task";
import { create, createHook, Store } from "@library";
import { TaskStore } from "@store/TaskStore";

type SelectedTaskStore = {
  selectedTask?: Task;
  getTaskStore?: () => Store<TaskStore>;
  selectTask: (task: Task) => void;
  clearSelectedTask: () => void;
};

const SelectedTaskStore = create<object, SelectedTaskStore>({ name: "SelectedTaskStore" }).implement(() => ({
  store: set => ({
    selectTask: task =>
      set(prev => {
        prev.getTaskStore?.()?.destroy();
        const newStore = TaskStore.inject({ initialTask: task });
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
