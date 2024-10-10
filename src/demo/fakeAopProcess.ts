import { fetchModuleData, fetchModuleDef } from "../lib/module";
import { createEnv, fetchProcessDef } from "../lib/process";

const processId = "sYJP_BK4fwXNl0rg8J_5gUWZfmAitoXh_GVleAyGFKg";
const aopModuleTxId = "KQmGe8mHG8cV2Bx553ZVncaSf6JQZuHcfh9UwGfCmtw";

export async function generateFakeAopProcess() {
  const processDef = await fetchProcessDef(processId);

  // Override to use the AOP module
  processDef.moduleTxId = aopModuleTxId;
  const moduleDef = await fetchModuleDef(processDef.moduleTxId);

  // For fairness, use the same memory limit as the original module
  // moduleDef.options.memoryLimit = "500-mb";

  const env = createEnv(processDef, moduleDef);

  const moduleData = await fetchModuleData(processDef.moduleTxId);
  console.log({ processDef, moduleDef, moduleSize: moduleData.byteLength });

  return { processDef, moduleDef, env, moduleData, processState: null };
}
