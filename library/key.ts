import { nanoid } from "nanoid";

type FalsyKey = false | null | undefined;
type TruthyKey = string | number | (TruthyKey | FalsyKey)[] | { [key: string]: TruthyKey | FalsyKey };

type RawKey = TruthyKey | FalsyKey;
type HashedKey = string;

const isValidKey = (key: RawKey): key is TruthyKey => {
  return !(key === false || key === null || key === undefined);
};

const safeHash = (key: RawKey): HashedKey | undefined => {
  if (!isValidKey(key)) return undefined;
  if (typeof key === "string") return key;
  if (typeof key === "number") return key.toString();
  if (Array.isArray(key)) return key.map(safeHash).filter(isValidKey).join("_");

  const sanitizedEntry = Object.entries(key)
    .sort(([key1], [key2]) => (key1 < key2 ? -1 : 1))
    .filter(([, value]) => isValidKey(value))
    .map(([key, value]) => [key, safeHash(value)] as const);
  return JSON.stringify(Object.fromEntries(sanitizedEntry));
};

const hash = (key: RawKey): HashedKey => {
  const hashedKey = safeHash(key);
  if (hashedKey === undefined) {
    throw new Error("Invalid key");
  }
  return hashedKey;
};

const random = ({ prefix }: { prefix?: string } = {}) => hash([prefix, nanoid()]);

const keyManager = {
  hash,
  safeHash,
  random,
};

export { keyManager };
export type { FalsyKey, HashedKey, RawKey, TruthyKey };
