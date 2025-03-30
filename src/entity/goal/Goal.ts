import { GOAL_STATUS } from "@constant/GOAL_STATUS";
import { ID } from "@constant/ID";
import { Color } from "@entity/color/Color";
import { Content } from "@entity/content/Content";
import { DateTimestamp } from "@entity/time/Timestamp";

export type Goal = {
  id: ID["GOAL"];
  status: GOAL_STATUS;
  name: string;
  color?: Color;
  description?: Content;
  startDate: DateTimestamp;
  endDate: DateTimestamp;
};
