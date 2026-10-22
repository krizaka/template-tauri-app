import { describe, expect, it } from "vitest";

import { native } from "./native";

describe("the native side as the page sees it", () => {
  it("exposes the folder commands and nothing that reads a path the scope has not granted", () => {
    expect(Object.keys(native).sort()).toEqual(["folders", "grantFolder", "listFolder", "revokeFolder"]);
  });
});
