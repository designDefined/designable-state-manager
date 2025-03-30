import { ID } from "@constant/ID";
import { AchievementDraft } from "@entity/achievement/AchievementDraft";
import { Content } from "@entity/content/Content";

export type TaskDraft = {
  id: ID["TASK"];
  cycleId: ID["CYCLE"];
  name: string;
  description?: Content;
  achievementDraft: AchievementDraft;
};
