import { useStore as useZustandStore } from "zustand";
import { useStoreFromContext } from "./context";
import { StoreFactoryProps, StoreFactoryResult, UnknownStoreFactory, ZustandStore } from "./store";

type StoreHook<Factory extends UnknownStoreFactory> = (
  props?: StoreFactoryProps<Factory>,
) => StoreFactoryResult<Factory>;

const createHook = <Factory extends UnknownStoreFactory>(factory: Factory): StoreHook<Factory> => {
  const useStore: StoreHook<Factory> = props => {
    const fromContext = useStoreFromContext({ serialKey: factory.serialKey });
    let store: ZustandStore<StoreFactoryResult<Factory>>;
    if (props) {
      // @ts-expect-error TODO: Covariance problem. How can I solve this?
      const injected = factory.inject(props);
      store = injected.store as ZustandStore<StoreFactoryResult<Factory>>;
    } else {
      if (!fromContext) throw new Error("No store matching");
      store = fromContext.store as ZustandStore<StoreFactoryResult<Factory>>;
    }
    return useZustandStore(store);
  };
  return useStore;
};

export { createHook };
