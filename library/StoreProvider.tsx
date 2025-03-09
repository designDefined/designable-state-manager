import { PropsWithChildren, useContext, useEffect, useMemo } from "react";
import { UnknownStore } from "./store";
import { StoreContext } from "./context";

// Provider
type StoreProviderProps = PropsWithChildren & { storeFunctions: (() => UnknownStore)[]; deps?: unknown[] };

const mergeStores = (...stores: UnknownStore[]): UnknownStore[] => {
  const storeMap = new Map<string, UnknownStore>();
  stores.forEach(store => {
    storeMap.set(store.serialKey, store);
  });
  return Array.from(storeMap.values());
};

export const StoreProvider = ({ children, storeFunctions, deps }: StoreProviderProps) => {
  const { storeList } = useContext(StoreContext);
  const newStores = useMemo(() => storeFunctions.map(fn => fn()), deps ?? []);

  useEffect(() => {
    const destroyCallbacks = newStores.map(({ destroy }) => destroy);
    return () => {
      destroyCallbacks.forEach(fn => fn());
    };
  }, [newStores]);

  return (
    <StoreContext.Provider value={{ storeList: mergeStores(...storeList, ...newStores) }}>
      {children}
    </StoreContext.Provider>
  );
};
