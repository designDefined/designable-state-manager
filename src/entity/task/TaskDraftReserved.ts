import { ID } from "@constant/ID";
import { AchievementDraft } from "@entity/achievement/AchievementDraft";
import { Content } from "@entity/content/Content";
import { DateTimestamp } from "@entity/time/Timestamp";

export type TaskDraftReserved = {
  id: ID["TASK"];
  date: DateTimestamp;
  cycleId?: ID["CYCLE"];
  draftId?: ID["TASK"];
  name: string;
  description?: Content;
  achievementDraft: AchievementDraft;
};
