"use client";

import { Splitter, SplitterPanel } from "primereact/splitter";
import { TabView, TabPanel } from "primereact/tabview";
import { ScrollPanel } from "primereact/scrollpanel";
import Description from "@/components/Description";
import Editor from "@monaco-editor/react";
import { useRef, useState, useEffect } from "react";
import NavEditor from "@/components/NavEditor";
import ButtomBarEditor from "@/components/ButtomBarEditor";
import DiscussionsPanel from "@/components/DiscussionsPanel";

// async function getRival(name) {
//   const nameRival = name.replace(/-/g, " ");
//   const url = `http://localhost:3000/api/v1/rival/?search=${nameProblem}`;

//   try {
//     const response = await fetch(url, {
//       method: "GET",
//       headers: { "Content-Type": "application/json" },
//     });

//     const data = await response.json();
//     if (response.ok) return data;
//     else console.log(data.message);
//   } catch (error) {
//     console.log(`Error al obtener problema: ${error.message}`);
//   }
// }

export default function Rival() {
  // const rival = await getRival(params.name);
  const rival = {
    title: "Two Sum",
    statement:
      "# Welcome\nThis is a **live demo** of MDXEditor with all default features on.\nHello I'm a `code` .\n> The overriding design goal for Markdown’s formatting syntax is to make it as readable as possible.\n> The idea is that a Markdown-formatted document should be publishable as-is, as plain text,\n> without looking like it’s been marked up with tags or formatting instructions.\n[— Daring Fireball](https://daringfireball.net/projects/markdown/).\nIn here, you can find the following markdown elements:\n* Headings\n* Lists\n  * Unordered\n  * Ordered\n  * And nested ;)\n* Links\n* Bold/Italic/Underline formatting\n* Tables\n* Code block editors\n* And much more.\n\nThe current editor content is styled using the `@tailwindcss/typography` [plugin](https://tailwindcss.com/docs/typography-plugin).\n\n## What can you do here?\n\nThis is a great location for you to test how editing markdown feels. If you have an existing markdown source, you can switch to source mode using the toggle group in the top right, paste it in there, and go back to rich text mode.\n\nIf you need a few ideas, here's what you can try:\n\n1. Add your own code sample\n2. Change the type of the headings\n3. Insert a table, add a few rows and columns\n4. Switch back to source markdown to see what you're going to get as an output\n5. Test the diff feature to see how the markdown has changed\n6. Add a frontmatter block through the toolbar button\n\n## A code sample\n\n\n\n```js\nexport default function App() {\n  return (<div>Hello world</div>)\n}\n```\n\n## A table\n\nPlay with the table below - add rows, columns, change column alignment. When editing,\nyou can navigate the cells with `enter`, `shift+enter`, `tab` and `shift+tab`.\n\n| Item              | In Stock | Price |\n| :---------------- | :------: | ----: |\n| Python Hat        |   True   | 23.99 |\n| SQL Hat           |   True   | 23.99 |\n| Codecademy Tee    |   False  | 19.99 |\n| Codecademy Hoodie |   False  | 42.99 |",
    difficulty: 3,
    state: 0,
    tags: ["Array", "Hash Table"],
    discussion: [
      {
        content:
          "Hello all,\n\nI'm new coding and noob in using classes. why no one is writing int main() in their codes. Definetly there will be different versions in the main() i.e taking input from STDIN, passing arguments to class etc.",
        repliesNumber: 1,
        replies: [
          {
            content:
              "use the two pointer method. solves the problem in O(n) time.",
            repliesNumber: 1,
            replies: [
              {
                content: "just login with new username and password",
                repliesNumber: 0,
                replies: [],
                user: {
                  username: "chirumavilla",
                },
                createdAt: {
                  $date: "2023-09-29T16:37:08.987Z",
                },
              },
            ],
            user: {
              username: "MaxToTheM4x",
            },
            createdAt: {
              $date: "2023-09-29T16:37:08.987Z",
            },
          },
        ],
        user: {
          username: "ttrejosg",
        },
        createdAt: {
          $date: "2023-09-29T16:37:08.987Z",
        },
      },
      {
        content:
          "Can't find a better place to ask this...\nEvery time I passed a problem, it's marked with a green check mark.\nIf I want to redo all the problems for the second round, is there a way to reset all the marks?",
        repliesNumber: 1,
        replies: [
          {
            content: "just login with new username and password",
            repliesNumber: 0,
            replies: [],
            user: {
              username: "chirumavilla",
            },
            createdAt: {
              $date: "2023-09-29T16:37:08.987Z",
            },
          },
        ],
        user: {
          username: "AlexTheGreat",
        },
        createdAt: {
          $date: "2023-09-29T16:37:08.987Z",
        },
      },
    ],
    grades: [
      { value: 3, user: "hola" },
      { value: 4, user: "hola" },
      { value: 4, user: "hola" },
      { value: 5, user: "hola" },
      { value: 3, user: "hola" },
      { value: 5, user: "hola" },
    ],
    submissions: [],
    createdAt: {
      $date: "2023-09-29T16:37:08.987Z",
    },
    createdBy: "ttrejosg",
  };

  const editorRef = useRef(null);
  const [fontSize, setFontSize] = useState(19);
  const [tabSize, setTabSize] = useState(2);
  const [layout, setLayout] = useState("horizontal");

  function handleEditor(editor, monaco) {
    editorRef.current = editor;
  }

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth <= 768) setLayout("vertical");
      else setLayout("horizontal");
    });
  }, []);

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
              <Description rival={rival} />
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
              <DiscussionsPanel discussions={rival.discussion} />
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
