import { Div } from "@flexive/core";
import { textStore } from "../../store/test";
import { TextAndCount } from "../TextAndCount";
import { StoreProvider } from "@library";

export const GlobalTestModule1 = () => {
  return (
    <StoreProvider storeFunctions={[() => textStore.inject({ initialText: "hello world" })]}>
      <Div>Global 1</Div>
      <TextAndCount />
    </StoreProvider>
  );
};

export const GlobalTestModule2 = () => {
  return (
    <StoreProvider storeFunctions={[() => textStore.inject({ initialText: "hello world" })]}>
      <Div>Global 2</Div>
      <TextAndCount />
    </StoreProvider>
  );
};

export const LocalTestModule = () => {
  return (
    <StoreProvider storeFunctions={[() => textStore.inject({ initialText: "hello world" }, { local: true })]}>
      <Div>Local</Div>
      <TextAndCount />
    </StoreProvider>
  );
};
