import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface LessonContentProps {
  data: string;
}

export default function LessonContent({data} : LessonContentProps) {
  return (
    <article className="lesson-markdown max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {data}
      </ReactMarkdown>
    </article>
  );
}
