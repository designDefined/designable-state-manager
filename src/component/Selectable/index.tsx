import { bindCSS, Div, PropsOf } from "@flexive/core";
import styles from "./index.module.css";

const cx = bindCSS(styles);

type SelectableProps = PropsOf<"div"> & {
  selected?: boolean;
  selectedClassName?: string;
  onSelect?: () => void;
  onCancel?: () => void;
};

export const Selectable = ({
  selected,
  className,
  selectedClassName = "",
  onClick,
  onSelect,
  onCancel,
  ...props
}: SelectableProps) => {
  return (
    <Div
      className={cx("Selectable", className, { selected, [selectedClassName]: selected })}
      onClick={() => {
        onClick?.();
        if (!selected) onSelect?.();
        else onCancel?.();
      }}
      {...props}
    />
  );
};
