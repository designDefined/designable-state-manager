import { Task } from "@entity/task/Task";
import { Main } from "@flexive/core";
import { StoreProvider } from "@library";
import { ContentEditor } from "@module/content/ContentEditor";
import { TaskItem } from "@module/task/TaskItem";
import { ContentStore } from "@store/ContentStore";
import { TaskStore } from "@store/TaskStore";

const sampleTask: Task = {
  id: "sample",
  label: "Sample Task",
  achievement: { type: "TOGGLE", done: false },
  description: "Sample Description",
  date: 0,
};

function App() {
  return (
    <Main>
      content:
      <StoreProvider storeFunctions={[() => ContentStore.inject({}, { local: true })]}>
        <ContentEditor />
      </StoreProvider>
      task:
      <StoreProvider storeFunctions={[() => TaskStore.inject({ initialTask: sampleTask }, { local: true })]}>
        <TaskItem />
      </StoreProvider>
    </Main>
  );
}

export default App;
