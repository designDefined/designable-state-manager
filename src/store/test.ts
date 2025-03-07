import { create, createHook } from "@library";

type CountStore = {
  count: number;
  addCount: () => void;
  setCount: (count: number) => void;
};
export const countStore = create({ name: "count" }).implement<{ initialCount?: number }, CountStore>(
  ({ injected: { initialCount } }) =>
    set => ({
      count: initialCount ?? 0,
      addCount: () => set(state => ({ count: state.count + 1 })),
      setCount: count => set({ count }),
    }),
);

type TextStore = CountStore & {
  text: string;
  setText: (text: string) => void;
};

export const textStore = create({ name: "text" })
  .extend(countStore)
  .implement<{ initialText?: string }, TextStore>(({ injected, extended }) => {
    const {
      store: { getState: countStore, subscribe: subscribeCountStore },
    } = extended.count.inject({ initialCount: injected.initialText?.length }, { local: true });

    return set => {
      subscribeCountStore(({ count }) => {
        set({ count });
      });
      const setText = (text: string) => {
        const prevCount = countStore().count;
        countStore().setCount(text.length > prevCount ? text.length : prevCount);
        set({ text });
      };

      return {
        ...countStore(),
        text: injected.initialText ?? "",
        setText,
      };
    };
  });

export const useCountStore = createHook(countStore);
export const useTextStore = createHook(textStore);
