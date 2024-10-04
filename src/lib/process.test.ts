// import { describe, it, expect } from "vitest";
import assert from "assert";
import { fetchProcessDef, fetchProcessState } from "./process";

const processId = "sYJP_BK4fwXNl0rg8J_5gUWZfmAitoXh_GVleAyGFKg";

describe("fetchProcessDef", () => {
  it("should fetch a process definition", async () => {
    const processDef = await fetchProcessDef(processId);
    console.log(processDef);
  });
});

describe("fetchProcessState", () => {
  // Flakey test
  it.skip("should fetch a process state", async () => {
    const processState = await fetchProcessState(processId);
    assert.ok(processState);
    assert.equal(processState.byteLength, 7602176);
  }).timeout(10_000);
});
