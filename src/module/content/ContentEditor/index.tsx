import { Textarea } from "@flexive/core";
import { useContentStore } from "@store/ContentStore";

export const ContentEditor = () => {
  const { content, writeContent } = useContentStore();

  return (
    <Textarea
      value={content}
      onChange={e => {
        writeContent(e.target.value);
      }}
    />
  );
};
