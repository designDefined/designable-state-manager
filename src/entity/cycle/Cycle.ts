import { ID } from "@constant/ID";
import { INTERVAL_TYPE } from "@constant/INTERVAL_TYPE";
import { Content } from "@entity/content/Content";
import { TaskDraft } from "@entity/task/TaskDraft";

export type Cycle = {
  id: ID["CYCLE"];
  goalId: ID["GOAL"];
  name: string;
  description?: Content;
  intervalType: INTERVAL_TYPE;
  intervalAmount: number;
  intervalRounded?: boolean;
  drafts: TaskDraft[];
};
