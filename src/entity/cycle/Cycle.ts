import { ID } from "@constant/ID";
import { Color } from "@entity/color/Color";
import { Content } from "@entity/content/Content";
import { Interval } from "@entity/time/Interval";
import { DateTimestamp } from "@entity/time/Timestamp";

export type Cycle = {
  id: ID["CYCLE"];
  name: string;
  description?: Content;
  color?: Color;
  interval: Interval;
  startDate: DateTimestamp;
  endDate?: DateTimestamp;
};
