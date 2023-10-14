import dynamic from "next/dynamic";
import { Suspense } from "react";

const EditorComp = dynamic(() => import("../../components/EditorComponent"), {
  ssr: false,
});

const markdown = "Hello world";
export default function Home() {
  return (
    <div className="prose prose-code:">
      Editor:
      <Suspense fallback={null}>
        <EditorComp markdown={markdown} />
      </Suspense>
    </div>
  );
}
