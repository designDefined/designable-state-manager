import { ID } from "@constant/ID";
import { Timestamp } from "@entity/time/Timestamp";
import { Achievement } from "../achievement/Achievement";
import { Content } from "../content/Content";

export type QuickTask = {
  id: ID["TASK"];
  time: Timestamp;
  name: string;
  description?: Content;
  achievement: Achievement;
};
