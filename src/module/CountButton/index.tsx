import { Button, Div } from "@flexive/core";
import { useCountStore } from "@store/test";

export const CountButton = () => {
  const { addCount } = useCountStore();

  return (
    <Div row g={4}>
      <Button onClick={() => addCount()}>add count </Button>
    </Div>
  );
};
