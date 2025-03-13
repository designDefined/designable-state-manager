import { Div, Main, Section } from "@flexive/core";
import { StoreProvider } from "@library";
import { SelectedDateStore } from "@store/SelectedDateStore";
import { SelectedTaskStore } from "@store/SelectedTaskStore";
import { Footer } from "@ui/footer/Footer";
import { Header } from "@ui/header/Header";
import { TodayPanel } from "@ui/today/TodayPanel";

export const App = () => {
  return (
    <StoreProvider storeFunctions={[() => SelectedDateStore.inject({}), () => SelectedTaskStore.inject({})]}>
      <Main className="App" minM="100vh">
        <Header />
        <Main row f>
          <Div basis={0} grow />
          <Div className="responsive-dir" basis={0} grow={8}>
            <Section basis={0} grow={1}>
              <TodayPanel />
            </Section>
            <Section basis={0} grow={1}></Section>
          </Div>
          <Div grow={1} basis={0} />
        </Main>
        <Footer />
      </Main>
    </StoreProvider>
  );
};
