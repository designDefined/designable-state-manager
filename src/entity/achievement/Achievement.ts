import { ACHIVEMENT_TYPE } from "@constant/ACHIEVEMENT";
import { Content } from "@entity/content/Content";

type AchievementBase<TYPE extends ACHIVEMENT_TYPE> = {
  type: TYPE;
  done: boolean;
};

export type ToggleAchievement = AchievementBase<"TOGGLE">;
export type MemoAchievement = AchievementBase<"MEMO"> & {
  memo: Content;
  achieveTextCount: number;
};

export type Achievement = ToggleAchievement | MemoAchievement;

export type AchievementDetailByType = {
  [Item in Achievement as Item["type"]]: Omit<Item, "type" | "done">;
};
