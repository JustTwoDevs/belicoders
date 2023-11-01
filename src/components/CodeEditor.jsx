"use client";
import { Editor } from "@monaco-editor/react";
import NavEditor from "./NavEditor";
import { useRef, useState } from "react";

export default function CodeEditor({ className }) {
  const editorRef = useRef(null);
  const [fontSize, setFontSize] = useState(19);
  const [tabSize, setTabSize] = useState(2);

  return (
    <section className={`flex flex-col ${className}`}>
      <NavEditor
        fontSize={fontSize}
        setFontSize={setFontSize}
        tabSize={tabSize}
        setTabSize={setTabSize}
        resetCode={() => editorRef.current.setValue("")}
      />
      <Editor
        height="96%"
        defaultLanguage="python"
        theme="vs-dark"
        defaultValue="// some comment"
        onMount={(editor, monaco) => {
          editorRef.current = editor;
        }}
        options={{
          fontSize: fontSize,
          minimap: { enabled: false },
          tabSize: tabSize,
          wordWrap: "on",
          renderLineHighlight: "none",
        }}
      />
    </section>
  );
}
