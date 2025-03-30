export type INTERVAL_TYPE = "HOUR" | "DAY" | "WEEK" | "MONTH" | "YEAR";
export type INTERVAL_TYPE_ENUM = {
  [T in INTERVAL_TYPE]: T;
};
