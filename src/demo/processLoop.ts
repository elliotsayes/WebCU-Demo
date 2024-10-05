import AoLoader from "@permaweb/ao-loader";
import { fetchProcessInitial } from "../lib/process";

const Module = {
  Id: "MODULE_ID",
  Owner: "MODULE_OWNER",
  Tags: [
    { name: "Data-Protocol", value: "ao" },
    { name: "Variant", value: "ao.TN.1" },
    { name: "Type", value: "Module" },
  ],
};

const Process = {
  Id: "PROCESS_ID",
  Owner: "PROCESS_OWNER",
  Tags: [
    { name: "Data-Protocol", value: "ao" },
    { name: "Variant", value: "ao.TN.1" },
    { name: "Type", value: "Process" },
  ],
};

const env = { Process, Module };

export async function processLoop(
  processData: Awaited<ReturnType<typeof fetchProcessInitial>>,
  count: number
) {
  const handle = await AoLoader(
    processData.moduleData,
    processData.moduleDef.options
  );

  let command = `X = 1`;
  let memory = null;
  let lastOutput = null;
  for (let i = 0; i <= count; i++) {
    if (i > 0) command = `X = X + 1`;
    if (i === count) command = `X`;
    const result = await handle(
      memory,
      {
        Id: "MESSAGE_ID",
        "Block-Height": "0",
        Timestamp: "0",
        Cron: false,
        Owner: "OWNER_ADDRESS",
        From: "FROM_ADDRESS",
        Target: "TARGET_ADDRESS",
        Module: "MODULE_ADDRESS",
        Tags: [{ name: "Action", value: "Eval" }],
        Data: command,
      },
      env
    );

    memory = result.Memory;
    lastOutput = result.Output;

    // console.log({ input: command, output: result.Output });
  }

  return lastOutput;
}
