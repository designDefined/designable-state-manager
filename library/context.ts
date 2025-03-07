import { createContext, useContext } from "react";
import { UnknownStore } from "./store";

// Context
type StoreContext = {
  storeList: UnknownStore[];
};
const StoreContext = createContext<StoreContext>({
  storeList: [],
});
const useStoreFromContext = ({ serialKey }: { serialKey: string }) => {
  const { storeList } = useContext(StoreContext);
  return storeList.find(store => store.availableKeys.includes(serialKey));
};

export { StoreContext, useStoreFromContext };
