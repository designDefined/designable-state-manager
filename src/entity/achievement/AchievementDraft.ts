import { ACHIEVEMENT_TYPE, ACHIEVEMENT_TYPE_ENUM } from "@constant/ACHIEVEMENT_TYPE";

type AchievementDraftBase<Type extends ACHIEVEMENT_TYPE> = {
  type: Type;
};

export type ToggleAchievementDraft = AchievementDraftBase<ACHIEVEMENT_TYPE_ENUM["TOGGLE"]>;
export type MemoAchievementDraft = AchievementDraftBase<ACHIEVEMENT_TYPE_ENUM["MEMO"]> & {
  targetCharacterCount: number;
};

export type AchievementDraft = ToggleAchievementDraft | MemoAchievementDraft;
