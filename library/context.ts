import { createContext, useContext } from "react";
import { UnknownStore } from "./store";

// Context
type StoreContext = {
  storeList: UnknownStore[];
};
const StoreContext = createContext<StoreContext>({
  storeList: [],
});
const useStoreFromContext = ({ name }: { name: string }) => {
  const { storeList } = useContext(StoreContext);
  return storeList.find(store => store.availableNames.includes(name));
};

export { StoreContext, useStoreFromContext };
