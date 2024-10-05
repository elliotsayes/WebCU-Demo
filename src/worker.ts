import AoLoader from "@permaweb/ao-loader";
import { fetchProcessInitial, fetchProcessState } from "./lib/process";
import { AoMessage, generateMessages } from "./lib/messages";

let processData: Awaited<ReturnType<typeof fetchProcessInitial>> | undefined;
let processHandle: Awaited<ReturnType<typeof AoLoader>> | undefined;
let processStateSnapshot: ArrayBuffer | undefined;
let pendingMessagesBuffer: Array<AoMessage> = [];

export async function loadProcess(processId: string) {
  try {
    processData = await fetchProcessInitial(processId);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

export async function startSubscription(processId: string) {
  if (!processData) {
    console.error("Process not loaded");
    return;
  }

  const processStateTimestamp = Date.now();
  // TODO: Find an accurate timestamp of the state
  // Based on the `fetchProcessState` response
  const initialState = await fetchProcessState(processId);

  processHandle = await AoLoader(
    processData.moduleData,
    processData.moduleDef.options
  );

  let lastMemory = initialState;
  let lastMessage;
  for await (const message of generateMessages(
    processId,
    processStateTimestamp
  )) {
    const result = await processHandle(lastMemory, message, processData.env);
    console.log(result.Output);
    lastMemory = result.Memory;

    lastMessage = message;
  }

  runSubscription(
    processId,
    lastMessage?.Timestamp ?? processStateTimestamp,
    lastMemory
  );
}

export async function runSubscription(
  processId: string,
  lastMessageTime?: number,
  lastMemory: ArrayBuffer
) {
  if (!processData || !processHandle) {
    console.error("Process not loaded");
    return;
  }

  // TODO
}
