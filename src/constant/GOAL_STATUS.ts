export type GOAL_STATUS = "NOT_STARTED" | "RUNNING" | "DONE";
export type GOAL_STATUS_ENUM = {
  [T in GOAL_STATUS]: T;
};
