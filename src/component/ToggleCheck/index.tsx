import { bindCSS, Button, PropsOf } from "@flexive/core";
import { Circle, CircleCheckBig } from "lucide-react";
import styles from "./index.module.css";

const cx = bindCSS(styles);

type ToggleCheckProps = Omit<PropsOf<"button">, "children"> & { toggled?: boolean };

export const ToggleCheck = ({ className, toggled, ...props }: ToggleCheckProps) => {
  return (
    <Button className={cx("ToggleCheck", toggled ? "text-7" : "text-3", className)} rad="50%" {...props}>
      {toggled ? <CircleCheckBig /> : <Circle />}
    </Button>
  );
};
