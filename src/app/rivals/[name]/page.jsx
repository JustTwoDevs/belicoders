"use client";

import { Splitter, SplitterPanel } from "primereact/splitter";
import { TabView, TabPanel } from "primereact/tabview";
import { ScrollPanel } from "primereact/scrollpanel";
import Statement from "@/components/Statement";
import Editor from "@monaco-editor/react";
import { useRef, useState, useEffect, Suspense } from "react";
import NavEditor from "@/components/NavEditor";
import ButtomBarEditor from "@/components/ButtomBarEditor";
import DiscussionsPanel from "@/components/DiscussionsPanel";

async function getRival(name) {
  const url = `http://localhost:3000/api/v1/rivals/${name}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    if (response.ok) return data;
    else console.log(data.message);
  } catch (error) {
    console.log(`Error al obtener problema: ${error.message}`);
  }
}

export default function Rival({ params }) {
  const editorRef = useRef(null);
  const [rival, setRival] = useState({});
  const [fontSize, setFontSize] = useState(19);
  const [tabSize, setTabSize] = useState(2);
  const [layout, setLayout] = useState("horizontal");
  const [loading, setLoading] = useState(true);

  function handleEditor(editor, monaco) {
    editorRef.current = editor;
  }

  useEffect(() => {
    async function fetchRival() {
      const foundRival = await getRival(params.name);
      setRival(foundRival);
      console.log(foundRival);
      setLoading(false);
    }
    window.addEventListener("resize", () => {
      if (window.innerWidth <= 768) setLayout("vertical");
      else setLayout("horizontal");
    });
    fetchRival();
  }, [params.name]);

  return (
    //Como hacer para que si el usuario quiere que todo el panel izquiero se recoja y solo se vea el editor se debe
    // colocar una propiedad al splitter que se llama collapsed y se le pasa un booleano

    <Splitter
      className="bg-slate-300 h-full w-full fixed rounded-none"
      layout={layout}
      gutter={{
        className: "bg-transparent hover:bg-primary-300",
      }}
      pt={{
        gutter: {
          className: "bg-transparent hover:bg-primary-300",
        },
        gutterHandler: "bg-primary-400 rounded-full",
      }}
    >
      <SplitterPanel className="m-2 rounded-md">
        <TabView
          className="w-full"
          pt={{
            inkbar: "bg-primary-200",
            navContent: "text-sm border-grey-200 border-b-2 rounded-t-md",
            nav: "h-9 bg-slate-200",
            panelContainer: "pl-5 py-2 pr-2 shadow-md",
          }}
        >
          <TabPanel
            header="Statement"
            pt={{ headerAction: "pt-3 bg-slate-200" }}
          >
            <ScrollPanel
              pt={{ barY: "bg-primary-200" }}
              className="w-full h-[calc(90vh-3rem)]"
            >
              {loading ? <h1>Loading...</h1> : <Statement rival={rival} />}
            </ScrollPanel>
          </TabPanel>
          <TabPanel
            header="Solution"
            pt={{ headerAction: "pt-3 bg-slate-200" }}
          >
            <ScrollPanel
              pt={{ barY: "bg-primary-200" }}
              className="w-full h-[calc(90vh-3rem)]"
            >
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </ScrollPanel>
          </TabPanel>
          <TabPanel
            header="Discussion"
            pt={{ headerAction: "pt-3 bg-slate-200" }}
          >
            <ScrollPanel
              pt={{ barY: "bg-primary-200" }}
              className="w-full h-[calc(90vh-3rem)]"
            >
              <DiscussionsPanel
                discussions={rival.discussion}
                name={params.name}
              />
            </ScrollPanel>
          </TabPanel>
        </TabView>
      </SplitterPanel>
      <SplitterPanel className="m-2 overflow-hidden flex flex-col" minSize={30}>
        <NavEditor
          fontSize={fontSize}
          setFontSize={setFontSize}
          tabSize={tabSize}
          setTabSize={setTabSize}
          resetCode={() => editorRef.current.setValue("")}
        />
        <Editor
          height="78%"
          defaultLanguage="python"
          theme="vs-dark"
          defaultValue="// some comment"
          onMount={handleEditor}
          options={{
            fontSize: fontSize,
            minimap: { enabled: false },
            tabSize: tabSize,
            wordWrap: "on",
            renderLineHighlight: "none",
          }}
        />
        <div className="flex justify-between px-3 py-2 bg-[#1e1e1e] text-xs rounded-b-md ">
          Saves to local
          <span className="text-[#00b8a3]">Ln 4, Col 2</span>
        </div>
        <ButtomBarEditor />
      </SplitterPanel>
    </Splitter>
  );
}
