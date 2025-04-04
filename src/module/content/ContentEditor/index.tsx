import { Textarea } from "@flexive/core";
import { useContentStore } from "@store/ContentStore";

export const ContentEditor = () => {
  const { content, writeContent } = useContentStore();
  // const [draft, setDraft] = useState(content);

  return (
    <Textarea
      value={content}
      onChange={e => {
        writeContent(e.target.value);
      }}
      // onBlur={() => {
      //   writeContent(draft);
      // }}
    />
  );
};
