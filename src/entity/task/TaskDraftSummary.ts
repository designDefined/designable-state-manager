import { ID } from "@constant/ID";
import { AchievementDraft } from "@entity/achievement/AchievementDraft";

export type TaskDraftSummary = {
  id: ID["TASK"];
  name: string;
  achievementDraft: AchievementDraft;
};
