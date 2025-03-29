import { Content } from "@entity/content/Content";
import { create, createHook } from "@library";

type ContentStore = {
  content: Content;
  writeContent: (content: Content) => void;
  countContent: () => number;
};

const ContentStore = create<{ initialContent?: Content }, ContentStore>({ name: "ContentStore" }).implement(
  ({ injected }) => ({
    store: (set, get) => ({
      content: injected.initialContent ?? "",
      writeContent: content => set({ content }),
      countContent: () => get().content.length,
    }),
  }),
);

const useContentStore = createHook(ContentStore);

export { ContentStore, useContentStore };
