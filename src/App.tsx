import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { processLoop } from "./demo/processLoop";

const instance = new ComlinkWorker<typeof import("./worker")>(
  new URL("./worker", import.meta.url),
  {}
);

const processId = "sYJP_BK4fwXNl0rg8J_5gUWZfmAitoXh_GVleAyGFKg";

function App() {
  const [count, setCount] = useState(100);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button
          onClick={() => {
            instance.loadVirtualAopProcess().then((success) => {
              console.log({ loadProcess: success });
              instance.createHandle().then((success) => {
                console.log({ createHandle: success });
              });
            });
          }}
        >
          loadProcess
        </button>
        <input
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
        />
        <button
          onClick={() => {
            const timeBefore = performance.now();
            processLoop(count, async (m) => {
              return (await instance.applyMessage(m))!;
            }).then((result) => {
              const timeAfter = performance.now();
              console.log({
                time: timeAfter - timeBefore,
                runMessages: { count, result },
              });
            });
          }}
        >
          runMessages
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
