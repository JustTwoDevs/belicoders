import {
  MDXEditor,
  toolbarPlugin,
  listsPlugin,
  headingsPlugin,
  quotePlugin,
  markdownShortcutPlugin,
  linkPlugin,
  linkDialogPlugin,
  imagePlugin,
  tablePlugin,
  diffSourcePlugin,
  BoldItalicUnderlineToggles,
  CodeToggle,
  CreateLink,
  InsertImage,
  DiffSourceToggleWrapper,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import { useRef } from "react";

const ReplieEditor = ({ markdown, comment }) => {
  const ref = useRef(null);

  return (
    <>
      <style>
        {`
      ._toolbarRoot_16b3d_141 {
        background-color: transparent;
      }
      .cm-editor{
        background-color: transparent;
        margin: 10px
      }
      .ͼ1.cm-focused{
        outline: none;
      `}
      </style>
      <MDXEditor
        ref={ref}
        markdown={markdown}
        className="min-w-full bg-slate-200 rounded-2xl shadow-md shadow-gray-400 border border-gray-300 flex flex-col-reverse"
        contentEditableClassName="prose"
        plugins={[
          headingsPlugin(),
          listsPlugin(),
          linkPlugin(),
          quotePlugin(),
          markdownShortcutPlugin(),
          diffSourcePlugin(),
          linkDialogPlugin(),
          imagePlugin({
            imageUploadHandler: (file) => {
              return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = (e) => {
                  resolve(e.target.result);
                };
                reader.onerror = (e) => {
                  reject(e);
                };
                reader.readAsDataURL(file);
              });
            },
          }),
          tablePlugin(),
          toolbarPlugin({
            toolbarContents: () => (
              <div className="flex flex-wrap items-center w-full bg-slate-200 p-0">
                <DiffSourceToggleWrapper>
                  <CodeToggle />
                  <CreateLink />
                  <InsertImage />
                  <BoldItalicUnderlineToggles />
                </DiffSourceToggleWrapper>
                <button
                  className="ml-auto py-1 font-medium items-center select-none rounded-lg px-4 text-sm bg-green-500 text-white hover:bg-green-600"
                  onClick={() => comment(ref.current?.getMarkdown())}
                >
                  Comment
                </button>
              </div>
            ),
          }),
        ]}
      />
    </>
  );
};

export default ReplieEditor;
