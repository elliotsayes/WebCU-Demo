import Transaction from "arweave/node/lib/transaction";
import { logger } from "./logger";
import { tagValue } from "./utils";
import { fetchModuleData, fetchModuleDef } from "./module";

const cuUrl = "https://cu.ao-testnet.xyz";
const suUrl = "https://su-router.ao-testnet.xyz";

async function parseProcessDef(message: Transaction) {
  return {
    block: message.block,
    owner: message.owner,
    timestamp: message.timestamp,
    tags: message.tags,
    moduleTxId: tagValue(message.tags, "Module")!,
  };
}

export async function fetchProcessDef(processId: string) {
  logger.debug("Before process def fetch");
  const response = await fetch(`${suUrl}/processes/${processId}`);
  logger.debug("After process def fetch");
  if (response.ok) {
    logger.debug("Process def fetch ok");
    const data = await response.json();
    logger.debug("Process def fetch data");
    return parseProcessDef(data);
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
}

export async function fetchProcessState(processId: string) {
  logger.debug("Before process state fetch");
  const response = await fetch(`${cuUrl}/state/${processId}`);
  logger.debug("After process state fetch");
  if (response.ok) {
    logger.debug("Process state fetch ok");
    const data = await response.arrayBuffer();
    logger.debug("Process state fetch data");
    return data;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
}

export async function fetchProcessInitial(processId: string) {
  const processDef = await fetchProcessDef(processId);
  const moduleDef = await fetchModuleDef(processDef.moduleTxId);
  const moduleData = await fetchModuleData(processDef.moduleTxId);

  return { processDef, moduleDef, moduleData, processState: null };
}

export async function fetchProcessCurrent(processId: string) {
  const processInitial = await fetchProcessInitial(processId);
  const processState = await fetchProcessState(processId);
  return { ...processInitial, processState };
}
