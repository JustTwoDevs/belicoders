"use client";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { useState } from "react";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

const initialMarkdown = `# Hello world
Este es un demo de mdEditor`;

export default function MdEditor() {
  const [value, setValue] = useState(initialMarkdown);
  return (
    <main className="min-h-screen">
      <MDEditor value={value} onChange={setValue} />
    </main>
  );
}
