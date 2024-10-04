import assert from "assert";
import { fetchModuleData, fetchModuleDef } from "./module";

const moduleId = "GYrbbe0VbHim_7Hi6zrOpHQXrSQz07XNtwCnfbFo2I0";

describe("fetchModuleDef", () => {
  it("should fetch a module definition", async () => {
    const moduleDef = await fetchModuleDef(moduleId);
    console.log(moduleDef);
    assert.ok(moduleDef);
  });
});

describe("fetchModuleData", () => {
  it("should fetch a module data ", async () => {
    const moduleData = await fetchModuleData(moduleId);
    // console.log(moduleData);
    assert.ok(moduleData);
    assert.equal(moduleData.length, 3255115);
  }).timeout(10_000);
});
