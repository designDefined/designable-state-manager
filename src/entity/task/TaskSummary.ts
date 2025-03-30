import { ID } from "@constant/ID";
import { AchievementDraft } from "@entity/achievement/AchievementDraft";
import { Achievement } from "../achievement/Achievement";

export type TaskSummary = {
  id: ID["TASK"];
  name: string;
  achievement: Achievement;
};

export type TaskDraftSummary = {
  id: ID["TASK"];
  name: string;
  achievementDraft: AchievementDraft;
};

export type TaskReservedSummary = {
  id: ID["TASK"];
  draftId?: ID["TASK"];
  name: string;
  achievementDraft: AchievementDraft;
};
