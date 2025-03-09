import { Task } from "@entity/task/Task";
import { Button, Div, Header, Main } from "@flexive/core";
import { StoreProvider } from "@library";
import { TaskList } from "@module/task/TaskList";
import { TasksViewStore } from "@store/ViewStore/tasks";
import { useState } from "react";

const sampleTasks = (id: number): Task[] => [
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

function App() {
  const [date, setDate] = useState(1);
  return (
    <Main>
      <Header row g={4}>
        <Button onClick={() => setDate(date - 1)}>prev</Button>
        <Div>{date}</Div>
        <Button onClick={() => setDate(date + 1)}>next</Button>
      </Header>
      <StoreProvider
        storeFunctions={[
          () =>
            TasksViewStore.inject({
              from: () => sampleTasks(date),
              deps: { date },
            }),
        ]}
        deps={[date]}
      >
        <TaskList key={date} />
      </StoreProvider>
    </Main>
  );
}

export default App;
