import { useSelectedDateStore } from "@store/SelectedDateStore";
import { useDailyTasksViewStore } from "@store/view/DailyTasksViewStore";
import { useMemo } from "react";

export const useCountsWithMessage = () => {
  const { isToday } = useSelectedDateStore();
  const {
    view: { tasks },
  } = useDailyTasksViewStore();

  const result = useMemo(() => {
    let progressMessage = "";
    const totalCount = tasks.length;
    const doneCount = tasks.filter(task => task.achievement.done).length;

    if (totalCount === 0) {
      progressMessage = "아직 계획된 일이 없어요.";
      return {
        totalCount,
        doneCount,
        progressMessage,
      };
    }

    if (!isToday) {
      progressMessage = "이런 하루를 보낼 거에요.";
      return {
        totalCount,
        doneCount,
        progressMessage,
      };
    }

    const doneRatio = doneCount / totalCount;

    if (doneRatio < 0.2) {
      progressMessage = "좋은 하루의 시작이에요!";
    } else if (doneRatio <= 0.7) {
      progressMessage = "잘 하고 있어요.";
    } else if (doneRatio < 1) {
      progressMessage = "거의 다 왔어요.";
    } else {
      progressMessage = "정말 잘 했어요!";
    }

    return {
      totalCount,
      doneCount,
      progressMessage,
    };
  }, [tasks, isToday]);

  return result;
};
