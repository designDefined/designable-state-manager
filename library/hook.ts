import { useStoreFromContext } from "./context";
import { useStore as useZustandStore } from "zustand";
import { StoreFactoryProps, StoreFactoryResult, UnknownStoreFactory, ZustandStore } from "./store";

type StoreHook<Impl extends UnknownStoreFactory> = (props?: StoreFactoryProps<Impl>) => StoreFactoryResult<Impl>;

const createHook = <Impl extends UnknownStoreFactory>(implemented: Impl): StoreHook<Impl> => {
  const useStore: StoreHook<Impl> = props => {
    const fromContext = useStoreFromContext({ serialKey: implemented.serialKey });
    let store: ZustandStore<StoreFactoryResult<Impl>>;
    if (props) {
      const injected = implemented.inject(props);
      store = injected.store as ZustandStore<StoreFactoryResult<Impl>>;
    } else {
      if (!fromContext) throw new Error("No store matching");
      store = fromContext.store as ZustandStore<StoreFactoryResult<Impl>>;
    }
    return useZustandStore(store);
  };
  return useStore;
};

export { createHook };
