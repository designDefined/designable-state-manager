import { Task } from "@entity/task/Task";

export const sampleTasks = (id: number): Task[] => [
  {
    id: `sample${id * 2 - 1}`,
    label: `Sample Toggle Task ${id}`,
    achievement: { type: "TOGGLE", done: false },
    description: "Sample Description",
    date: 0,
  },
  {
    id: `sample${id * 2}`,
    label: `Sample Memo Task ${id}`,
    achievement: { type: "MEMO", memo: "", achieveTextCount: 10, done: false },
    description: "Sample Description",
    date: 0,
  },
];
