import { Tooltip } from "primereact/tooltip";
import { ConfirmDialog } from "primereact/confirmdialog";
import { useState } from "react";
import { Dialog } from "primereact/dialog";
import SettingsEditor from "./SettingsEditor";
import ShortcutsEditor from "./ShortcutsEditor";

export default function NavEditor(props) {
  const [visibleConfirm, setVisibleConfirm] = useState(false);
  const [visibleDialog, setVisibleDialog] = useState(false);
  const [dialogOption, setDialogOption] = useState(null); // ["submissions", "shortcuts", "settings"]
  const [message, setMessage] = useState("");
  const [header, setHeader] = useState("");
  const [accepted, setAccepted] = useState(null);

  const options = [
    {
      tooltip: "Submissions Notes",
      action: () => {
        setDialogOption("submissions");
        setHeader("Submissions Notes");
        setVisibleDialog(true);
      },
      icon: "M12 16.945l-5.331 4.798C6.025 22.323 5 21.866 5 21V5a3 3 0 013-3h8a3 3 0 013 3v16c0 .866-1.025 1.323-1.669.743L12 16.945zm5 1.81V5a1 1 0 00-1-1H8a1 1 0 00-1 1v13.755l4.331-3.898a1 1 0 011.338 0L17 18.755z",
    },
    {
      tooltip: "Retrieve last submitted code",
      action: () => {
        setVisibleConfirm(true);
        setMessage(
          "Your code will be discarded and replaced with your last submission's code!"
        );
        setHeader("Are you sure?");
        setAccepted(() => props.acceptSubmission);
      },
      icon: "M3.64 10.98c.147 0 .312-.022.495-.066.183-.044.348-.12.495-.23.147-.11.271-.269.374-.474.103-.205.154-.462.154-.77V5.084c0-.499.077-.928.231-1.287.154-.36.363-.66.627-.902s.565-.422.902-.539c.337-.117.69-.176 1.056-.176H9.58v1.848H8.37c-.425 0-.693.14-.803.418-.11.279-.165.58-.165.902v4.136c0 .425-.08.788-.242 1.09-.161.3-.352.545-.572.736-.22.19-.455.337-.704.44-.25.103-.462.161-.638.176v.044c.176.015.389.062.638.143.25.08.484.216.704.407.22.19.41.447.572.77.161.323.242.74.242 1.254v4.004c0 .323.055.623.165.902.11.279.378.418.803.418h1.21v1.848H7.974c-.367 0-.719-.059-1.056-.176a2.573 2.573 0 01-.902-.539 2.586 2.586 0 01-.627-.902c-.154-.36-.231-.788-.231-1.287V14.61c0-.352-.051-.638-.154-.858a1.494 1.494 0 00-.374-.517 1.18 1.18 0 00-.495-.253 2.143 2.143 0 00-.495-.066V10.98zm16.72 2.04c-.161 0-.33.022-.506.066a1.184 1.184 0 00-.484.253 1.494 1.494 0 00-.374.517c-.103.22-.154.506-.154.858v4.202c0 .499-.077.928-.231 1.287-.154.36-.363.66-.627.902a2.573 2.573 0 01-.902.54c-.337.116-.69.175-1.056.175H14.42v-1.848h1.21c.425 0 .693-.14.803-.418.11-.279.165-.58.165-.902v-4.004c0-.513.08-.931.242-1.254.161-.323.352-.58.572-.77.22-.19.455-.326.704-.407.25-.08.462-.128.638-.143v-.044a2.225 2.225 0 01-.638-.176 2.567 2.567 0 01-.704-.44c-.22-.19-.41-.436-.572-.737-.161-.3-.242-.664-.242-1.089V5.452c0-.323-.055-.623-.165-.902-.11-.279-.378-.418-.803-.418h-1.21V2.284h1.606c.367 0 .719.059 1.056.176.337.117.638.297.902.539.264.242.473.543.627.902.154.36.231.788.231 1.287v4.356c0 .308.051.565.154.77.103.205.227.363.374.473.147.11.308.187.484.231.176.044.345.066.506.066v1.936z",
    },
    {
      tooltip: "Reset to default code definition",
      action: () => {
        setVisibleConfirm(true);
        setMessage(
          "Your current code will be discarded and reset to the default code!"
        );
        setHeader("Are you sure?");
        setAccepted(() => props.resetCode);
      },
      icon: "M5.725 9.255h2.843a1 1 0 110 2H3.2a1 1 0 01-1-1V4.887a1 1 0 012 0v3.056l2.445-2.297a9.053 9.053 0 11-2.142 9.415 1 1 0 011.886-.665 7.053 7.053 0 1010.064-8.515 7.063 7.063 0 00-8.417 1.202L5.725 9.255z",
    },
    {
      tooltip: "Editor Shortcust",
      action: () => {
        setDialogOption("shortcuts");
        setHeader("Editor Shortcuts");
        setVisibleDialog(true);
      },
      icon: "M15.667 10.333v3.334h1.666a3.667 3.667 0 11-3.666 3.666v-1.666h-3.334v1.666a3.667 3.667 0 11-3.666-3.666h1.666v-3.334H6.667a3.667 3.667 0 113.666-3.666v1.666h3.334V6.667a3.667 3.667 0 113.666 3.666h-1.666zm-5.334 0v3.334h3.334v-3.334h-3.334zm-2-2V6.667a1.667 1.667 0 10-1.666 1.666h1.666zm-1.666 7.334a1.667 1.667 0 101.666 1.666v-1.666H6.667zm9 1.666a1.667 1.667 0 101.666-1.666h-1.666v1.666zm1.666-9a1.667 1.667 0 10-1.666-1.666v1.666h1.666z",
    },
    {
      tooltip: "Settings",
      action: () => {
        setDialogOption("settings");
        setHeader("Settings");
        setVisibleDialog(true);
      },
      icon: "M7.174 5.619a8.064 8.064 0 011.635-.946l.29-1.158A2 2 0 0111.039 2h1.922a2 2 0 011.94 1.515l.29 1.158c.584.252 1.132.57 1.635.946l1.15-.329a2 2 0 012.282.923l.961 1.665a2 2 0 01-.342 2.437l-.86.832a8.151 8.151 0 010 1.888l.86.83a2 2 0 01.342 2.438l-.96 1.665a2 2 0 01-2.283.923l-1.15-.329a8.063 8.063 0 01-1.635.946l-.29 1.158a2 2 0 01-1.94 1.515H11.04a2 2 0 01-1.94-1.515l-.29-1.158a8.064 8.064 0 01-1.635-.946l-1.15.329a2 2 0 01-2.282-.923l-.961-1.665a2 2 0 01.342-2.437l.86-.831a8.158 8.158 0 010-1.889l-.86-.83a2 2 0 01-.342-2.438l.96-1.665a2 2 0 012.283-.923l1.15.329zm-1.7 1.594l-.961 1.665 1.57 1.518-.114.982a6.157 6.157 0 000 1.425l.114.982-1.57 1.518.96 1.665 2.104-.601.794.593c.38.284.793.523 1.23.711l.908.392.53 2.118h1.922l.53-2.118.909-.392a6.07 6.07 0 001.23-.711l.793-.593 2.103.601.961-1.665-1.57-1.518.114-.982a6.172 6.172 0 000-1.425l-.114-.982 1.57-1.518-.96-1.665-2.104.601-.794-.593a6.067 6.067 0 00-1.23-.71l-.908-.392L12.96 4H11.04l-.53 2.119-.909.391a6.064 6.064 0 00-1.23.711l-.793.593-2.103-.601zM12 16a4 4 0 100-8 4 4 0 000 8zm0-2a2 2 0 110-4 2 2 0 010 4z",
    },
    {
      tooltip: "Full screen",
      action: () => {
        if (document.fullscreenElement) {
          document.exitFullscreen();
        } else {
          document.documentElement.requestFullscreen();
        }
      },
      icon: "M6.414 19H10a1 1 0 110 2H4a1 1 0 01-1-1v-6a1 1 0 112 0v3.586l4.293-4.293a1 1 0 011.414 1.414L6.414 19zM17.586 5H14a1 1 0 110-2h6a1 1 0 011 1v6a1 1 0 11-2 0V6.414l-4.293 4.293a1 1 0 01-1.414-1.414L17.586 5z",
    },
  ];

  return (
    <>
      <Tooltip target=".tooltip" pt={{ text: "p-1 text-xs" }} />
      <ConfirmDialog
        visible={visibleConfirm}
        onHide={() => setVisibleConfirm(false)}
        message={message}
        header={header}
        acceptLabel="Confirm"
        rejectLabel="Cancel"
        accept={accepted}
        closable={false}
        rejectClassName="p-2 rounded-md bg-slate-400 text-white"
        acceptClassName="p-2 rounded-md bg-green-400 text-white"
        pt={{
          footer: "flex flex-row-reverse gap-5",
        }}
      />
      <Dialog
        header={header}
        visible={visibleDialog}
        onHide={() => setVisibleDialog(false)}
        style={{ width: "50vw" }}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
        headerClassName="border-b-2 border-gray-200 p-4"
        draggable={false}
        resizable={false}
        pt={{
          transition:
            "ease-out duration-700 transform opacity-0 scale-75 transition-all",
        }}
      >
        {dialogOption === "submissions" ? (
          <p>Submission</p>
        ) : dialogOption === "shortcuts" ? (
          <ShortcutsEditor />
        ) : dialogOption === "settings" ? (
          <SettingsEditor
            fontSize={props.fontSize}
            setFontSize={props.setFontSize}
            tabSize={props.tabSize}
            setTabSize={props.setTabSize}
          />
        ) : null}
      </Dialog>

      <nav className="flex h-9 items-center pr-4 rounded-t-md bg-slate-200 ">
        <h1 className="items-center rounded ml-2 px-2 py-1.5 text-xs ">
          Python3
        </h1>
        <div className="bg-gray-400 w-px h-3 ml-2 mr-auto"></div>
        <section className="flex">
          {options.map((option, i) => (
            <button
              key={i}
              className="tooltip rounded px-2 py-1.5 items-center hover:bg-primary-100"
              data-pr-tooltip={option.tooltip}
              data-pr-position="bottom"
              onClick={option.action}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="1em"
                height="1em"
                fill="currentColor"
              >
                <path d={option.icon}></path>
              </svg>
            </button>
          ))}
        </section>
      </nav>
    </>
  );
}
