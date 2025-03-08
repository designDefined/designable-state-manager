import { Task } from "@entity/task/Task";
import { ViewHOS } from ".";
import { createHook } from "@library";

const TasksViewStore = ViewHOS<Task[]>({ viewName: "Tasks" });

const useTasksViewStore = createHook(TasksViewStore);

export { TasksViewStore, useTasksViewStore };
