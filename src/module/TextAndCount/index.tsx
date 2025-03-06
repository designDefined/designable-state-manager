import { Div, Input } from "@flexive/core";
import { useTextStore } from "../../store/test";
import { CountButton } from "../CountButton";

export const TextAndCount = () => {
  const { text, setText, count } = useTextStore();

  return (
    <Div>
      <Input value={text} onChange={e => setText(e.target.value)}></Input>
      <Div>no less than text length: {count}</Div>
      <CountButton />
    </Div>
  );
};
