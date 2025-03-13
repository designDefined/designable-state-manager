import { Button } from "@component/Button";
import { PropsOf } from "@flexive/core";
import { ChevronRight } from "lucide-react";

type ToggleChevron = Omit<PropsOf<"button">, "children"> & { toggled?: boolean };

export const ToggleChevron = ({ toggled, style, ...props }: ToggleChevron) => {
  return (
    <Button style={{ ...style, transform: `${toggled ? "rotate(90deg)" : ""}` }} {...props}>
      <ChevronRight strokeWidth="0.1em" />
    </Button>
  );
};
