import { Article, Header } from "@flexive/core";
import { cn } from "@style/utility";
import { DateSlider } from "../DateSlider";
import { TasksOfDay } from "../TasksOfDay";

export const TodayPanel = () => {
  return (
    <Article className={cn("border-3")} f mt="7.2rem" rad={24} p="2.4rem">
      <Header className={cn("bg-1")} absolute top="-9rem" right="48px" px={24}>
        <DateSlider />
      </Header>
      <TasksOfDay />
    </Article>
  );
};
