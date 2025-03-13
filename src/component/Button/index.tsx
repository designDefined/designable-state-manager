import { Button as _Button, bindCSS, PropsOf } from "@flexive/core";
import styles from "./index.module.css";

const cx = bindCSS(styles);

type ButtonProps = PropsOf<"button">;

export const Button = ({ className, ...props }: ButtonProps) => {
  return <_Button className={cx("Button", className)} {...props} />;
};
