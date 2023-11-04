"use client";
import { Editor } from "@monaco-editor/react";
import NavEditor from "./NavEditor";
import { useRef, useState } from "react";

export default function CodeEditor({ className, editorRef, onChange, defaultValue }) {

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
        defaultValue={defaultValue||"//some comment "}
        onMount={(editor, monaco) => {
          editorRef.current = editor;
          editor.onDidChangeModelContent(() => {
       
            const newCode = editor.getValue();
            if (onChange) {
              onChange(newCode);
            }
          });
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
