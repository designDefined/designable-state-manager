import { PropsWithChildren, useContext, useEffect, useMemo } from "react";
import { StoreContext } from "./context";
import { Store } from "./store";

// Provider
type StoreProviderProps = PropsWithChildren & { storeFunctions: (() => Store)[]; deps?: unknown[] };

const mergeStores = (...stores: Store[]): Store[] => {
  const storeMap = new Map<string, Store>();
  stores.forEach(store => {
    storeMap.set(store.name, store);
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
