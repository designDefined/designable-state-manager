import { H6, Main, Section, Span } from "@flexive/core";
import { TaskList } from "@module/task/TaskList";
import { useCountsWithMessage } from "./useCountsWithMessage";

export const TasksOfDay = () => {
  const { totalCount, doneCount, progressMessage } = useCountsWithMessage();

  return (
    <Section g={24}>
      <H6 className="text-6 light" row pt="2rem" px="1rem" alignM="between" g="2rem">
        <Span>{progressMessage}</Span>
        <Span>
          {doneCount} / {totalCount}
        </Span>
      </H6>
      <Main f overM>
        <TaskList />
      </Main>
    </Section>
  );
};
