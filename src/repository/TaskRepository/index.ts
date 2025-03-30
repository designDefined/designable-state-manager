import { Task } from "@entity/task/Task";
import { DateTimestamp } from "@entity/time/Timestamp";
import { webStorage } from "../utility/webStorage";

/**
 * Constant
 */
const TASK_MAP_KEY = "designable-store-task-amp";

/**
 * DTO
 */
type TaskMapDto = Record<number, Task[]>;

const sampleTasks = (id: number): Task[] => [
  {
    id: `sample${id * 2 - 1}`,
    cycleId: `sample-cycle`,
    cycleCount: 0,
    name: `Sample Toggle Task ${id}`,
    achievement: { type: "TOGGLE", done: false },
    description: "Sample Description",
    startTime: 0,
    endTime: 1,
  },
  {
    id: `sample${id * 2}`,
    cycleId: `sample-cycle`,
    cycleCount: 0,
    name: `Sample Memo Task ${id}`,
    achievement: { type: "MEMO", memo: "", targetCharacterCount: 10, done: false },
    startTime: 0,
    endTime: 1,
  },
];

const getMap = () => {
  return webStorage.get<TaskMapDto>({ key: TASK_MAP_KEY }) ?? {};
};

const getTasks = ({ date }: { date: DateTimestamp }) => {
  const map = getMap();
  return map[date] ?? sampleTasks(date);
};

const patchTasks = ({ date, tasks }: { date: DateTimestamp; tasks: Task[] }) => {
  const map = getMap();
  map[date] = tasks;
  webStorage.set({
    key: TASK_MAP_KEY,
    value: map,
  });
};

export const TaskRepository = {
  getMap,
  getTasks,
  patchTasks,
};
