import { ACHIEVEMENT_TYPE, ACHIEVEMENT_TYPE_ENUM } from "@constant/ACHIEVEMENT_TYPE";
import { Content } from "@entity/content/Content";

type AchievementBase<Type extends ACHIEVEMENT_TYPE> = {
  type: Type;
  done: boolean;
};

export type ToggleAchievement = AchievementBase<ACHIEVEMENT_TYPE_ENUM["TOGGLE"]>;
export type MemoAchievement = AchievementBase<ACHIEVEMENT_TYPE_ENUM["MEMO"]> & {
  memo: Content;
  targetCharacterCount: number;
};

export type Achievement = ToggleAchievement | MemoAchievement;
