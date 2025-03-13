import { DateTimestamp } from "@entity/time/Timestamp";
import { useMemo } from "react";

export const useDateSliderDisplay = (date: DateTimestamp) => {
  const display = useMemo(() => {
    const dateInstance = new Date(date);
    return {
      year: dateInstance.getFullYear(),
      month: dateInstance.getMonth() + 1,
      date: dateInstance.getDate(),
    };
  }, [date]);
  return display;
};
