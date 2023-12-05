"use client";

import { Splitter, SplitterPanel } from "primereact/splitter";
import { TabView, TabPanel } from "primereact/tabview";
import { ScrollPanel } from "primereact/scrollpanel";
import Statement from "@/components/Statement";
import Editor from "@monaco-editor/react";
import { useRef, useState, useEffect, use } from "react";
import NavEditor from "@/components/NavEditor";
import DiscussionsPanel from "@/components/DiscussionsPanel";
import ButtomBarEditor from "@/components/ButtomBarEditor";
import Terminal from "@/components/Terminal";

async function getRival(name) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/rivals/${name}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    const data = await response.json();
    if (response.ok) return data;
    else console.log(data.message);
  } catch (error) {
    console.log(`Error al obtener problema: ${error.message}`);
  }
}

async function getLastSubmissions(id) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/rivals/${id}/lastSubmission`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
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
  const [inputCases, setInputCases] = useState("");
  const [position, setPosition] = useState({ column: 0, lineNumber: 0 });
  const [rival, setRival] = useState({});
  const [fontSize, setFontSize] = useState(19);
  const [tabSize, setTabSize] = useState(2);
  const [loadingRival, setLoadingRival] = useState(true);
  const [loadingEditor, setLoadingEditor] = useState(true);
  const [openConsole, setOpenConsole] = useState(false);
  const [output, setOutput] = useState({});
  const [activeIndexT, setActiveIndexT] = useState(0);
  const [running, setRunning] = useState(false);
  const [defaultValue, setDefaultValue] = useState("");

  function handleEditor(editor, monaco) {
    editorRef.current = editor;
    setLoadingEditor(false);
    setPosition(editorRef.current.getPosition());
  }

  function handleInputCases(input) {
    setInputCases(input);
  }

  function handleChange() {
    async function fetchRival() {
      const foundRival = await getRival(params.name);
      setRival(foundRival);
    }
    fetchRival();
  }

  function handleSetSub(submission) {
    editorRef.current.setValue(submission.code);
    setOutput({ ...submission, submission: true });
  }

  function handleLastSub() {
    async function fetchLastSub() {
      const foundLastSub = await getLastSubmissions(rival._id);
      setOutput({ ...foundLastSub, submission: true });
      editorRef.current.setValue(foundLastSub.code);
    }
    fetchLastSub();
  }

  useEffect(() => {
    async function fetchRival() {
      const foundRival = await getRival(params.name);
      setRival(foundRival);
      console.log(foundRival);
      handleInputCases(foundRival.inputCases ? foundRival.inputCases : "");
      setLoadingRival(false);
    }
    fetchRival();
  }, [params.name]);

  return (
    <Splitter
      className="bg-slate-300 h-full w-full fixed rounded-none"
      gutter={{
        className: "bg-transparent hover:bg-primary-300",
      }}
      pt={{
        gutter: {
          className:
            "bg-transparent hover:bg-primary-300 hidden md:flex lg:flex",
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
              className="w-full h-[calc(88vh-3rem)]"
            >
              {loadingRival ? <h1>Loading...</h1> : <Statement rival={rival} />}
            </ScrollPanel>
          </TabPanel>
          <TabPanel
            header="Solution"
            pt={{ headerAction: "pt-3 bg-slate-200" }}
          >
            <ScrollPanel
              pt={{ barY: "bg-primary-200" }}
              className="w-full h-[calc(88vh-3rem)]"
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
              className="w-full h-[calc(88vh-3rem)]"
            >
              <DiscussionsPanel
                discussions={rival.discussion}
                name={params.name}
                onChange={handleSetSub}
              />
            </ScrollPanel>
          </TabPanel>
        </TabView>
      </SplitterPanel>
      <SplitterPanel
        className="m-2 hidden md:flex lg:flex h-full overflow-hidden"
        minSize={30}
      >
        <Splitter
          layout="vertical"
          className=" overflow-hidden bg-slate-300 h-[calc(94.7vh-3rem)] w-full "
          gutter={{
            className: "bg-transparent hover:bg-primary-300",
          }}
          pt={{
            gutter: {
              className: "bg-transparent hover:bg-primary-300 hidden",
            },
            gutterHandler: "bg-primary-400 rounded-full",
          }}
        >
          <SplitterPanel
            className="overflow-hidden flex flex-col mb-2"
            minSize={20}
            size={openConsole ? 50 : 90}
          >
            <NavEditor
              fontSize={fontSize}
              setFontSize={setFontSize}
              tabSize={tabSize}
              setTabSize={setTabSize}
              resetCode={() => editorRef.current.setValue("")}
              rivalId={rival._id}
              onSetSub={handleSetSub}
              lastSub={handleLastSub}
            />
            <section
              className="flex-grow overflow-hidden"
              onClick={() => setPosition(editorRef.current.getPosition())}
            >
              {loadingRival ? (
                <h1>Loading...</h1>
              ) : (
                <Editor
                  defaultLanguage={
                    rival.__t == "AlgorithmRival" ? "python" : "sql"
                  }
                  theme="vs-dark"
                  defaultValue={
                    rival.__t == "AlgorithmRival"
                      ? "class Solution(object):"
                      : "use database db;"
                  }
                  onMount={handleEditor}
                  onChange={() => setPosition(editorRef.current.getPosition())}
                  options={{
                    fontSize: fontSize,
                    minimap: { enabled: false },
                    tabSize: tabSize,
                    wordWrap: "on",
                    renderLineHighlight: "none",
                    cursorBlinking: "expand",
                    bracketPairColorization: true,
                    stickyScroll: true,
                    cursorSmoothCaretAnimation: true,
                  }}
                />
              )}
            </section>
            <div className="flex justify-between px-3 py-2 bg-[#1e1e1e] text-xs rounded-b-md">
              Saves to local
              <span className="text-[#00b8a3]">{`Ln ${position.lineNumber}, Col ${position.column}`}</span>
            </div>
          </SplitterPanel>
          <SplitterPanel
            size={openConsole ? 50 : 5.8}
            className="flex flex-col"
          >
            {openConsole ? (
              <Terminal
                inputCases={inputCases}
                setInputCases={handleInputCases}
                console={output}
                activeIndex={activeIndexT}
                setActiveIndex={setActiveIndexT}
                type={rival.__t}
                running={running}
              />
            ) : null}
            {loadingEditor ? (
              <div className="flex-grow flex justify-center items-center">
                <h1>Loading...</h1>
              </div>
            ) : (
              <ButtomBarEditor
                openConsole={openConsole}
                setOpenConsole={setOpenConsole}
                setOutput={setOutput}
                algorithm={{
                  inputCases: inputCases,
                  solutionCode: rival?.solutionCode,
                }}
                sql={{
                  creationScript: rival?.creationScript,
                  databaseName: rival?.databaseName,
                }}
                running={running}
                setRunning={setRunning}
                userCode={editorRef.current}
                changeToConsole={() => setActiveIndexT(0)}
                onSubmmit={handleChange}
                type={rival?.__t}
                title={params.name}
              />
            )}
          </SplitterPanel>
        </Splitter>
      </SplitterPanel>
    </Splitter>
  );
}
