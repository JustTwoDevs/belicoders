import { TabView, TabPanel } from "primereact/tabview";
import { ScrollPanel } from "primereact/scrollpanel";
import Editor from "@monaco-editor/react";
import OutputAlgorithm from "./OutputAlgorithm";
import { Skeleton } from "primereact/skeleton";

export default function Terminal(props) {
  return (
    <TabView
      activeIndex={props.activeIndex}
      onTabChange={(e) => props.setActiveIndex(e.index)}
      pt={{
        inkbar: "bg-primary-200",
        navContent: "text-sm border-grey-200 border-b-2 rounded-t-md mt-2",
        nav: "h-9 bg-slate-200",
        panelContainer: "p-0 bg-[#1e1e1e] shadow-md",
      }}
    >
      <TabPanel
        header="Result"
        pt={{
          headerAction: "pt-3 bg-slate-200",
        }}
      >
        <ScrollPanel
          pt={{ barY: "bg-primary-200" }}
          className="h-[calc(38vh-3rem)]"
        >
          {props.running ? (
            <>
              <div className="w-full md:w-6 p-3">
                <Skeleton width="10rem" height="4rem"></Skeleton>
                <Skeleton
                  width="27rem"
                  height="2rem"
                  className="mt-3"
                ></Skeleton>
                <Skeleton
                  width="20rem"
                  height="2rem"
                  className="mt-3"
                ></Skeleton>
                <Skeleton
                  width="15rem"
                  height="2rem"
                  className="mt-3"
                ></Skeleton>
              </div>
            </>
          ) : props.console.submission ? (
            <div className="m-4">
              {props.console.state == "Accepted" ? (
                <>
                  <div className="flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="1em"
                      height="1em"
                      fill="currentColor"
                      class="h-5 w-5 text-green-500 mr-2"
                    >
                      <path d="M20 12.005v-.828a1 1 0 112 0v.829a10 10 0 11-5.93-9.14 1 1 0 01-.814 1.826A8 8 0 1020 12.005zM8.593 10.852a1 1 0 011.414 0L12 12.844l8.293-8.3a1 1 0 011.415 1.413l-9 9.009a1 1 0 01-1.415 0l-2.7-2.7a1 1 0 010-1.414z"></path>
                    </svg>
                    <span className="text-green-500">Accepted</span>
                  </div>
                  <pre>{props.console.output}</pre>
                </>
              ) : (
                <section className="ml-2 mt-5">
                  <span class=" flex-1 whitespace-nowrap text-xl font-medium text-red-600">
                    {props.console.state}
                  </span>
                  <h1 class="bg-red-600/[.12] dark:bg-dark-red-s/[.12] group relative rounded-lg px-3 py-4 text-red-500 text-base mt-3">
                    {props.console.output}
                  </h1>
                </section>
              )}
            </div>
          ) : props.console.userOutput ? (
            props.type == "AlgorithmRival" ? (
              <OutputAlgorithm console={props.console} />
            ) : (
              <p className="text-white">{props.console.userOutput}</p>
            )
          ) : props.console.errorOutput ? (
            <section className="ml-7 mt-5 mr-1">
              <span class=" flex-1 whitespace-nowrap text-xl font-medium text-red-600">
                Runtime Error
              </span>
              <h1 class="bg-red-600/[.12] dark:bg-dark-red-s/[.12] group relative rounded-lg px-3 py-4 text-red-500 text-base mt-3">
                {props.console.errorOutput}
              </h1>
            </section>
          ) : props.console.errorInputCases ? (
            <h1 className="flex h-full items-center justify-center text-red-500">
              Wrongs Input Cases
            </h1>
          ) : (
            <h1 className="flex h-full items-center justify-center text-white">
              You must run your code first
            </h1>
          )}
        </ScrollPanel>
      </TabPanel>
      {props.type == "AlgorithmRival" ? (
        <TabPanel
          header="Test Cases"
          pt={{ headerAction: "pt-3 bg-slate-200" }}
          className="h-[calc(38vh-3rem)]"
        >
          <Editor
            height={"100%"}
            className="py-4"
            theme="vs-dark"
            defaultValue={props.inputCases}
            onChange={(value, event) => {
              props.setInputCases(value);
            }}
            options={{
              minimap: { enabled: false },
              wordWrap: "on",
              renderLineHighlight: "none",
              cursorBlinking: "expand",
              stickyScroll: true,
              cursorSmoothCaretAnimation: true,
              colorDecorators: false,
              hideCursorInOverviewRuler: true,
              overviewRulerBorder: false,
            }}
          />
        </TabPanel>
      ) : null}
    </TabView>
  );
}
