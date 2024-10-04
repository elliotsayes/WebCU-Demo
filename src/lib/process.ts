import Transaction from "arweave/node/lib/transaction";
import { logger } from "./logger";
import { tagValue } from "./utils";

const suUrl = "https://su-router.ao-testnet.xyz";

export async function parseProcessData(message: Transaction) {
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
    return parseProcessData(await response.json());
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
}
