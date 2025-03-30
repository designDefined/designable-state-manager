import { ID } from "@constant/ID";
import { DateTimestamp } from "@entity/time/Timestamp";
import { Achievement } from "../achievement/Achievement";
import { Content } from "../content/Content";

export type Task = {
  id: ID["TASK"];
  cycleId?: ID["CYCLE"];
  date: DateTimestamp;
  name: string;
  description?: Content;
  achievement: Achievement;
};
