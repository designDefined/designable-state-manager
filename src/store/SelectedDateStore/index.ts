import { DateTimestamp } from "@entity/time/Timestamp";
import { create, createHook } from "@library";
import { DateHelper } from "./DateHelper";

type SelectedDateStore = {
  selectedDate: DateTimestamp;
  isToday: boolean;
  toNextDay: () => void;
  toPrevDay: () => void;
};

const SelectedDateStore = create<object, SelectedDateStore>({ name: "SelectedDateStore" }).implement(() => {
  const today = DateHelper.toDate(new Date());
  const initialDate = today.getTime();

  return {
    store: set => ({
      selectedDate: initialDate,
      isToday: true,
      toNextDay: () =>
        set(prev => {
          const nextDate = DateHelper.addDay(prev.selectedDate, 1);
          return {
            selectedDate: nextDate,
            isToday: nextDate === initialDate,
          };
        }),
      toPrevDay: () =>
        set(prev => {
          const prevDate = DateHelper.addDay(prev.selectedDate, -1);
          if (prevDate < initialDate) return {};
          return {
            selectedDate: prevDate,
            isToday: prevDate === initialDate,
          };
        }),
    }),
  };
});

const useSelectedDateStore = createHook(SelectedDateStore);

export { SelectedDateStore, useSelectedDateStore };
