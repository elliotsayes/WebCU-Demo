import { logger } from "./logger";
import { tagValue } from "./utils";

const suUrl = "https://su-router.ao-testnet.xyz";

type AoMessageRaw = {
  message: {
    id: string;
    signature: string;
    anchor: string | undefined;
    data: string;
    owner: {
      address: string;
    };
    tags: Array<{ name: string; value: string }>;
  };
  assignment: {
    tags: Array<{ name: string; value: string }>;
  };
};

export type AoMessage = {
  Module: string;
  Id: string;
  Signature: string;
  Data: string;
  Owner: string;
  Target: string;
  Anchor: string | undefined;
  From: string;
  "Forwarded-By": string;
  Tags: Array<{ name: string; value: string }>;
  Epoch: string;
  Nonce: number;
  Timestamp: number;
  "Block-Height": number;
  "Hash-Chain": number;
  Cron: boolean;
  "Read-Only": boolean;
};

function parseMessagesData(input: AoMessageRaw, processId: string) {
  const { message, assignment } = input;

  const type = tagValue(message.tags, "Type");
  logger.debug(`Message ${message.id} type: ${type}`);
  if (type === "Process") {
    logger.debug("Process deploy message");
    logger.debug("=== message ===");
    logger.debug(message);
    logger.debug("=== assignment ===");
    logger.debug(assignment);
    return null;
  }
  return {
    Id: message.id,
    Signature: message.signature,
    Data: message.data,
    Owner: message.owner.address,
    Target: processId,
    Anchor: message.anchor,
    From: processId,
    "Forwarded-By": message.owner.address,
    Tags: message.tags.concat(assignment.tags),
    Epoch: parseInt(tagValue(assignment.tags, "Epoch")!),
    Nonce: parseInt(tagValue(assignment.tags, "Nonce")!),
    Timestamp: parseInt(tagValue(assignment.tags, "Timestamp")!),
    "Block-Height": parseInt(tagValue(assignment.tags, "Block-Height")!),
    "Hash-Chain": parseInt(tagValue(assignment.tags, "Hash-Chain")!),
    Cron: false,
    "Read-Only": false,
  };
}

export async function* generateMessages(
  processId: string,
  fromExclusive: number,
  toInclusive?: number
): AsyncGenerator<AoMessage> {
  logger.info(
    `Loading messages from su ${processId}:${fromExclusive}:${toInclusive}`
  );
  let hasNextPage = true;
  while (hasNextPage) {
    const url =
      toInclusive === undefined
        ? `${suUrl}/${processId}?from=${fromExclusive}`
        : `${suUrl}/${processId}?from=${fromExclusive}&to=${toInclusive}`;
    // logger.trace(url);
    const response = await fetch(url);
    if (response.ok) {
      const pageResult = await response.json();
      const edges = pageResult.edges;
      hasNextPage = pageResult.page_info.has_next_page;
      if (hasNextPage) {
        fromExclusive = edges[edges.length - 1].cursor;
        logger.debug(`New from ${fromExclusive}`);
      }

      logger.info(`Found ${edges.length} messages for ${processId}`);
      logger.debug(edges);

      const messages = edges.map((edge: { node: AoMessageRaw }) =>
        parseMessagesData(edge.node, processId)
      );

      logger.debug(`Parsing Raw Messages`);
      logger.debug(messages);

      for (const message of messages) {
        if (message) {
          yield message;
        }
      }
    } else {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
  }
}
