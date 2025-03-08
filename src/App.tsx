import { Task } from "@entity/task/Task";
import { Div, Main } from "@flexive/core";
import { StoreProvider } from "@library";
import { ContentEditor } from "@module/content/ContentEditor";
import { TaskItem } from "@module/task/TaskItem";
import { ContentStore } from "@store/ContentStore";
import { TaskStore } from "@store/TaskStore";

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
      content:
      <StoreProvider storeFunctions={[() => ContentStore.inject({}, { local: true })]}>
        <ContentEditor />
      </StoreProvider>
      task:
      <Div>
        {sampleTasks.map(task => (
          <StoreProvider
            key={task.id}
            storeFunctions={[() => TaskStore.inject({ initialTask: task }, { local: true })]}
          >
            <TaskItem />
          </StoreProvider>
        ))}
      </Div>
    </Main>
  );
}

export default App;
