import { TabView, TabPanel } from "primereact/tabview";
import { ScrollPanel } from "primereact/scrollpanel";
import Editor from "@monaco-editor/react";
import OutputAlgorithm from "./OutputAlgorithm";
import { useState } from "react";

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
          {props.console.userOutput ? (
            props.type == "AlgorithmRival" ? (
              <OutputAlgorithm console={props.console} />
            ) : (
              <p className="text-white">{props.console.userOutput}</p>
            )
          ) : props.console.errorOutput ? (
            <textarea
              readOnly
              className="text-red-500 m-2 w-full h-full bg-transparent focus:outline-none resize-none"
            >
              {props.console.errorOutput}
            </textarea>
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
