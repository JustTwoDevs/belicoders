import dynamic from "next/dynamic";
import { Suspense } from "react";
const MDXEditorC = dynamic(() => import("@/components/MDXEditorC"), {
  ssr: false,
});

const markdown = `
# Hello
This is a hello world from markdown editor
## This is a heading 2.
`;

export default function MDEditor() {
  return (
    <main className="min-h-screen">
      <Suspense fallback={null}>
        <MDXEditorC markdown={markdown} />
      </Suspense>
    </main>
  );
}
