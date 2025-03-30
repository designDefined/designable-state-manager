import { ID } from "@constant/ID";
import { AchievementDraft } from "@entity/achievement/AchievementDraft";
import { Content } from "@entity/content/Content";
import { Timestamp } from "@entity/time/Timestamp";

export type TaskDraftReserved = {
  id: ID["TASK"];
  cycleId: ID["CYCLE"];
  cycleCount: number;
  startTime: Timestamp;
  endTime: Timestamp;
  draftId?: ID["TASK"];
  name: string;
  description?: Content;
  achievementDraft: AchievementDraft;
};
