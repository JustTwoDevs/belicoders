"use client";

import {
  MDXEditor,
  listsPlugin,
  headingsPlugin,
  quotePlugin,
  linkPlugin,
  diffSourcePlugin,
  thematicBreakPlugin,
  tablePlugin,
  codeBlockPlugin,
  markdownShortcutPlugin,
  codeMirrorPlugin,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";

export default function ShowMD({ markdown, ref }) {
  return (
    <MDXEditor
      className=""
      contentEditableClassName="prose"
      readOnly={true}
      markdown={markdown}
      ref={ref}
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        linkPlugin(),
        quotePlugin(),
        markdownShortcutPlugin(),
        diffSourcePlugin(),
        thematicBreakPlugin(),
        tablePlugin(),
        codeBlockPlugin(),
        codeMirrorPlugin({
          codeBlockLanguages: {
            js: "Javascript",
            py: "Python",
          },
        }),
      ]}
    />
  );
}
