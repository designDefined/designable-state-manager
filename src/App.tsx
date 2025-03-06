import { Main } from "@flexive/core";
import { StoreProvider } from "@library";
import { GlobalTestModule1, GlobalTestModule2, LocalTestModule } from "@module/TestModule";
import { textStore } from "@store/test";

function App() {
  return (
    <Main>
      <StoreProvider storeFunctions={[() => textStore.inject({ initialText: "Never expose" })]}>
        <GlobalTestModule1 />
        <GlobalTestModule2 />
        <LocalTestModule />
      </StoreProvider>
    </Main>
  );
}

export default App;
