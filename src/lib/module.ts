import { arGql } from "ar-gql";
import { tagValue } from "./utils";
import assert from "assert";
import { fetchTxIdData } from "./arweave";

const argql = arGql();

function transformModuleKey(key: string) {
  if (key === "Module-Format") {
    return "format";
  } else {
    const words = key.split("-");
    // camelCase
    return words[0].toLowerCase() + words.slice(1);
  }
}

export async function fetchModuleDef(moduleId: string) {
  const tx = await argql.tx(moduleId);

  assert.equal(tagValue(tx.tags, "Data-Protocol"), "ao");
  assert.equal(tagValue(tx.tags, "Type"), "Module");

  const moduleDefTagKeys = [
    "Module-Format",
    "Input-Encoding",
    "Output-Encoding",
    "Memory-Limit",
    "Compute-Limit",
  ];

  const moduleDefTags = moduleDefTagKeys.reduce((acc, key) => {
    const match = tagValue(tx.tags, key);
    assert.ok(match);
    acc[transformModuleKey(key)] = match;
    return acc;
  }, {} as Record<string, string>);

  return moduleDefTags;
}

export async function fetchModuleData(moduleId: string) {
  return await fetchTxIdData(moduleId);
}
