import { ID } from "@constant/ID";
import { Achievement } from "../achievement/Achievement";
import { Content } from "../content/Content";
import { DateTimestamp } from "@entity/time/Timestamp";

export type Task = {
  id: ID["TASK"];
  label: string;
  achievement: Achievement;
  description: Content;
  date: DateTimestamp;
};
