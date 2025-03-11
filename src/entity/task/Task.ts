import { ID } from "@constant/ID";
import { DateTimestamp } from "@entity/time/Timestamp";
import { Achievement } from "../achievement/Achievement";
import { Content } from "../content/Content";

export type Task = {
  id: ID["TASK"];
  label: string;
  achievement: Achievement;
  description: Content;
  date: DateTimestamp;
};
