"use client";
import ButtomBarEditor from "@/components/ButtomBarEditor";
import DiscussionsPanel from "@/components/DiscussionsPanel";
import NavEditor from "@/components/NavEditor";
import Statement from "@/components/Statement";
import Terminal from "@/components/Terminal";
import { Editor } from "@monaco-editor/react";
import { ScrollPanel } from "primereact/scrollpanel";
import { Splitter, SplitterPanel } from "primereact/splitter";
import { TabPanel, TabView } from "primereact/tabview";
import { useEffect, useState, useRef } from "react";
import { notFound } from "next/navigation";
import { Button } from "primereact/button";

async function getContest(title) {
  const url = `${
    process.env.NEXT_PUBLIC_API_URL
  }/api/v1/contests/${title.replace("-", " ")}`;

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

export default function ContestRival({ params }) {
  const [index, setIndex] = useState(parseInt(params.index));
  const [contest, setContest] = useState({});
  const [contestRival, setContestRival] = useState({});
  const [loadingRival, setLoadingRival] = useState(true);
  const editorRef = useRef(null);
  const mdRef = useRef(null);
  const [fontSize, setFontSize] = useState(19);
  const [inputCases, setInputCases] = useState("");
  const [position, setPosition] = useState({ column: 0, lineNumber: 0 });
  const [tabSize, setTabSize] = useState(2);
  const [loadingEditor, setLoadingEditor] = useState(true);
  const [openConsole, setOpenConsole] = useState(false);
  const [output, setOutput] = useState({});
  const [activeIndexT, setActiveIndexT] = useState(0);

  function handleEditor(editor, monaco) {
    editorRef.current = editor;
    setLoadingEditor(false);
    setPosition(editorRef.current.getPosition());
  }

  function handleInputCases(input) {
    setInputCases(input);
  }

  useEffect(() => {
    setLoadingRival(true);
    async function fetchContest() {
      const foundContest = await getContest(params.title);
      setContest(foundContest);
    }
    fetchContest();
  }, [params.title]);

  useEffect(() => {
    setLoadingRival(true);
    if (contest.rivals) {
      const rival = contest.rivals[index];
      if (rival) {
        setContestRival(rival);
        mdRef.current?.setMarkdown(rival.statement);
      } else return notFound();
      setLoadingRival(false);
    }
  }, [index, contest]);

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
      <SplitterPanel className="block m-2 rounded-md">
        <section className="flex justify-between p-3">
          <Button
            className="bg-primary-400 p-4"
            label="prev"
            onClick={() => {
              const newIndex = index - 1;
              console.log(newIndex);
              if (newIndex >= 0) setIndex(newIndex);
              else setIndex(contest.rivals.length - 1);
            }}
          />
          <Button
            className="bg-primary-400 p-4"
            label="next"
            onClick={() => {
              const newIndex = index + 1;
              console.log(newIndex);
              if (newIndex < contest.rivals.length) setIndex(newIndex);
              else setIndex(0);
            }}
          />
        </section>
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
              {loadingRival ? (
                <h1>Loading...</h1>
              ) : (
                <Statement rival={contestRival} ref={mdRef} />
              )}
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
                discussions={contestRival.discussion}
                name={params.name}
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
          className=" overflow-hidden bg-slate-300 h-[calc(96.7vh-3rem)] w-full "
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
                    contestRival.__t == "AlgorithmRival" ? "python" : "sql"
                  }
                  theme="vs-dark"
                  defaultValue={
                    contestRival.__t == "AlgorithmRival"
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
                type={contestRival.__t}
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
                  solutionCode: contestRival?.solutionCode,
                }}
                sql={{
                  creationScript: contestRival?.creationScript,
                  databaseName: contestRival?.databaseName,
                  solutionCode: contestRival?.solutionCode,
                }}
                userCode={editorRef.current}
                changeToConsole={() => setActiveIndexT(0)}
                type={contestRival?.__t}
              />
            )}
          </SplitterPanel>
        </Splitter>
      </SplitterPanel>
    </Splitter>
  );
}
