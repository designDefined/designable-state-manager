import { create } from "@library";

type ViewStore<T> = {
  view: T;
  invalidate: () => void;
};

const ViewHOS = <T, Deps extends object = object>({ viewName }: { viewName: string }) =>
  create({ name: `${viewName}ViewStore` }).implement<{ from: () => T; deps: Deps }, ViewStore<T>>(
    ({ injected }) =>
      set => ({
        view: injected.from(),
        invalidate: () => set({ view: injected.from() }),
      }),
  );

export type { ViewStore };
export { ViewHOS };
