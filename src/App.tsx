import { Task } from "@entity/task/Task";
import { Main } from "@flexive/core";
import { StoreProvider } from "@library";
import { TaskList } from "@module/task/TaskList";
import { TasksViewStore } from "@store/ViewStore/tasks";

const sampleTasks: Task[] = [
  {
    id: "sample1",
    label: "Sample Toggle Task",
    achievement: { type: "TOGGLE", done: false },
    description: "Sample Description",
    date: 0,
  },
  {
    id: "sample2",
    label: "Sample Memo Task",
    achievement: { type: "MEMO", memo: "", achieveTextCount: 10, done: false },
    description: "Sample Description",
    date: 0,
  },
];

function App() {
  return (
    <Main>
      <StoreProvider
        storeFunctions={[
          () =>
            TasksViewStore.inject({
              from: () => sampleTasks,
              deps: { date: 1 },
            }),
        ]}
      >
        <TaskList />
      </StoreProvider>
    </Main>
  );
}

export default App;
