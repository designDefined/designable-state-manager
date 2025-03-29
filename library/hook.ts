import { useStore as useZustandStore } from "zustand";
import { useStoreFromContext } from "./context";
import { StoreFactory } from "./store";

const createHook = <Factory extends StoreFactory>(factory: Factory) => {
  const useStore = (props?: Parameters<Factory["inject"]>[0]) => {
    const fromContext = useStoreFromContext<ReturnType<Factory["inject"]>>({ name: factory.name });
    let store: ReturnType<Factory["inject"]>["client"];
    if (props) {
      const injected = factory.inject(props);
      store = injected.client;
    } else {
      if (!fromContext) throw new Error("No store matching");
      store = fromContext.client;
    }
    return useZustandStore(store);
  };
  return useStore;
};

export { createHook };
