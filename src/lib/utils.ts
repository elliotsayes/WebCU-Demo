import { Tag } from "@permaweb/ao-loader";

export function tagValue(tags: Tag[], name: string) {
  const tag = tags.find((tag) => tag.name === name);
  return tag ? tag.value : null;
}
