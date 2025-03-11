import { Task } from "@entity/task/Task";
import { createHook } from "@library";
import { ViewHOS } from ".";

const TasksViewStore = ViewHOS<Task[]>({ viewName: "Tasks" });

const useTasksViewStore = createHook(TasksViewStore);

export { TasksViewStore, useTasksViewStore };
