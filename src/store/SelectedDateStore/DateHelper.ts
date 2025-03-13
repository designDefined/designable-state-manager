import { DateTimestamp } from "@entity/time/Timestamp";

const MS_OF_ONE_DAY = 1000 * 60 * 60 * 24;

const toDate = (input: Date) => {
  const date = new Date(input);
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
};
const addDay = (input: DateTimestamp, daysToAdd: number) => {
  return input + daysToAdd * MS_OF_ONE_DAY;
};

export const DateHelper = { toDate, addDay };
