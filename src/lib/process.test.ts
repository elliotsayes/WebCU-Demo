// import { describe, it, expect } from "vitest";
import { fetchProcessDef } from "./process";

describe("fetchProcessDef", () => {
  it("should fetch a process definition", async () => {
    const processId = "sYJP_BK4fwXNl0rg8J_5gUWZfmAitoXh_GVleAyGFKg";
    const processDef = await fetchProcessDef(processId);
    console.log(processDef);
  });
});
