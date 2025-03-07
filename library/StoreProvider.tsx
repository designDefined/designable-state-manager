import { PropsWithChildren, useContext, useRef } from "react";
import { UnknownStore } from "./store";
import { StoreContext } from "./context";

// Provider
type StoreProviderProps = PropsWithChildren & { storeFunctions: (() => UnknownStore)[] };

const mergeStores = (...stores: UnknownStore[]): UnknownStore[] => {
  const storeMap = new Map<string, UnknownStore>();
  stores.forEach(store => {
    storeMap.set(store.serialKey, store);
  });
  return Array.from(storeMap.values());
};

export const StoreProvider = ({ children, storeFunctions }: StoreProviderProps) => {
  const { storeList } = useContext(StoreContext);
  const newStores = useRef(storeFunctions.map(fn => fn()));
  return (
    <StoreContext.Provider value={{ storeList: mergeStores(...storeList, ...newStores.current) }}>
      {children}
    </StoreContext.Provider>
  );
};
