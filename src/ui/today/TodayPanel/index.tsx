import { Article, Header } from "@flexive/core";
import { StoreProvider } from "@library";
import { useSelectedDateStore } from "@store/SelectedDateStore";

import { UpdateDailyTasksIntentStore } from "@store/intent/UpdateDailyTasksIntentStore";
import { DailyTasksViewStore } from "@store/view/DailyTasksViewStore";
import { cn } from "@style/utility";
import { DateSlider } from "../DateSlider";
import { TasksOfDay } from "../TasksOfDay";

export const TodayPanel = () => {
  const { selectedDate } = useSelectedDateStore();

  return (
    <StoreProvider
      deps={[selectedDate]}
      storeFunctions={[
        () => DailyTasksViewStore.inject({ date: selectedDate }),
        () => UpdateDailyTasksIntentStore.inject({ date: selectedDate }),
      ]}
    >
      <Article className={cn("border-3")} f mt="7.2rem" rad={24} p="2.4rem">
        <Header className={cn("bg-1")} absolute top="-9rem" right="48px" px={24}>
          <DateSlider />
        </Header>
        <TasksOfDay />
      </Article>
    </StoreProvider>
  );
};
