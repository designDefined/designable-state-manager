import { Content } from "@entity/content/Content";
import { create, createHook } from "@library";

type ContentStore = {
  content: Content;
  writeContent: (content: Content) => void;
  countContent: () => number;
};

const ContentStore = create({ name: "ContentStore" }).implement<{ initialContent?: Content }, ContentStore>(
  () => (set, get) => ({
    content: "",
    writeContent: content => set({ content }),
    countContent: () => get().content.length,
  }),
);

const useContentStore = createHook(ContentStore);

export { ContentStore, useContentStore };
