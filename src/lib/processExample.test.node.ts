import { it } from "vitest";
import { loadProcessRawTest } from "./processExample.ts";

it("should run a test", async () => {
  await loadProcessRawTest();
});
