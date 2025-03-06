import { useStoreFromContext } from "./context";
import { StoreImplProps, StoreImplResult, UnknownStoreImpl, ZustandStore } from "./store";
import { useStore as useZustandStore } from "zustand";

type StoreHook<Impl extends UnknownStoreImpl> = (props?: StoreImplProps<Impl>) => StoreImplResult<Impl>;

const createHook = <Impl extends UnknownStoreImpl>(implemented: Impl): StoreHook<Impl> => {
  const useStore: StoreHook<Impl> = props => {
    const fromContext = useStoreFromContext({ name: implemented.name });
    let store: ZustandStore<StoreImplResult<Impl>>;
    if (props) {
      const injected = implemented.inject(props);
      store = injected.store as ZustandStore<StoreImplResult<Impl>>;
    } else {
      if (!fromContext) throw new Error("No store matching");
      store = fromContext.store as ZustandStore<StoreImplResult<Impl>>;
    }
    return useZustandStore(store);
  };
  return useStore;
};

export { createHook };
