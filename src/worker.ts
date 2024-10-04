import { processLoop } from "./demo/processLoop";
import { fetchProcessInitial } from "./lib/process";

let processData: Awaited<ReturnType<typeof fetchProcessInitial>>;

export async function loadProcess(processId: string) {
  try {
    processData = await fetchProcessInitial(processId);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

export async function runMessages(count: number) {
  if (!processData) {
    console.error("Process data not loaded");
    return false;
  }

  return processLoop(processData, count);
}
