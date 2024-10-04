import AoLoader from "@permaweb/ao-loader";
import { fetchModuleData, fetchModuleDef } from "../lib/module";

const moduleId = "GYrbbe0VbHim_7Hi6zrOpHQXrSQz07XNtwCnfbFo2I0";
/* ao READ-ONLY Env Variables */

const Module = {
  Id: "MODULE",
  Owner: "OWNER",
  Tags: [
    { name: "Data-Protocol", value: "ao" },
    { name: "Variant", value: "ao.TN.1" },
    { name: "Type", value: "Module" },
  ],
};

const Process = {
  Id: "PROCESS",
  Owner: "PROCESS",
  Tags: [
    { name: "Data-Protocol", value: "ao" },
    { name: "Variant", value: "ao.TN.1" },
    { name: "Type", value: "Process" },
  ],
};

const env = { Process, Module };

// const env = {
//   Process: { Id: processId, Owner: processDef.owner, Tags: processDef.tags },
//   Module: {
//     Id: processDef /* Owner: ctx.moduleOwner, Tags: ctx.moduleTags */,
//   }, // TODO
// };

export async function loadProcessRawTest() {
  const moduleDef = await fetchModuleDef(moduleId);
  const moduleData = await fetchModuleData(moduleId);

  const handle = await AoLoader(moduleData, moduleDef);

  const command1 = "X = 123";
  const result = await handle(
    null,
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
      Data: command1,
    },
    env
  );

  // saveToCache(result.Memory);
  console.log({ input: command1, output: result.Output });

  const handle2 = await AoLoader(moduleData, moduleDef);

  const command2 = "X";
  const result2 = await handle2(
    result.Memory,
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
      Data: command2,
    },
    env
  );
  console.log({ input: command2, output: result2.Output });
}
