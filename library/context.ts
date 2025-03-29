import { createContext, useContext } from "react";
import { Store } from "./store";

// Context
type StoreContext = {
  storeList: Store[];
};
const StoreContext = createContext<StoreContext>({
  storeList: [],
});
const useStoreFromContext = <TargetStore extends Store>({ name }: { name: string }) => {
  const { storeList } = useContext(StoreContext);
  return storeList.find(store => store.availableNames.includes(name)) as TargetStore | undefined;
};

export { StoreContext, useStoreFromContext };
