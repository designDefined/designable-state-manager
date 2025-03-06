const cacheMap = new Map();

const get = <T>({ key }: { key: string }) => {
  return cacheMap.get(key) as T | undefined;
};
const set = <T>({ key, value }: { key: string; value: T }) => {
  cacheMap.set(key, value);
  console.log(cacheMap);
};
const retrieve = <T>({ key, init }: { key: string; init?: () => T }) => {
  const cached = get<T>({ key });
  if (cached) return cached;
  if (!init) throw new Error("Init function must be provided if there's no matching cache");
  const newCache = init();
  set({ key, value: newCache });
  return newCache;
};

const cache = {
  get,
  set,
  retrieve,
};

export { cache };
