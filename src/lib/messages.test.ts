import { generateMessages } from "./messages";

const processId = "sYJP_BK4fwXNl0rg8J_5gUWZfmAitoXh_GVleAyGFKg";

describe("generateMessages", () => {
  it("should generate messages", async () => {
    for await (const message of generateMessages(processId, 0)) {
      console.log(message);
    }
  }).timeout(10_000);
});
