import { create } from "@library";

type ViewStore<T> = {
  view: T;
  invalidate: () => void;
};
type ViewOf<Store extends ViewStore<unknown>> = Store extends ViewStore<infer U> ? U : never;

const createViewStore = <Store extends ViewStore<unknown>, Deps extends object = object>({
  viewName,
  from,
}: {
  viewName: string;
  from: (deps: Deps) => ViewOf<Store>;
}) =>
  create<Deps, ViewStore<ViewOf<Store>>>({ name: `${viewName}ViewStore` }).implement(({ injected }) => ({
    store: set => ({
      view: from(injected),
      invalidate: () => set({ view: from(injected) }),
    }),
  }));

export { createViewStore };
export type { ViewStore };
