import { ID } from "@constant/ID";
import { Achievement } from "../achievement/Achievement";

export type TaskSummary = {
  id: ID["TASK"];
  name: string;
  achievement: Achievement;
};
