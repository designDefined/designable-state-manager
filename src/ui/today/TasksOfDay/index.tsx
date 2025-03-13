import { H6, Main, Section } from "@flexive/core";
import { StoreProvider } from "@library";
import { TaskList } from "@module/task/TaskList";
import { useSelectedDateStore } from "@store/SelectedDateStore";
import { TasksViewStore } from "@store/ViewStore/tasks";
import { sampleTasks } from "./sampleTasks";

export const TasksOfDay = () => {
  const { selectedDate } = useSelectedDateStore();

  return (
    <Section g={24}>
      <H6 className="text-6 light" px={48} py={32} alignC="end" />
      <StoreProvider
        deps={[selectedDate]}
        storeFunctions={[
          () =>
            TasksViewStore.inject({
              from: () => sampleTasks(selectedDate),
              deps: { selectedDate },
            }),
        ]}
      >
        <Main f overM>
          <TaskList />
        </Main>
      </StoreProvider>
    </Section>
  );
};
