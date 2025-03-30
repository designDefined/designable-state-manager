import { DAY_OF_WEEK } from "@constant/DAY_OF_WEEK";
import { INTERVAL_TYPE_ENUM } from "@constant/INTERVAL_TYPE";

export type DayInterval = {
  type: INTERVAL_TYPE_ENUM["DAY"];
  amount: number;
};

export type WeekInterval = {
  type: INTERVAL_TYPE_ENUM["WEEK"];
  amount: number;
  daysOfWeek: DAY_OF_WEEK[];
};

export type MonthInterval = {
  type: INTERVAL_TYPE_ENUM["MONTH"];
  amount: number;
  datesOfMonth: number[];
  rounded?: boolean;
};

export type YearInterval = {
  type: INTERVAL_TYPE_ENUM["YEAR"];
  amount: number;
  datesOfYear: number[];
  rounded?: boolean;
};

export type Interval = DayInterval | WeekInterval | MonthInterval | YearInterval;
