type STORAGE_TYPE = "LOCAL" | "SESSION";

type CommonStorageOption = {
  type?: STORAGE_TYPE;
  key: string;
};
type AsyncStorageOption = CommonStorageOption & {
  delay?: number;
};

const selectStorage = ({ type }: { type: STORAGE_TYPE }) => (type === "LOCAL" ? localStorage : sessionStorage);

const get = <T>({ type = "LOCAL", key }: CommonStorageOption) => {
  const storage = selectStorage({ type });
  const item = storage.getItem(key);
  if (!item) return null;
  return JSON.parse(item) as T;
};
const getAsync = <T>(option: AsyncStorageOption): Promise<T> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const item = get<T>(option);
      if (item === null) return reject(null);
      resolve(item);
    }, option.delay);
  });

const set = <T>({ type = "LOCAL", key, value }: CommonStorageOption & { value: T }) => {
  const storage = selectStorage({ type });
  storage.setItem(key, JSON.stringify(value));
};
const setSync = <T>(option: AsyncStorageOption & { value: T }): Promise<void> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        set<T>(option);
        resolve();
      } catch (error) {
        reject(error);
      }
    }, option.delay);
  });

const webStorage = {
  get,
  getAsync,
  set,
  setSync,
};

export { webStorage };
