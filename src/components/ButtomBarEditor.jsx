import Image from "next/image";
import Pending from "@/assets/pending.gif";

export default function ButtomBarEditor(props) {
  async function runCode() {
    const url = `http://localhost:3000/api/v1/runCode/${
      props.type == "AlgorithmRival" ? "algorithm" : "SQL"
    }`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(
          props.type == "AlgorithmRival"
            ? { ...props.algorithm, userCode: props.userCode.getValue() }
            : { ...props.sql, userCode: props.userCode.getValue() }
        ),
      });

      const data = await response.json();
      
      if (response.ok) {
        console.log(data)
        props.setOutput(data);

      } else console.log(data);
    } catch (error) {
      console.log(`Error al correr el codigo: ${error.message}`);
    }
  }

  async function submitCode() {
    const url = `http://localhost:3000/api/v1/rivals/${props.title}/submission`;
    try {

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ userCode: props.userCode.getValue() }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data);
        props.setOutput(data);
      } else console.log(data.message);
    } catch (error) {
      console.log(`Error al correr al submit: ${error}`);
    }
  }

  return (
    <div className="mt-2 py-[7.5px] rounded-md flex bg-white shrink-0">
      {props.running ? (
        <>
          <Image
            src={Pending}
            width={20}
            height={20}
            alt="Pending..."
            className="mx-2 h-8 w-8"
          />
          <div className="text-xs items-center mt-2">Pending...</div>
        </>
      ) : (
        <button
          className="font-medium items-center ml-4 text-sm flex"
          onClick={() => props.setOpenConsole(!props.openConsole)}
        >
          Console
          <div className="ml-1 transform transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="1em"
              height="1em"
              fill="currentColor"
              className={
                "ml-3 pointer-events-none transition duration-300" +
                (props.openConsole ? " rotate-180 transform" : "")
              }
            >
              <path d="M16.293 14.707a1 1 0 001.414-1.414l-5-5a1 1 0 00-1.414 0l-5 5a1 1 0 101.414 1.414L12 10.414l4.293 4.293z"></path>
            </svg>
          </div>
        </button>
      )}
      <div className="ml-auto flex items-center gap-4 mr-2">
        <button
          className="py-1 font-medium items-center select-none rounded px-4 text-sm bg-slate-400"
          onClick={async () => {
            props.setRunning(true);
            props.changeToConsole();
            if (!props.openConsole) props.setOpenConsole(true);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            runCode();
            props.setRunning(false);
          }}
        >
          Run
        </button>
        <button
          className="py-1 font-medium items-center select-none rounded px-4 text-sm bg-green-500 text-white"
          onClick={async () => {
            props.setRunning(true);
            props.changeToConsole();
            if (!props.openConsole) props.setOpenConsole(true);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            submitCode();
            props.setRunning(false);
            props.onSubmmit();
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
